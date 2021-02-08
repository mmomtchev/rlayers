import React from 'react';
import {Map as OLMap} from 'ol';
import {Vector as OLLayerVector} from 'ol/layer';
import {Vector as OLSourceVector} from 'ol/source';

import {default as LayerBaseVector, LayerBaseVectorProps} from './LayerBaseVector';
import debug from '../debug';
class LayerVector extends LayerBaseVector<LayerBaseVectorProps> {
    ol: OLLayerVector;
    source: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<LayerBaseVectorProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLLayerVector({style: this.props.style, source: this.source});
        this.eventSources = [this.ol, this.source];
        this.ol.on('change', this.onchange);
        this.refresh();
    }
}

export default LayerVector;
