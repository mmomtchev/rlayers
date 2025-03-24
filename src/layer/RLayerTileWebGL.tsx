import React from 'react';
import {ImageTile, Map} from 'ol';
import DataTile from 'ol/DataTile';
import {WebGLTile as LayerTileWebGL} from 'ol/layer';
import {DataTile as SourceDataTile, ImageTile as SourceImageTile} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {default as RLayerWebGL, RLayerWebGLProps} from './RLayerWebGL';

/**
 * @propsfor RLayerTileWebGL
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
    /**
     * By default, OpenLayers uses interpolation to smooth images when zooming.
     * Setting this value to true will override that.
     */
    noIterpolation?: boolean;
}

/**
 * A layer with XYZ raster tiles rendered by WebGL
 *
 * Requires an `RMap` context
 */
export default class RLayerTileWebGL extends RLayerWebGL<RLayerTileWebGLProps, ImageTile> {
    ol: LayerTileWebGL;
    source: SourceImageTile;

    constructor(props: Readonly<RLayerTileWebGLProps>) {
        super(props);
        this.createSource();
        this.ol = new LayerTileWebGL({
            opacity: 0.9,
            source: this.source as unknown as SourceDataTile<DataTile>,
            cacheSize: props.cacheSize
        });
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        this.source = new SourceImageTile({
            url: this.props.url,
            interpolate: !this.props.noIterpolation,
            projection: this.props.projection,
            tileGrid: this.props.tileGrid,
            crossOrigin: 'anonymous',
            attributions: this.props.attributions
        });
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerTileWebGLProps): void {
        super.refresh(prevProps);
        if (prevProps?.tileGrid !== this.props.tileGrid || prevProps?.url !== this.props.url) {
            this.createSource();
            this.ol.setSource(this.source as unknown as SourceDataTile<DataTile>);
            this.attachOldEventHandlers(this.source);
        }
    }
}
