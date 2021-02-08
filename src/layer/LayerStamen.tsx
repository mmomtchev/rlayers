import React from 'react';
import {Map as OLMap} from 'ol';
import {Tile as OLLayerTile} from 'ol/layer';
import {Stamen} from 'ol/source';

import {Layer, LayerProps} from '..';

export interface LayerStamenProps extends LayerProps {
    layer?: string;
}

class LayerStamen extends Layer<LayerStamenProps> {
    ol: OLLayerTile;
    source: Stamen;

    constructor(props: Readonly<LayerStamenProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.source = new Stamen({layer: this.props.layer});
        this.ol = new OLLayerTile({source: this.source});
    }
}

export default LayerStamen;
