import React from 'react';
import {Map as Map} from 'ol';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';

import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import debug from '../debug';

/**
 * A vector layer
 *
 * Supports loading of features from external sources
 *
 * Provides a `RVectorContext` for JSX-declared `RFeature`s
 */
export default class RLayerVector extends RLayerBaseVector<RLayerBaseVectorProps> {
    ol: LayerVector;
    source: SourceVector;
    context: Map;

    constructor(props: Readonly<RLayerBaseVectorProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new LayerVector({style: this.props.style, source: this.source});
        this.eventSources = [this.ol, this.source];
        this.source.on('RFeaturesloadend', this.newFeature);
        this.source.on('addRFeature', this.newFeature);
        this.refresh();
    }
}
