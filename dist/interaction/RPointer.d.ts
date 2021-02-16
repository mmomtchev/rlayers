import React from 'react';
import { MapBrowserEvent } from 'ol';
import Pointer from 'ol/interaction/Pointer';
import { RContextType } from '../context';
import { RlayersBase } from '../REvent';
export interface RPointerProps {
    handleDownEvent?: (e: MapBrowserEvent) => boolean;
    handleDragEvent?: (e: MapBrowserEvent) => boolean;
    handleEvent?: (e: MapBrowserEvent) => boolean;
    handleMoveEvent?: (e: MapBrowserEvent) => boolean;
    handleUpEvent?: (e: MapBrowserEvent) => boolean;
}
export default class RPointer<P> extends RlayersBase<P, null> {
    static classProps: string[];
    classProps: string[];
    ol: Pointer;
    constructor(props: P, context: React.Context<RContextType>);
    createOL(props: P): Pointer;
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RPointer.d.ts.map