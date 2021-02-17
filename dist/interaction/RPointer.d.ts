import { MapBrowserEvent } from 'ol';
import Pointer from 'ol/interaction/Pointer';
import { default as RBase } from './RBase';
export interface RPointerProps {
    handleDownEvent?: (e: MapBrowserEvent) => boolean;
    handleDragEvent?: (e: MapBrowserEvent) => boolean;
    handleEvent?: (e: MapBrowserEvent) => boolean;
    handleMoveEvent?: (e: MapBrowserEvent) => boolean;
    handleUpEvent?: (e: MapBrowserEvent) => boolean;
}
export default class RPointer<P> extends RBase<P> {
    static classProps: string[];
    classProps: string[];
    ol: Pointer;
}
//# sourceMappingURL=RPointer.d.ts.map