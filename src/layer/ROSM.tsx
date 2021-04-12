import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {OSM} from 'ol/source';

import {RContextType} from '../context';
import LayerRaster, {RLayerRasterProps} from './RLayerRaster';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ROSMProps extends RLayerRasterProps {}

/**
 * An OpenStreetMap layer
 *
 * Requires an `RMap` context
 */
export default class ROSM extends LayerRaster<ROSMProps> {
    source: OSM;

    constructor(props: Readonly<ROSMProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new OSM({
            transition: this.context.ssr ? 0 : undefined,
            crossOrigin: this.context.ssr ? 'anonymous' : undefined
        } as unknown);
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: ROSMProps): void {
        super.refresh(prevProps);
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}
