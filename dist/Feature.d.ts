import React from 'react';
import { Map as OLMap, MapBrowserEvent } from 'ol';
import { Vector as OLLayerVector } from 'ol/layer';
import { Feature as OLFeature } from 'ol';
import { StyleLike } from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';
import { Coordinate } from 'ol/coordinate';
import { VectorContextType } from './layer/LayerVector';
import { ReactLayersBase } from './Event';
export interface FeatureProps {
    geometry?: Geometry;
    style?: StyleLike;
    properties?: Record<string, unknown>;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerDragEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
}
export interface LocationContextType {
    map: OLMap;
    layer: OLLayerVector;
    feature: OLFeature;
    location: Coordinate;
}
export declare const LocationContext: React.Context<any>;
export default class Feature extends ReactLayersBase<FeatureProps, null> {
    static contextType: React.Context<any>;
    static lastFeatureEntered: undefined | OLFeature;
    static lastFeatureDragged: undefined | OLFeature;
    static hitTolerance: number;
    ol: OLFeature;
    context: VectorContextType;
    onchange: () => boolean | void;
    constructor(props: Readonly<FeatureProps>, context: React.Context<VectorContextType>);
    static initEventRelay(map: OLMap): void;
    static eventRelay(e: MapBrowserEvent): boolean;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Feature.d.ts.map