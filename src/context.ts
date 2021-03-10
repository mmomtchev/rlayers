import React from 'react';
import {Map as Map} from 'ol';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import BaseVector from 'ol/layer/BaseVector';
import SourceVector from 'ol/source/Vector';
import {Feature} from 'ol';
import {Coordinate} from 'ol/coordinate';
import Style from 'ol/style/Style';

export const RContext = React.createContext(null as RContextType);

/**
 * Context type
 */
export interface RContextType {
    /** The current map */
    map?: Map;
    /** The current layer */
    layer?: Layer;
    source?: Source;
    /** The current vector layer */
    vectorlayer?: BaseVector;
    vectorsource?: SourceVector;
    /** The current RFeature */
    feature?: Feature;
    /** The current location */
    location?: Coordinate;
    /** The current style */
    style?: Style;
}
