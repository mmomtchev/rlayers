import React from 'react';
import {ObjectEvent} from 'ol/Object';
import {default as DoubleClickZoom} from 'ol/interaction/DoubleClickZoom';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RDoubleClickZoom
 */
export interface RDoubleClickZoomProps {
    /** Animation duration
     * @default 250 */
    duration?: number;
    /** Zoom delta
     * @default 1 */
    delta?: number;
    /** Called on every change */
    onChange?: (this: RDoubleClickZoom, e: ObjectEvent) => void;
}

/** Zooming by double click */
export default class RDoubleClickZoom extends RBaseInteraction<RDoubleClickZoomProps> {
    static classProps = ['duration', 'delta'];
    ol: DoubleClickZoom;

    createOL(props: RDoubleClickZoomProps): DoubleClickZoom {
        this.classProps = RDoubleClickZoom.classProps;
        return new DoubleClickZoom(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
