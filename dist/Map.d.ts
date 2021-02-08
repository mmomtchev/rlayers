import React from 'react';
import { Map as OLMap, MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import { Coordinate } from 'ol/coordinate';
import { ReactLayersBase } from './Event';
export interface MapProps {
    center: Coordinate;
    zoom: number;
    className?: string;
    width?: number;
    height?: number;
    noDefaultControls?: boolean;
    projection?: string;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onSingleClick?: (e: MapBrowserEvent) => boolean | void;
    onDblClick?: (e: MapBrowserEvent) => boolean | void;
    onMoveStart?: (e: MapBrowserEvent) => boolean | void;
    onMoveEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPostRender?: (e: MapEvent) => boolean | void;
    OnPreCompose?: (e: RenderEvent) => boolean | void;
    OnPostCompose?: (e: RenderEvent) => boolean | void;
    OnRenderComplete?: (e: RenderEvent) => boolean | void;
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