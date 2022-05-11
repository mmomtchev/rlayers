import React from 'react';
import {ObjectEvent} from 'ol/Object';
import {default as PinchRotate} from 'ol/interaction/PinchRotate';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RPinchRotate
 */
export interface RPinchRotateProps {
    /** Minimum angle in radians for rotation
     * @default 0.3 */
    threshold?: number;
    /** Animation duration
     * @default 250 */
    duration?: number;
    /** Called on every change */
    onChange?: (this: RPinchRotate, e: ObjectEvent) => void;
}

/** Rotation by pinching */
export default class RPinchRotate extends RBaseInteraction<RPinchRotateProps> {
    static classProps = ['threshold', 'duration'];
    ol: PinchRotate;

    createOL(props: RPinchRotateProps): PinchRotate {
        this.classProps = RPinchRotate.classProps;
        return new PinchRotate(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
