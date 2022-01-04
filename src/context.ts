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
import LayerRenderer from 'ol/renderer/Layer';

export const RContext = React.createContext({} as RContextType);

/**
 * Context type
 */
export interface RContextType {
    /** The current map */
    map?: Map;
    /** The current layer */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    layer?: Layer<Source, LayerRenderer<any>>;
    source?: Source;
    /** The current vector layer */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vectorlayer?: BaseVector<SourceVector<Geometry>, LayerRenderer<any>>;
    vectorsource?: SourceVector<Geometry>;
    /** The current RFeature */
    feature?: Feature<Geometry>;
    /** The current location */
    location?: Coordinate;
    /** The current style */
    style?: Style;
    /** The current style array */
    styleArray?: Style[];
}
