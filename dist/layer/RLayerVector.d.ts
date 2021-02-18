import React from 'react';
import { Vector as LayerVector } from 'ol/layer';
import { Vector as SourceVector } from 'ol/source';
import { RContextType } from '../context';
import { default as RLayerBaseVector, RLayerBaseVectorProps } from './RLayerBaseVector';
export default class RLayerVector extends RLayerBaseVector<RLayerBaseVectorProps> {
    ol: LayerVector;
    source: SourceVector;
    constructor(props: Readonly<RLayerBaseVectorProps>, context: React.Context<RContextType>);
    refresh(prevProps?: RLayerBaseVectorProps): void;
}
//# sourceMappingURL=RLayerVector.d.ts.map