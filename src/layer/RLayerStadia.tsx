import React from 'react';
import {Map as Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {StadiaMaps} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerStadia
 */
export interface RLayerStadiaProps extends RLayerRasterProps {
    /** Stadia Maps layer name */
    layer: string;
    /** API key */
    apiKey?: string;
    /** Retina screen mode, @default false */
    retina?: boolean;
}

/**
 * A ready to use interface for Stadia Maps's map service
 *
 * Requires an `RMap` context
 */
export default class RLayerStadia extends RLayerRaster<RLayerStadiaProps> {
    ol: LayerTile<StadiaMaps>;
    source: StadiaMaps;

    constructor(props: Readonly<RLayerStadiaProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.source = new StadiaMaps({
            layer: this.props.layer,
            apiKey: this.props.apiKey,
            retina: this.props.retina ?? false
        });
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }
}
