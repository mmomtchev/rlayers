import React from 'react';
import {Map as OLMap, Feature as OLFeature} from 'ol';
import {Vector as OLLayerVector} from 'ol/layer';
import {Vector as OLSourceVector, Cluster as OLSourceCluster} from 'ol/source';

import {default as LayerBaseVector, LayerBaseVectorProps} from './LayerBaseVector';

export interface LayerClusterProps extends LayerBaseVectorProps {
    distance?: number;
}

class LayerCluster extends LayerBaseVector<LayerClusterProps> {
    ol: OLLayerVector;
    source: OLSourceCluster;
    cluster: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<LayerClusterProps>, context: React.Context<OLMap>) {
        super(props, context);

        this.cluster = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.source = new OLSourceCluster({source: this.cluster, distance: this.props.distance});
        this.ol = new OLLayerVector({source: this.source, ...props});
        this.eventSources = [this.ol, this.source];
        this.source.on('featuresloadend', this.newFeature);
        this.source.on('addfeature', this.newFeature);
        this.attachExistingFeatureHandlers();
    }

    refresh(prev?: LayerClusterProps): void {
        super.refresh();
        if (!prev || prev.distance !== this.props.distance)
            this.source.setDistance(this.props.distance);
    }
}

export default LayerCluster;
