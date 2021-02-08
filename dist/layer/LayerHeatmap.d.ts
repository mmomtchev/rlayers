import React from 'react';
import { Map as OLMap, Feature as OLFeature } from 'ol';
import { Heatmap as OLLayerHeatmap } from 'ol/layer';
import { Vector as OLSourceVector } from 'ol/source';
import { default as LayerBaseVector, LayerBaseVectorProps } from './LayerBaseVector';
export interface LayerHeatmapProps extends LayerBaseVectorProps {
    blur?: number;
    radius?: number;
    weight?: (f: OLFeature) => number;
}
declare class LayerHeatmap extends LayerBaseVector<LayerHeatmapProps> {
    ol: OLLayerHeatmap;
    source: OLSourceVector;
    context: OLMap;
    constructor(props: Readonly<LayerHeatmapProps>, context: React.Context<OLMap>);
    refresh(prev?: LayerHeatmapProps): void;
}
export default LayerHeatmap;
//# sourceMappingURL=LayerHeatmap.d.ts.map