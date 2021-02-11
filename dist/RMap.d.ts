import React from 'react';
import { Map, MapBrowserEvent, MapEvent } from 'ol';
import RenderEvent from 'ol/render/Event';
import { Extent } from 'ol/extent';
import { Coordinate } from 'ol/coordinate';
import { ReactLayersBase } from './REvent';
export interface RMapProps {
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
    onPreCompose?: (e: RenderEvent) => boolean | void;
    onPostCompose?: (e: RenderEvent) => boolean | void;
    onRenderComplete?: (e: RenderEvent) => boolean | void;
    properties?: Record<string, unknown>;
    extent?: Extent;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
}
export default class RMap extends ReactLayersBase<RMapProps, null> {
    ol: Map;
    target: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<RMapProps>);
    componentDidMount(): void;
    refresh(prevProps?: RMapProps): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RMap.d.ts.map