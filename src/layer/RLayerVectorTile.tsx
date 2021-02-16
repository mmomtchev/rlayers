import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {VectorTile as LayerVectorTile} from 'ol/layer';
import {VectorTile as SourceVectorTile} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';

import {RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import RFeature from '../RFeature';
import RStyle, {RStyleLike} from '../style/RStyle';
import debug from '../debug';

export interface RLayerVectorTileProps extends RLayerProps {
    /** URL for the tiles, normal {x}{y}{z} convention applies */
    url: string;
    /** Style to be used for rendering the features
     * You can use a dynamic style, but the property value must stay the same
     * ie switching from a static OpenLayers style to a RefObject is not supported
     */
    style: RStyleLike;
    /** Vector tile format */
    format: FeatureFormat;
    /** onClick handler for loaded features */
    onClick?: (e: MapBrowserEvent) => boolean | void;
    /** onPointerMove handler for loaded features */
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    /** onPointerEnter handler for loaded features */
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
}

/**
 * A vector tile layer
 *
 * Supports loading of features from vector tile servers
 *
 * Only the handlers can be dynamically modified
 *
 * It does not provide a `RContext` for JSX-declared `RFeature`s
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
            source: this.source
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
    }

    render(): JSX.Element {
        return null;
    }
}
