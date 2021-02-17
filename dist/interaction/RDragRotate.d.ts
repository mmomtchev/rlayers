import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as DragRotate } from 'ol/interaction/DragRotate';
import { default as RBase } from './RBase';
export interface RDragRotateProps {
    condition?: (e: MapBrowserEvent) => boolean;
    duration?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RDragRotate extends RBase<RDragRotateProps> {
    static classProps: string[];
    ol: DragRotate;
    createOL(props: RDragRotateProps): DragRotate;
}
//# sourceMappingURL=RDragRotate.d.ts.map