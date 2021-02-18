import React from 'react';
import {Map as Map} from 'ol';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {default as RStyle} from '../style/RStyle';
import debug from '../debug';

/**
 * A vector layer
 *
 * Supports loading of features from external sources
 *
 * Provides a `RContext` for JSX-declared `RFeature`s
 */
export default class RLayerVector extends RLayerBaseVector<RLayerBaseVectorProps> {
    ol: LayerVector;
    source: SourceVector;

    constructor(props: Readonly<RLayerBaseVectorProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader
        });
        this.ol = new LayerVector({style: RStyle.getStyle(this.props.style), source: this.source});
        this.eventSources = [this.ol, this.source];
        this.source.on('featuresloadend', this.newFeature);
        this.source.on('addfeature', this.newFeature);
        this.attachEventHandlers();
    }

    refresh(prevProps?: RLayerBaseVectorProps): void {
        super.refresh(prevProps);
        if (prevProps?.url !== this.props.url) this.source.setUrl(this.props.url);
    }
}
