import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {TileJSON} from 'ol/source';
import type {Options} from 'ol/source/TileJSON';
import TileGrid from 'ol/tilegrid/TileGrid';

import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerTileJSON
 */
export interface RLayerTileJSONProps extends RLayerRasterProps {
    /** An URL for loading the tiles with the usual {x}{y}{z} semantics */
    url?: string;
    projection?: never;
    // other, less frequently used options
    tileSize?: Options['tileSize'];
}

/**
 * A layer with data from TileJSON tiles
 *
 * Requires an `RMap` context
 */
export default class RLayerTileJSON extends RLayerRaster<RLayerTileJSONProps> {
    ol: LayerTile<TileJSON>;
    source: TileJSON;

    constructor(props: Readonly<RLayerTileJSONProps>) {
        super(props);
        this.source = new TileJSON({
            url: this.props.url,
            tileSize: this.props.tileSize
        });
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerTileJSONProps): void {
        super.refresh(prevProps);
        if (this.props.url && prevProps?.url !== this.props.url) {
            this.source.setUrl(this.props.url);
            this.source.refresh();
        }
    }
}
