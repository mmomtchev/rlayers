import React from 'react';
import { Map, MapBrowserEvent } from 'ol';
import { default as DragBox, DragBoxEvent } from 'ol/interaction/DragBox';
import { default as RPointer } from './RPointer';
import { Pixel } from 'ol/pixel';
export interface RDragBoxProps {
    className?: string;
    condition?: (e: MapBrowserEvent) => boolean;
    minArea?: number;
    boxEndCondition?: (e: MapBrowserEvent, p1: Pixel, p2: Pixel) => boolean;
    onBoxStart?: (e: DragBoxEvent) => void;
    onBoxEnd?: (e: DragBoxEvent) => void;
}
export default class RDragBox extends RPointer<RDragBoxProps> {
    static contextType: React.Context<any>;
    static classProps: string[];
    ol: DragBox;
    context: Map;
    createOL(props: RDragBoxProps): DragBox;
    refresh(prevProps: RDragBoxProps): void;
}
//# sourceMappingURL=RDragBox.d.ts.map