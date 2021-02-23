import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {XYZ} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {RContextType} from '../context';
import RLayerRaster, {RLayerRasterProps} from './RLayerRaster';

export interface RLayerTileProps extends RLayerRasterProps {
    /** An URL for loading the tiles with the usual {x}{y}{z} semantics */
    url?: string;
    /** Custom OpenLayers TileGrid for sources that do not cover the world
     * or use non-standard zoom levels
     * Take care to pass a constant object, because the layer must be
     * recreated at every change
     */
    tileGrid?: TileGrid;
}

/** A layer with XYZ raster tiles */
export default class RLayerTile extends RLayerRaster<RLayerTileProps> {
    ol: LayerTile;
    source: XYZ;

    constructor(props: Readonly<RLayerTileProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        this.source = new XYZ({
            url: this.props.url,
            transition: this.context.ssr ? 0 : undefined,
            crossOrigin: this.context.ssr ? 'anonymous' : undefined,
            projection: this.props.projection,
            tileGrid: this.props.tileGrid
        });
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerTileProps): void {
        super.refresh(prevProps);
        if (prevProps?.tileGrid !== this.props.tileGrid) this.createSource();
        if (this.props.url && prevProps?.url !== this.props.url) this.source.setUrl(this.props.url);
    }
}