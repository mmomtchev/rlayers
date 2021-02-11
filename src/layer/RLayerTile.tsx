import React from 'react';
import {Map} from 'ol';
import {Tile as OLRLayerTile} from 'ol/layer';
import {XYZ} from 'ol/source';

import {default as RLayer, RLayerProps} from './RLayer';

export interface RLayerTileProps extends RLayerProps {
    /** An URL for loading the tiles with the usual {x}{y}{z} semantics */
    url?: string;
}

/** A layer with XYZ raster tiles */
export default class RLayerTile extends RLayer<RLayerTileProps> {
    ol: OLRLayerTile;
    source: XYZ;

    constructor(props: Readonly<RLayerTileProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new XYZ({url: this.props.url, projection: this.props.projection});
        this.ol = new OLRLayerTile({source: this.source});
    }

    refresh(): void {
        super.refresh();
        if (this.props.url && this.source?.getUrls()[0] !== this.props.url)
            this.source.setUrl(this.props.url);
    }
}
