import React from 'react';
import { Map as Map } from 'ol';
import { Vector as LayerVector } from 'ol/layer';
import { Vector as SourceVector } from 'ol/source';
import { default as RLayerBaseVector, RLayerBaseVectorProps } from './RLayerBaseVector';
export default class RLayerVector extends RLayerBaseVector<RLayerBaseVectorProps> {
    ol: LayerVector;
    source: SourceVector;
    context: Map;
    constructor(props: Readonly<RLayerBaseVectorProps>, context: React.Context<Map>);
}
//# sourceMappingURL=RLayerVector.d.ts.map