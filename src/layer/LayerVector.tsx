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
        this.source = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new OLLayerVector({style: this.props.style, source: this.source});
        this.eventSources = [this.ol, this.source];
        this.refresh();
    }
}

export default LayerVector;
