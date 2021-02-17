import { MapBrowserEvent } from 'ol';
import { ObjectEvent } from 'ol/Object';
import { default as KeyboardPan } from 'ol/interaction/KeyboardPan';
import { default as RBase } from './RBase';
export interface RKeyboardPanProps {
    condition?: (e: MapBrowserEvent) => boolean;
    duration?: number;
    pixelDelta?: number;
    onChange?: (e: ObjectEvent) => void;
}
export default class RKeyboardPan extends RBase<RKeyboardPanProps> {
    static classProps: string[];
    ol: KeyboardPan;
    createOL(props: RKeyboardPanProps): KeyboardPan;
}
//# sourceMappingURL=RKeyboardPan.d.ts.map