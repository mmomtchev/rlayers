import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {XYZ} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerTile
 */
export interface RLayerTileProps extends RLayerRasterProps {
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
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null;
}

/**
 * A layer with XYZ raster tiles
 *
 * Requires an `RMap` context
 */
export default class RLayerTile extends RLayerRaster<RLayerTileProps> {
    ol: LayerTile<XYZ>;
    source: XYZ;

    constructor(props: Readonly<RLayerTileProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        this.source = new XYZ({
            url: this.props.url,
            interpolate: !this.props.noIterpolation,
            projection: this.props.projection,
            tileGrid: this.props.tileGrid,
            crossOrigin: this.props.crossOrigin
        });
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerTileProps): void {
        super.refresh(prevProps);
        if (prevProps?.tileGrid !== this.props.tileGrid || prevProps?.url !== this.props.url) {
            this.createSource();
            this.ol.setSource(this.source);
            this.attachOldEventHandlers(this.source);
        }
    }
}
