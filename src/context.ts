import React from 'react';
import {Map as Map} from 'ol';
import BaseVector from 'ol/layer/BaseVector';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import {Feature} from 'ol';
import {Coordinate} from 'ol/coordinate';

export const RMapContext = React.createContext(null);

export const RLayerContext = React.createContext(null);

/**
 * Location context type
 */
export interface RLocationContextType {
    /** The current map */
    map: Map;
    /** The current layer */
    layer: LayerVector;
    /** The current RFeature */
    feature: Feature;
    /** The current location */
    location: Coordinate;
}

export const RLocationContext = React.createContext(null);

export interface RVectorContextType {
    map: Map;
    layer: BaseVector;
    source: SourceVector;
}

export const RVectorContext = React.createContext(null);

export const RStyleContext = React.createContext(null);
