import React from 'react';
import {Map as Map} from 'ol';
import {Tile as OLRLayerTile} from 'ol/layer';
import {Stamen} from 'ol/source';

import {default as RLayer, RLayerProps} from './RLayer';

export interface RLayerStamenProps extends RLayerProps {
    /** Stamen layer name */
    layer?: string;
}

/** A ready to use interface for Stamen's map service */
export default class RLayerStamen extends RLayer<RLayerStamenProps> {
    ol: OLRLayerTile;
    source: Stamen;

    constructor(props: Readonly<RLayerStamenProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new Stamen({layer: this.props.layer});
        this.ol = new OLRLayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }
}
