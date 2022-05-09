import React from 'react';
import {Map} from 'ol';
import {WebGLTile as LayerTileWebGL} from 'ol/layer';
import {XYZ} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {RContextType} from '../context';
import {default as RLayerWebGL, RLayerWebGLProps} from './RLayerWebGL';

/**
 * Properties for RLayerTileWebGL
 */
export interface RLayerTileWebGLProps extends RLayerWebGLProps {
    /** An URL for loading the tiles with the usual {x}{y}{z} semantics */
    url?: string;
    /**
     * Custom OpenLayers TileGrid for sources that do not cover the world
     * or use non-standard zoom levels
     * Take care to pass a constant object, because otherwise
     * the layer must be recreated at every render
     * (ie pass a constant variable, not an anonymous {})
     */
    tileGrid?: TileGrid;
}

/**
 * A layer with XYZ raster tiles rendered by WebGL
 *
 * Requires an `RMap` context
 */
export default class RLayerTileWebGL extends RLayerWebGL<RLayerTileWebGLProps> {
    ol: LayerTileWebGL;
    source: XYZ;

    constructor(props: Readonly<RLayerTileWebGLProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new LayerTileWebGL({
            opacity: 0.9,
            source: this.source,
            cacheSize: props.cacheSize
        });
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        this.source = new XYZ({
            url: this.props.url,
            interpolate: true,
            projection: this.props.projection,
            tileGrid: this.props.tileGrid,
            crossOrigin: 'anonymous'
        });
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerTileWebGLProps): void {
        super.refresh(prevProps);
        if (prevProps?.tileGrid !== this.props.tileGrid) this.createSource();
        if (this.props.url && prevProps?.url !== this.props.url) this.source.setUrl(this.props.url);
    }
}
