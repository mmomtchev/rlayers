import React from 'react';
import {Map as Map} from 'ol';
import Layer from 'ol/layer/Layer';
import Source from 'ol/source/Source';
import BaseVector from 'ol/layer/BaseVector';
import SourceVector from 'ol/source/Vector';
import VectorTile from 'ol/layer/VectorTile';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import CanvasVectorImageLayerRenderer from 'ol/renderer/canvas/VectorImageLayer';
import WebGLPointsLayerRenderer from 'ol/renderer/webgl/PointsLayer';
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
    readonly map?: Map;
    /** The current layer */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly layer?: Layer<Source, LayerRenderer<any>>;
    readonly source?: Source;
    /** The current vector layer */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly vectorlayer?: BaseVector<
        SourceVector<Geometry>,
        | CanvasVectorLayerRenderer
        | CanvasVectorTileLayerRenderer
        | CanvasVectorImageLayerRenderer
        | WebGLPointsLayerRenderer
    >;
    readonly vectorsource?: SourceVector<Geometry>;
    readonly vectortilelayer?: VectorTile;
    /** The current RFeature */
    readonly feature?: Feature<Geometry>;
    /** The current location */
    readonly location?: Coordinate;
    /** The current style */
    readonly style?: Style;
    /** The current style array */
    readonly styleArray?: Style[];
}
