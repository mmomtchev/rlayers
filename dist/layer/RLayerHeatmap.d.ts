import React from 'react';
import { Feature } from 'ol';
import { Heatmap as OLRLayerHeatmap } from 'ol/layer';
import { Vector as OLSourceVector } from 'ol/source';
import { RContextType } from '../context';
import { default as RLayerBaseVector, RLayerBaseVectorProps } from './RLayerBaseVector';
export interface RLayerHeatmapProps extends RLayerBaseVectorProps {
    blur?: number;
    radius?: number;
    weight?: (f: Feature) => number;
}
export default class RLayerHeatmap extends RLayerBaseVector<RLayerHeatmapProps> {
    ol: OLRLayerHeatmap;
    source: OLSourceVector;
    constructor(props: Readonly<RLayerHeatmapProps>, context: React.Context<RContextType>);
    refresh(prev?: RLayerHeatmapProps): void;
}
//# sourceMappingURL=RLayerHeatmap.d.ts.map