import React from 'react';
import { Map as Map } from 'ol';
import BaseVector from 'ol/layer/BaseVector';
import { Vector as LayerVector } from 'ol/layer';
import { Vector as SourceVector } from 'ol/source';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
export declare const RMapContext: React.Context<any>;
export declare const RLayerContext: React.Context<any>;
export interface RLocationContextType {
    map: Map;
    layer: LayerVector;
    feature: Feature;
    location: Coordinate;
}
export declare const RLocationContext: React.Context<any>;
export interface RVectorContextType {
    map: Map;
    layer: BaseVector;
    source: SourceVector;
}
export declare const RVectorContext: React.Context<any>;
export declare const RStyleContext: React.Context<any>;
//# sourceMappingURL=context.d.ts.map