import React from 'react';
import {MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as KeyboardPan} from 'ol/interaction/KeyboardPan';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RKeyboardPan
 */
export interface RKeyboardPanProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /** Animation duration
     * @default 100 */
    duration?: number;
    /** Pan delta
     * @default 128 */
    pixelDelta?: number;
    /** Called on every change */
    onChange?: (this: RKeyboardPan, e: ObjectEvent) => void;
}

/** Pan with the arrow keys on the keyboard */
export default class RKeyboardPan extends RBaseInteraction<RKeyboardPanProps> {
    static classProps = ['condition', 'duration', 'pixelDelta'];
    ol: KeyboardPan;

    createOL(props: RKeyboardPanProps): KeyboardPan {
        this.classProps = RKeyboardPan.classProps;
        return new KeyboardPan(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
