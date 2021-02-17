import { ObjectEvent } from 'ol/Object';
import { default as PinchRotate } from 'ol/interaction/PinchRotate';
import { default as RBase } from './RBase';
export interface RPinchRotateProps {
    threshold?: number;
    duration?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RPinchRotate extends RBase<RPinchRotateProps> {
    static classProps: string[];
    ol: PinchRotate;
    createOL(props: RPinchRotateProps): PinchRotate;
}
//# sourceMappingURL=RPinchRotate.d.ts.map