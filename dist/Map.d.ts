import React from 'react';
import { Map as OLMap, MapBrowserEvent } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ReactLayersBase } from './Event';
export interface MapProps {
    center: Coordinate;
    zoom: number;
    className?: string;
    width?: number;
    height?: number;
    noDefaultControls?: boolean;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onMoveStart?: (e: MapBrowserEvent) => boolean | void;
    onMoveEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
}
export declare const MapContext: React.Context<any>;
export default class Map extends ReactLayersBase<MapProps, null> {
    ol: OLMap;
    target: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<MapProps>);
    componentDidMount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Map.d.ts.map