import React from 'react';
import {Map as Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {Stamen} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * Properties for RLayerStamen
 */
export interface RLayerStamenProps extends RLayerRasterProps {
    /** Stamen layer name */
    layer?: string;
}

/**
 * A ready to use interface for Stamen's map service
 *
 * Requires an `RMap` context
 */
export default class RLayerStamen extends RLayerRaster<RLayerStamenProps> {
    ol: LayerTile<Stamen>;
    source: Stamen;

    constructor(props: Readonly<RLayerStamenProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new Stamen({layer: this.props.layer});
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }
}
