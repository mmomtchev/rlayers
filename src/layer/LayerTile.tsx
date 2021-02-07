import React from 'react';
import {Map as OLMap} from 'ol';
import {Tile as OLLayerTile} from 'ol/layer';
import {XYZ} from 'ol/source';

import {Map, Layer, LayerProps} from '..';

export interface LayerTileProps extends LayerProps {
    url?: string;
}

class LayerTile extends Layer<LayerTileProps> {
    ol: OLLayerTile;
    source: XYZ;

    constructor(props: Readonly<LayerTileProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.source = new XYZ({url: this.props.url, projection: this.props.projection});
        this.ol = new OLLayerTile({source: this.source});
    }

    refresh(): void {
        super.refresh();
        if (this.props.url && this.source?.getUrls()[0] !== this.props.url)
            this.source.setUrl(this.props.url);
    }
}

export default LayerTile;
