import React from 'react';
import {Map as OLMap} from 'ol';
import {Tile as OLLayerTile} from 'ol/layer';
import {OSM as OLOSM} from 'ol/source';

import {default as Layer, LayerProps} from './Layer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OSMProps extends LayerProps {}

class OSM extends Layer<OSMProps> {
    source: OLOSM;

    constructor(props: Readonly<OSMProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.source = new OLOSM();
        this.ol = new OLLayerTile({source: this.source});
    }

    refresh(): void {
        super.refresh();
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}

export default OSM;
