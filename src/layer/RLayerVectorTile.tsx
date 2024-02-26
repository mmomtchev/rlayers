import React from 'react';
import {VectorTile as LayerVectorTile} from 'ol/layer';
import {VectorTile as SourceVectorTile} from 'ol/source';
import type {Options as OLOptions} from 'ol/source/VectorTile';
import FeatureFormat from 'ol/format/Feature';

import {OLFeatureClass, RContext, RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import {OLEvent, RlayersBase} from '../REvent';
import {FeatureHandlers, featureHandlersSymbol} from './RLayerBaseVector';
import RStyle, {RStyleLike} from '../style/RStyle';
import debug from '../debug';

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type Options = IfAny<OLOptions<OLFeatureClass>, OLOptions, OLOptions<OLFeatureClass>>;

/**
 * @propsfor RLayerVectorTile
 */
export interface RLayerVectorTileProps extends RLayerProps {
    /** URL for the tiles, normal {x}{y}{z} convention applies */
    url: string;
    /**
     * Style to be used for rendering the features
     * You can use a dynamic style, but the property value must stay the same
     * ie switching from a static OpenLayers style to a RefObject is not supported
     */
    style?: RStyleLike;
    /** Vector tile format */
    format: FeatureFormat;
    /**
     * Width of the frame around the viewport that shall be rendered too
     * so that the symbols, whose center is outside of the viewport,
     * but are partially inside, can be rendered
     *
     * this property currently does not support dynamic updates
     */
    renderBuffer?: number;
    /* vector tile specific source Options */
    extent?: Options['extent'];
    overlaps?: Options['overlaps'];
    state?: Options['state'];
    tileClass?: Options['tileClass'];
    tileSize?: Options['tileSize'];
    tileGrid?: Options['tileGrid'];
    tileLoadFunction?: Options['tileLoadFunction'];
    tileUrlFunction?: Options['tileUrlFunction'];
    transition?: Options['transition'];
    zDirection?: Options['zDirection'];
    /** onClick handler for loaded features */
    onClick?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
    /** onPointerMove handler for loaded features */
    onPointerMove?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
    /** onPointerEnter handler for loaded features */
    onPointerEnter?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
    /** onPointerLeave handler for loaded features */
    onPointerLeave?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
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
export default class RLayerVectorTile extends RLayer<RLayerVectorTileProps> {
    ol: LayerVectorTile;
    source: SourceVectorTile;

    constructor(props: Readonly<RLayerVectorTileProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.source = new SourceVectorTile({
            url: this.props.url,
            format: this.props.format,
            projection: this.props.projection,
            cacheSize: this.props.cacheSize,
            extent: this.props.extent,
            overlaps: this.props.overlaps,
            state: this.props.state,
            tileClass: this.props.tileClass,
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

    protected refresh(prevProps?: RLayerVectorTileProps): void {
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
