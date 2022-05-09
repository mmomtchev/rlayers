import React from 'react';
import {VectorTile as LayerVectorTile} from 'ol/layer';
import {VectorTile as SourceVectorTile} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';

import {RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import RStyle, {RStyleLike} from '../style/RStyle';
import debug from '../debug';

/**
 * Properties for RLayerVectorTile
 */
export interface RLayerVectorTileProps extends RLayerProps {
    /** URL for the tiles, normal {x}{y}{z} convention applies */
    url: string;
    /**
     * Style to be used for rendering the features
     * You can use a dynamic style, but the property value must stay the same
     * ie switching from a static OpenLayers style to a RefObject is not supported
     */
    style: RStyleLike;
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
    /** onClick handler for loaded features */
    onClick?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
    /** onPointerMove handler for loaded features */
    onPointerMove?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
    /** onPointerEnter handler for loaded features */
    onPointerEnter?: (this: RLayerVectorTile, e: RFeatureUIEvent) => boolean | void;
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

    constructor(props: Readonly<RLayerVectorTileProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new SourceVectorTile({
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new LayerVectorTile({
            style: RStyle.getStyle(this.props.style),
            source: this.source,
            renderBuffer: this.props.renderBuffer
        });
        this.eventSources = [this.ol, this.source];
        RFeature.initEventRelay(this.context.map);
    }

    refresh(prevProps?: RLayerVectorTileProps): void {
        super.refresh(prevProps);
        const handlers = Object.keys(this.props)
            .filter((ev) => ev.startsWith('on'))
            .reduce((ac, x) => ({...ac, ['_' + x.toLowerCase()]: this.props[x]}), {});
        this.ol.setProperties(handlers);
        if (prevProps?.style !== this.props.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
        if (prevProps?.url !== this.props.url) this.source.setUrl(this.props.url);
    }
}
