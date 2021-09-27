import React from 'react';
import {Map as Map} from 'ol';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import BaseVector from 'ol/layer/BaseVector';
import SourceVector from 'ol/source/Vector';
import {Feature} from 'ol';
import {Coordinate} from 'ol/coordinate';
import Style from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';

export const RContext = React.createContext({} as RContextType);

/**
 * Context type
 */
export interface RContextType {
    /** The current map */
    map?: Map;
    /** The current layer */
    layer?: Layer<Source>;
    source?: Source;
    /** The current vector layer */
    vectorlayer?: BaseVector<SourceVector<Geometry>>;
    vectorsource?: SourceVector<Geometry>;
    /** The current RFeature */
    feature?: Feature<Geometry>;
    /** The current location */
    location?: Coordinate;
    /** The current style */
    style?: Style;
}
