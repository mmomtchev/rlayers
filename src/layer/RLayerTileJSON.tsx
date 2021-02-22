import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {TileJSON} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {RContextType} from '../context';
import RLayerRaster, {RLayerRasterProps} from './RLayerRaster';

export interface RLayerTileJSONProps extends RLayerRasterProps {
    /** An URL for loading the tiles with the usual {x}{y}{z} semantics */
    url?: string;
    projection?: never;
}

/** A layer with data from TileJSON tiles */
export default class RLayerTileJSON extends RLayerRaster<RLayerTileJSONProps> {
    ol: LayerTile;
    source: TileJSON;

    constructor(props: Readonly<RLayerTileJSONProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new TileJSON({
            url: this.props.url
        });
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerTileJSONProps): void {
        super.refresh(prevProps);
        if (this.props.url && prevProps?.url !== this.props.url) this.source.setUrl(this.props.url);
    }
}
