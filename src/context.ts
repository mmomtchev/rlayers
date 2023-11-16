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
import JSONFeature from 'ol/format/JSONFeature';

import RMap from './RMap';
import RLayer, {RLayerProps} from './layer/RLayer';
import RLayerBaseVector, {RLayerBaseVectorProps} from './layer/RLayerBaseVector';
import RFeature from './RFeature';
import RLayerVectorTile from './layer/RLayerVectorTile';
import RenderFeature from 'ol/render/Feature';

export const RContext = React.createContext({} as RContextType);

// Detect the new OpenLayers 8.2.0 FeatureClass
export type OLFeatureClass = RenderFeature extends ReturnType<JSONFeature['readFeatures']>[0]
    ? Feature<Geometry>
    : Geometry;

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
        SourceVector<OLFeatureClass>,
        | CanvasVectorLayerRenderer
        | CanvasVectorTileLayerRenderer
        | CanvasVectorImageLayerRenderer
        | WebGLPointsLayerRenderer
    >;
    readonly vectorsource?: SourceVector<OLFeatureClass>;
    readonly vectortilelayer?: VectorTile;
    /** The current RFeature */
    readonly feature?: Feature<Geometry>;
    /** The current location */
    readonly location?: Coordinate;
    /** The current style */
    readonly style?: Style;
    /** The current style array */
    readonly styleArray?: Style[];

    /** The current RMap component */
    readonly rMap?: RMap;
    /** The current RLayer component */
    readonly rLayer?: RLayer<RLayerProps>;
    /** The current RLayerVector component */
    readonly rLayerVector?: RLayerBaseVector<RLayerBaseVectorProps>;
    /** The current RLayerVectorTile component */
    readonly rLayerVectorTile?: RLayerVectorTile;
    /** The current RFeature component */
    readonly rFeature?: RFeature;
}

export function useOL() {
    const context = React.useContext(RContext);
    return {
        map: context.map,
        layer: context.layer,
        source: context.source,
        vectorlayer: context.vectorlayer,
        vectorsource: context.vectorsource,
        vectortilelayer: context.vectortilelayer,
        feature: context.feature,
        location: context.location,
        style: context.style,
        styleArray: context.styleArray
    };
}

export function useRLayersComponent() {
    const context = React.useContext(RContext);
    return {
        rMap: context.rMap,
        rLayer: context.rLayer,
        rLayerVector: context.rLayerVector,
        rLayerVectorTile: context.rLayerVectorTile,
        rFeature: context.rFeature
    };
}
