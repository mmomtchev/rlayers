import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {OSM} from 'ol/source';

import {default as Layer, RLayerProps} from './RLayer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ROSMProps extends RLayerProps {}

/** An OpenStreetMap layer */
export default class ROSM extends Layer<ROSMProps> {
    source: OSM;

    constructor(props: Readonly<ROSMProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new OSM();
        this.ol = new LayerTile({source: this.source});
    }

    refresh(): void {
        super.refresh();
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}
