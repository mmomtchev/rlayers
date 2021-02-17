import React from 'react';
import { Map as Map, MapBrowserEvent } from 'ol';
import { Feature } from 'ol';
import BaseVectorLayer from 'ol/layer/BaseVector';
import Geometry from 'ol/geom/Geometry';
import { RContextType } from './context';
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
declare type FeatureRef = {
    feature: Feature;
    layer: BaseVectorLayer;
};
export default class RFeature extends RlayersBase<RFeatureProps, null> {
    static pointerEvents: string[];
    static lastFeaturesEntered: FeatureRef[];
    static lastFeaturesDragged: FeatureRef[];
    static hitTolerance: number;
    ol: Feature;
    onchange: () => boolean | void;
    constructor(props: Readonly<RFeatureProps>, context: React.Context<RContextType>);
    static initEventRelay(map: Map): void;
    static dispatchEvent(fr: FeatureRef, event: MapBrowserEvent): boolean;
    static eventRelay(e: MapBrowserEvent): boolean;
    refresh(prevProps: RFeatureProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=RFeature.d.ts.map