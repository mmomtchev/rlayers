import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as MouseWheelZoom } from 'ol/interaction/MouseWheelZoom';
import { default as RBase } from './RBase';
export interface RMouseWheelZoomProps {
    condition?: (e: MapBrowserEvent) => boolean;
    maxDelta?: number;
    duration?: number;
    useAnchor?: boolean;
    constrainResolution?: boolean;
    onChange?: (e: ObjectEvent) => void;
}
export default class RMouseWheelZoom extends RBase<RMouseWheelZoomProps> {
    static classProps: string[];
    ol: MouseWheelZoom;
    createOL(props: RMouseWheelZoomProps): MouseWheelZoom;
}
//# sourceMappingURL=RMouseWheelZoom.d.ts.map