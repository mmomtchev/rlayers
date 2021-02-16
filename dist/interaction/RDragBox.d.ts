import { MapBrowserEvent } from 'ol';
import { Pixel } from 'ol/pixel';
import { default as DragBox, DragBoxEvent } from 'ol/interaction/DragBox';
import { default as RPointer } from './RPointer';
export interface RDragBoxProps {
    className?: string;
    condition?: (e: MapBrowserEvent) => boolean;
    minArea?: number;
    boxEndCondition?: (e: MapBrowserEvent, p1: Pixel, p2: Pixel) => boolean;
    onBoxStart?: (e: DragBoxEvent) => void;
    onBoxEnd?: (e: DragBoxEvent) => void;
}
export default class RDragBox extends RPointer<RDragBoxProps> {
    static classProps: string[];
    ol: DragBox;
    createOL(props: RDragBoxProps): DragBox;
}
//# sourceMappingURL=RDragBox.d.ts.map