import { ObjectEvent } from 'ol/Object';
import { default as DoubleClickZoom } from 'ol/interaction/DoubleClickZoom';
import { default as RBase } from './RBase';
export interface RDoubleClickZoomProps {
    duration?: number;
    delta?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RDoubleClickZoom extends RBase<RDoubleClickZoomProps> {
    static classProps: string[];
    ol: DoubleClickZoom;
    createOL(props: RDoubleClickZoomProps): DoubleClickZoom;
}
//# sourceMappingURL=RDoubleClickZoom.d.ts.map