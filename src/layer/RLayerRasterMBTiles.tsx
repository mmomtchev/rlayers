import React from 'react';
import {Tile as LayerTile} from 'ol/layer';
import BaseEvent from 'ol/events/Event';

import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';
import debug from '../debug';

import type * as MBTiles from 'ol-mbtiles';

/**
 * @propsfor RLayerRasterMBTiles
 */
export interface RLayerRasterMBTilesProps extends RLayerRasterProps {
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
    /** Called after each metadata change to signal that the metadata has been loaded */
    onMetadataReady?: (
        this: RLayerRasterMBTiles,
        md: MBTiles.MBTilesRasterOptions & MBTiles.SQLOptions
    ) => void;
    /** Called by OpenLayers when the layer is ready to start rendering */
    onSourceReady?: (this: RLayerRasterMBTiles, e: BaseEvent) => void;
}

/**
 * A layer from a remote MBTiles raster source
 *
 * WARNING: Using this module requires manually installing `ol-mbtiles`
 *
 * `npm install ol-mbtiles`
 *
 * Be sure to read its own documentation for tips on how to improve
 * its performance (COOP/COEP, WASM compression, preloading...)
 *
 * Requires an `RMap` context
 */
export default class RLayerRasterMBTiles extends RLayerRaster<RLayerRasterMBTilesProps> {
    addon: Promise<typeof MBTiles>;
    metadata: Promise<MBTiles.MBTilesRasterOptions & MBTiles.SQLOptions>;
    ol: LayerTile<MBTiles.MBTilesRasterSource>;
    source: MBTiles.MBTilesRasterSource;
    private abort: AbortController;

    constructor(props: Readonly<RLayerRasterMBTilesProps>) {
        super(props);
        this.addon = import('ol-mbtiles');
        this.ol = new LayerTile();
        this.source = null;
        this.abort = null;
        this.createSource();
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
            this.source = new addon.MBTilesRasterSource(md);
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

    protected refresh(prevProps?: RLayerRasterMBTilesProps): void {
        super.refresh(prevProps);
        if (prevProps?.url !== this.props.url) {
            this.destroySource();
            this.createSource();
        }
    }
}
