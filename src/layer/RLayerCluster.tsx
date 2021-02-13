import React from 'react';
import {Map, Feature} from 'ol';
import {Vector as OLRLayerVector} from 'ol/layer';
import {Vector as OLSourceVector, Cluster as OLSourceCluster} from 'ol/source';

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
 * Provides a `RVectorContext` for JSX-declared RFeatures
 */
export default class RLayerCluster extends RLayerBaseVector<RLayerClusterProps> {
    ol: OLRLayerVector;
    source: OLSourceCluster;
    cluster: OLSourceVector;
    context: Map;

    constructor(props: Readonly<RLayerClusterProps>, context: React.Context<Map>) {
        super(props, context);

        this.cluster = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.source = new OLSourceCluster({source: this.cluster, distance: this.props.distance});
        this.ol = new OLRLayerVector({
            ...props,
            source: this.source,
            style: RStyle.getStyle(props.style)
        });
        this.eventSources = [this.ol, this.source];
        this.source.on('RFeaturesloadend', this.newFeature);
        this.source.on('addRFeature', this.newFeature);
        this.refresh();
    }

    refresh(prev?: RLayerClusterProps): void {
        super.refresh();
        if (!prev || prev.distance !== this.props.distance)
            this.source.setDistance(this.props.distance);
    }
}
