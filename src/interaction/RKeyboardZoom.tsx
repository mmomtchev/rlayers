import React from 'react';
import {MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as KeyboardZoom} from 'ol/interaction/KeyboardZoom';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RKeyboardZoom
 */
export interface RKeyboardZoomProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => boolean;
    /** Animation duration
     * @default 100 */
    duration?: number;
    /** Zoom delta
     * @default 1 */
    delta?: number;
    /** Called on every change */
    onChange?: (this: RKeyboardZoom, e: ObjectEvent) => void;
}

/** Zoom with +/- keys on the keyboard */
export default class RKeyboardZoom extends RBaseInteraction<RKeyboardZoomProps> {
    protected static classProps = ['condition', 'duration', 'delta'];
    ol: KeyboardZoom;

    createOL(props: RKeyboardZoomProps): KeyboardZoom {
        this.classProps = RKeyboardZoom.classProps;
        return new KeyboardZoom(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
