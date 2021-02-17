import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as DragPan } from 'ol/interaction/DragPan';
import { default as RBase } from './RBase';
export interface RDragPanProps {
    condition?: (e: MapBrowserEvent) => boolean;
    kinetic?: {
        decay: number;
        minVelocity: number;
        delay: number;
    };
    onChange?: (e: ObjectEvent) => void;
}
export default class RDragPan extends RBase<RDragPanProps> {
    static classProps: string[];
    ol: DragPan;
    createOL(props: RDragPanProps): DragPan;
}
//# sourceMappingURL=RDragPan.d.ts.map