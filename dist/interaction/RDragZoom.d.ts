import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as DragZoom } from 'ol/interaction/DragZoom';
import { default as RBase } from './RBase';
export interface RDragZoomProps {
    className?: string;
    condition?: (e: MapBrowserEvent) => boolean;
    duration?: number;
    out?: boolean;
    minArea?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RDragZoom extends RBase<RDragZoomProps> {
    static classProps: string[];
    ol: DragZoom;
    createOL(props: RDragZoomProps): DragZoom;
}
//# sourceMappingURL=RDragZoom.d.ts.map