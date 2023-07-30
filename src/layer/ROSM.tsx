import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {OSM} from 'ol/source';

import {RContextType} from '../context';
import {default as LayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor ROSM
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ROSMProps extends RLayerRasterProps {}

/**
 * An OpenStreetMap layer
 *
 * Requires an `RMap` context
 */
export default class ROSM extends LayerRaster<ROSMProps> {
    source: OSM;

    constructor(props: Readonly<ROSMProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.source = new OSM();
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: ROSMProps): void {
        super.refresh(prevProps);
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}
