import React from 'react';
import { Map as Map } from 'ol';
import BaseVector from 'ol/layer/BaseVector';
import SourceVector from 'ol/source/Vector';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Style from 'ol/style/Style';
export declare const RContext: React.Context<any>;
export interface RContextType {
    map?: Map;
    vectorlayer?: BaseVector;
    vectorsource?: SourceVector;
    feature?: Feature;
    location?: Coordinate;
    style?: Style;
}
//# sourceMappingURL=context.d.ts.map