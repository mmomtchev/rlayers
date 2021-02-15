import React from 'react';
import { Map as Map, MapBrowserEvent } from 'ol';
import { Feature } from 'ol';
import { Layer } from 'ol/layer';
import Geometry from 'ol/geom/Geometry';
import { RVectorContextType } from './context';
import { RlayersBase } from './REvent';
import { RStyleLike } from './style/RStyle';
export interface RFeatureProps {
    geometry?: Geometry;
    style?: RStyleLike;
    properties?: Record<string, unknown>;
    feature?: Feature;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onSingleClick?: (e: MapBrowserEvent) => boolean | void;
    onDblClick?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerDragEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
}
export default class RFeature extends RlayersBase<RFeatureProps, null> {
    static pointerEvents: string[];
    static contextType: React.Context<any>;
    static lastFeatureEntered: undefined | {
        feature: Feature;
        layer: Layer;
    };
    static lastFeatureDragged: undefined | {
        feature: Feature;
        layer: Layer;
    };
    static hitTolerance: number;
    ol: Feature;
    context: RVectorContextType;
    onchange: () => boolean | void;
    constructor(props: Readonly<RFeatureProps>, context: React.Context<RVectorContextType>);
    static initEventRelay(map: Map): void;
    static dispatchEvent(feature: Feature, layer: Layer, event: MapBrowserEvent): boolean;
    static eventRelay(e: MapBrowserEvent): boolean;
    refresh(prevProps: RFeatureProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RFeature.d.ts.map