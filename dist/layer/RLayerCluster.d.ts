import React from 'react';
import { Map } from 'ol';
import { Vector as OLRLayerVector } from 'ol/layer';
import { Vector as OLSourceVector, Cluster as OLSourceCluster } from 'ol/source';
import { default as RLayerBaseVector, RLayerBaseVectorProps } from './RLayerBaseVector';
export interface RLayerClusterProps extends RLayerBaseVectorProps {
    distance?: number;
}
export default class RLayerCluster extends RLayerBaseVector<RLayerClusterProps> {
    ol: OLRLayerVector;
    source: OLSourceCluster;
    cluster: OLSourceVector;
    context: Map;
    constructor(props: Readonly<RLayerClusterProps>, context: React.Context<Map>);
    refresh(prev?: RLayerClusterProps): void;
}
//# sourceMappingURL=RLayerCluster.d.ts.map