import React from 'react';
import {VectorTile as LayerVectorTile} from 'ol/layer';
import {VectorTile as SourceVectorTile} from 'ol/source';
import type {Options} from 'ol/source/VectorTile';
import FeatureFormat, {FeatureToFeatureClass} from 'ol/format/Feature';
import {FeatureLike} from 'ol/Feature';
import {Feature} from 'ol';
import {Geometry} from 'ol/geom';

import {RContext, RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import {OLEvent, RlayersBase} from '../REvent';
import {FeatureHandlers, featureHandlersSymbol} from './RLayerBaseVector';
import RStyle, {RStyleLike} from '../style/RStyle';
import debug from '../debug';

/**
 * @propsfor RLayerVectorTile
 */
export interface RLayerVectorTileProps<F extends FeatureLike = Feature<Geometry>>
    extends RLayerProps {
    /** URL for the tiles, normal {x}{y}{z} convention applies */
    url: string;
    /**
     * Style to be used for rendering the features
     * You can use a dynamic style, but the property value must stay the same
     * ie switching from a static OpenLayers style to a RefObject is not supported
     */
    style?: RStyleLike;
    /**
     * Vector tile format
     *
     * this property currently does not support dynamic updates
     */
    format: FeatureFormat<FeatureToFeatureClass<F>>;
    /**
     * Feature class
     *
     * this property currently does not support dynamic updates
     */
    //featureClass: FeatureToFeatureClass<F>;
    /**
     * Width of the frame around the viewport that shall be rendered too
     * so that the symbols, whose center is outside of the viewport,
     * but are partially inside, can be rendered
     *
     * this property currently does not support dynamic updates
     */
    renderBuffer?: number;
    /* vector tile specific source Options<F> */
    extent?: Options<F>['extent'];
    overlaps?: Options<F>['overlaps'];
    state?: Options<F>['state'];
    tileClass?: Options<F>['tileClass'];
    tileSize?: Options<F>['tileSize'];
    tileGrid?: Options<F>['tileGrid'];
    tileLoadFunction?: Options<F>['tileLoadFunction'];
    tileUrlFunction?: Options<F>['tileUrlFunction'];
    transition?: Options<F>['transition'];
    zDirection?: Options<F>['zDirection'];
    /** onClick handler for loaded features */
    onClick?: (this: RLayerVectorTile<F>, e: RFeatureUIEvent) => boolean | void;
    /** onPointerMove handler for loaded features */
    onPointerMove?: (this: RLayerVectorTile<F>, e: RFeatureUIEvent) => boolean | void;
    /** onPointerEnter handler for loaded features */
    onPointerEnter?: (this: RLayerVectorTile<F>, e: RFeatureUIEvent) => boolean | void;
    /** onPointerLeave handler for loaded features */
    onPointerLeave?: (this: RLayerVectorTile<F>, e: RFeatureUIEvent) => boolean | void;
}

/**
 * A vector tile layer
 *
 * Supports loading of features from vector tile servers
 *
 * Only the handlers can be dynamically modified
 *
 * Requires an `RMap` context
 *
 * It does not provide a vector layer context for JSX-declared `RFeature`s
 * and it is not compatible with RLayerVector
 */
export default class RLayerVectorTile<F extends FeatureLike = Feature<Geometry>> extends RLayer<
    RLayerVectorTileProps<F>
> {
    ol: LayerVectorTile<F>;
    source: SourceVectorTile<F>;

    constructor(props: Readonly<RLayerVectorTileProps<F>>, context?: React.Context<RContextType>) {
        super(props, context);
        this.source = new SourceVectorTile<F>({
            url: this.props.url,
            format: this.props.format,
            projection: this.props.projection,
            cacheSize: this.props.cacheSize,
            extent: this.props.extent,
            overlaps: this.props.overlaps,
            state: this.props.state,
            tileClass: this.props.tileClass,
            //featureClass: this.props.featureClass,
            tileSize: this.props.tileSize,
            tileGrid: this.props.tileGrid,
            tileLoadFunction: this.props.tileLoadFunction,
            tileUrlFunction: this.props.tileUrlFunction,
            transition: this.props.transition,
            wrapX: this.props.wrapX,
            zDirection: this.props.zDirection
        });
        this.ol = new LayerVectorTile({
            style: RStyle.getStyle(this.props.style),
            source: this.source,
            renderBuffer: this.props.renderBuffer
        });
        this.eventSources = [this.ol, this.source];
        RFeature.initEventRelay(this.context.map);
    }

    protected incrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.ol
        );
        featureHandlers[ev] = (featureHandlers[ev] ?? 0) + 1;
    }
    protected decrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.ol
        );
        featureHandlers[ev]--;
    }

    protected refresh(prevProps?: RLayerVectorTileProps<F>): void {
        super.refresh(prevProps);
        const handlers = Object.keys(this.props)
            .filter((ev) => ev.startsWith('on'))
            .reduce((ac, x) => ({...ac, ['_' + x.toLowerCase()]: this.props[x]}), {});
        this.ol.setProperties(handlers);
        if (prevProps?.style !== this.props.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
        if (prevProps?.url !== this.props.url) {
            this.source.setUrl(this.props.url);
            this.source.refresh();
        }
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RLayerVectorTile'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            layer: this.ol,
                            vectortilelayer: this.ol,
                            rLayer: this,
                            rLayerVectorTile: this
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
