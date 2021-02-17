import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as KeyboardZoom } from 'ol/interaction/KeyboardZoom';
import { default as RBase } from './RBase';
export interface RKeyboardZoomProps {
    condition?: (e: MapBrowserEvent) => boolean;
    duration?: number;
    delta?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RKeyboardZoom extends RBase<RKeyboardZoomProps> {
    static classProps: string[];
    ol: KeyboardZoom;
    createOL(props: RKeyboardZoomProps): KeyboardZoom;
}
//# sourceMappingURL=RKeyboardZoom.d.ts.map