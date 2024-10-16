import React from 'react';
import {VectorTile as LayerVectorTile} from 'ol/layer';
import {VectorTile as SourceVectorTile} from 'ol/source';
import BaseEvent from 'ol/events/Event';
import RenderFeature from 'ol/render/Feature';
import {FeatureLike} from 'ol/Feature';

import {RContext, RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import RStyle, {RStyleLike} from '../style/RStyle';
import debug from '../debug';

import type * as MBTiles from 'ol-mbtiles';

/**
 * @propsfor RLayerVectorTile
 */
export interface RLayerVectorMBTilesProps<F extends FeatureLike = RenderFeature>
    extends RLayerRasterProps {
    /** An URL for a remote MBTiles file */
    url: string;
    /**
     * Use multiple SQLite workers, refer to the ol-mbtiles for more information
     * @default 4
     */
    workers?: number;
    /**
     * Use a specific HTTP backend, refer to the ol-mbtiles for more information
     * @default 'sync'
     */
    backend?: 'sync' | 'shared';
    /**
     * Cache size in KBytes to use for SQLite
     * @default 4096
     */
    sqlCacheSize?: number;
    /**
     * Maximum SQLite page size in bytes, reduce to 1024 if you have optimized your files
     * @default 4096
     */
    maxSqlPageSize?: number;
    /**
     * Optional list of layers to be retrieved
     * @default all
     */
    layers?: string[];
    /**
     * Style to be used for rendering the features
     * You can use a dynamic style, but the property value must stay the same
     * ie switching from a static OpenLayers style to a RefObject is not supported
     */
    style?: RStyleLike;
    /**
     * Width of the frame around the viewport that shall be rendered too
     * so that the symbols, whose center is outside of the viewport,
     * but are partially inside, can be rendered
     *
     * this property currently does not support dynamic updates
     */
    renderBuffer?: number;
    /** onClick handler for loaded features */
    onClick?: (this: RLayerVectorMBTiles<F>, e: RFeatureUIEvent<F>) => boolean | void;
    /** onPointerMove handler for loaded features */
    onPointerMove?: (this: RLayerVectorMBTiles<F>, e: RFeatureUIEvent<F>) => boolean | void;
    /** onPointerEnter handler for loaded features */
    onPointerEnter?: (this: RLayerVectorMBTiles<F>, e: RFeatureUIEvent<F>) => boolean | void;
    /** onPointerLeave handler for loaded features */
    onPointerLeave?: (this: RLayerVectorMBTiles<F>, e: RFeatureUIEvent<F>) => boolean | void;
    /** Called after each metadata change to signal that the metadata has been loaded */
    onMetadataReady?: (
        this: RLayerVectorMBTiles,
        md: MBTiles.MBTilesVectorOptions & MBTiles.SQLOptions
    ) => void;
    /** Called by OpenLayers when the layer is ready to start rendering */
    onSourceReady?: (this: RLayerVectorMBTiles, e: BaseEvent) => void;
}

/**
 * A layer from a remote MBTiles vector source
 *
 * WARNING: Using this module requires manually installing `ol-mbtiles`
 *
 * `npm install ol-mbtiles`
 *
 * Be sure to read its own documentation for tips on how to improve
 * its performance (COOP/COEP, WASM compression, preloading...)
 *
 * It does not provide a vector layer context for JSX-declared `RFeature`s
 * and it is not compatible with RLayerVector
 *
 * Requires an `RMap` context
 */
export default class RLayerVectorMBTiles<
    F extends FeatureLike = RenderFeature
> extends RLayerRaster<RLayerVectorMBTilesProps> {
    addon: Promise<typeof MBTiles>;
    metadata: Promise<MBTiles.MBTilesVectorOptions & MBTiles.SQLOptions>;
    ol: LayerVectorTile<MBTiles.MBTilesVectorSource<F>, F>;
    source: MBTiles.MBTilesVectorSource<F>;
    private abort: AbortController;

    constructor(props: Readonly<RLayerVectorMBTilesProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.addon = import('ol-mbtiles');
        this.ol = new LayerVectorTile({
            style: RStyle.getStyle(this.props.style),
            renderBuffer: this.props.renderBuffer
        });
        this.eventSources = [this.ol];
        RFeature.initEventRelay(this.context.map);
    }

    protected createSource(): void {
        debug('createSource start', this);
        this.metadata = this.addon.then((mod) =>
            mod.importMBTiles({
                url: this.props.url,
                sqlWorkers: this.props.workers ?? 4,
                sqlCacheSize: this.props.sqlCacheSize ?? 4096,
                maxSqlPageSize: this.props.maxSqlPageSize ?? 4096,
                backendType: this.props.backend ?? 'sync'
            })
        );
        const abort = new AbortController();
        this.abort = abort;
        Promise.all([this.addon, this.metadata]).then(([addon, md]) => {
            if (abort.signal.aborted) {
                debug('createSource aborted', this);
                md.pool.then((p) => p.close());
                return;
            }
            this.source = new addon.MBTilesVectorSource(md);
            this.eventSources = [this.ol, this.source];
            this.ol.setSource(this.source);
            this.attachOldEventHandlers(this.source);
            if (this.props.onMetadataReady) this.props.onMetadataReady.call(this, md);
            return this.source;
        });
    }

    protected destroySource(): void {
        debug('destroySource', this, this.abort);
        if (this.source) {
            this.source.dispose();
            this.source = null;
            if (this.ol) this.ol.setSource(null);
        }
        if (this.abort) {
            this.abort.abort();
            this.abort = null;
        }
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.destroySource();
    }

    protected refresh(prevProps?: RLayerVectorMBTilesProps): void {
        super.refresh(prevProps);
        const handlers = Object.keys(this.props)
            .filter((ev) => ev.startsWith('on'))
            .reduce((ac, x) => ({...ac, ['_' + x.toLowerCase()]: this.props[x]}), {});
        this.ol.setProperties(handlers);
        if (prevProps?.style !== this.props.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
        if (prevProps?.url !== this.props.url) {
            this.destroySource();
            this.createSource();
        }
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RLayerVectorMBTiles'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            layer: this.ol,
                            vectortilelayer: this.ol,
                            rLayer: this
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
