import React from 'react';
import { Map as OLMap } from 'ol';
import { Vector as OLLayerVector } from 'ol/layer';
import { Vector as OLSourceVector } from 'ol/source';
import { default as LayerBaseVector, LayerBaseVectorProps } from './LayerBaseVector';
declare class LayerVector extends LayerBaseVector<LayerBaseVectorProps> {
    ol: OLLayerVector;
    source: OLSourceVector;
    context: OLMap;
    constructor(props: Readonly<LayerBaseVectorProps>, context: React.Context<OLMap>);
}
export default LayerVector;
//# sourceMappingURL=LayerVector.d.ts.map