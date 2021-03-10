import React from 'react';
import {Map, Feature} from 'ol';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector, Cluster as SourceCluster} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {default as RStyle} from '../style/RStyle';

export interface RLayerClusterProps extends RLayerBaseVectorProps {
    /** Clustering distance */
    distance?: number;
}

/** A vector layer that clusters its RFeatures
 *
 * Compatible with RLayerVector
 *
 * Requires an `RMap` context
 *
 * Not compatible with a vector layer context for JSX-declared RFeatures
 */
export default class RLayerCluster extends RLayerBaseVector<RLayerClusterProps> {
    ol: LayerVector;
    source: SourceCluster;
    cluster: SourceVector;

    constructor(props: Readonly<RLayerClusterProps>, context: React.Context<RContextType>) {
        super(props, context);

        this.cluster = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader
        });
        this.source = new SourceCluster({source: this.cluster, distance: this.props.distance});
        this.ol = new LayerVector({
            ...props,
            source: this.source,
            style: RStyle.getStyle(props.style)
        });
        this.eventSources = [this.ol, this.source, this.cluster];
        this.source.on('featuresloadend', this.newFeature);
        this.source.on('addfeature', this.newFeature);
        this.attachEventHandlers();
    }

    refresh(prev?: RLayerClusterProps): void {
        super.refresh(prev);
        if (prev?.distance !== this.props.distance) this.source.setDistance(this.props.distance);
        if (prev?.url !== this.props.url) this.cluster.setUrl(this.props.url);
    }
}
