import React from 'react';
import {Map} from 'ol';
import {Tile as OLRLayerTile} from 'ol/layer';
import {XYZ} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {default as RLayer, RLayerProps} from './RLayer';

export interface RLayerTileProps extends RLayerProps {
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
export default class RLayerTile extends RLayer<RLayerTileProps> {
    ol: OLRLayerTile;
    source: XYZ;

    constructor(props: Readonly<RLayerTileProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new XYZ({
            url: this.props.url,
            projection: this.props.projection,
            tileGrid: this.props.tileGrid
        });
        this.ol = new OLRLayerTile({source: this.source});
    }

    refresh(prevProps?: RLayerTileProps): void {
        super.refresh();
        if (prevProps?.tileGrid !== this.props.tileGrid)
            this.source = new XYZ({
                url: this.props.url,
                projection: this.props.projection,
                tileGrid: this.props.tileGrid
            });
        if (this.props.url && this.source?.getUrls()[0] !== this.props.url)
            this.source.setUrl(this.props.url);
    }
}
