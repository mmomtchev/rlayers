import React from 'react';
import { Map as OLMap } from 'ol';
import { Vector as OLLayerVector } from 'ol/layer';
import { Vector as OLSourceVector, Cluster as OLSourceCluster } from 'ol/source';
import { default as LayerBaseVector, LayerBaseVectorProps } from './LayerBaseVector';
export interface LayerClusterProps extends LayerBaseVectorProps {
    distance?: number;
}
declare class LayerCluster extends LayerBaseVector<LayerClusterProps> {
    ol: OLLayerVector;
    source: OLSourceCluster;
    cluster: OLSourceVector;
    context: OLMap;
    constructor(props: Readonly<LayerClusterProps>, context: React.Context<OLMap>);
    refresh(prev?: LayerClusterProps): void;
}
export default LayerCluster;
//# sourceMappingURL=LayerCluster.d.ts.map