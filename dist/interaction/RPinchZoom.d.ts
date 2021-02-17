import { ObjectEvent } from 'ol/Object';
import { default as PinchZoom } from 'ol/interaction/PinchZoom';
import { default as RBase } from './RBase';
export interface RPinchZoomProps {
    duration?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RPinchZoom extends RBase<RPinchZoomProps> {
    static classProps: string[];
    ol: PinchZoom;
    createOL(props: RPinchZoomProps): PinchZoom;
}
//# sourceMappingURL=RPinchZoom.d.ts.map