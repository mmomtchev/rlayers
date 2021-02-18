import React from 'react';
import { Vector as LayerVector } from 'ol/layer';
import { Vector as SourceVector, Cluster as SourceCluster } from 'ol/source';
import { RContextType } from '../context';
import { default as RLayerBaseVector, RLayerBaseVectorProps } from './RLayerBaseVector';
export interface RLayerClusterProps extends RLayerBaseVectorProps {
    distance?: number;
}
export default class RLayerCluster extends RLayerBaseVector<RLayerClusterProps> {
    ol: LayerVector;
    source: SourceCluster;
    cluster: SourceVector;
    constructor(props: Readonly<RLayerClusterProps>, context: React.Context<RContextType>);
    refresh(prev?: RLayerClusterProps): void;
}
//# sourceMappingURL=RLayerCluster.d.ts.map