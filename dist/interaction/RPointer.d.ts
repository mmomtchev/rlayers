import React from 'react';
import { Map, MapBrowserEvent } from 'ol';
import Pointer from 'ol/interaction/Pointer';
import { RlayersBase } from '../REvent';
export interface RPointerProps {
    handleDownEvent?: (e: MapBrowserEvent) => boolean;
    handleDragEvent?: (e: MapBrowserEvent) => boolean;
    handleEvent?: (e: MapBrowserEvent) => boolean;
    handleMoveEvent?: (e: MapBrowserEvent) => boolean;
    handleUpEvent?: (e: MapBrowserEvent) => boolean;
}
export default class RPointer<P> extends RlayersBase<P, null> {
    static contextType: React.Context<any>;
    static classProps: string[];
    classProps: string[];
    ol: Pointer;
    context: Map;
    constructor(props: P, context: React.Context<Map>);
    createOL(props: P): Pointer;
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RPointer.d.ts.map