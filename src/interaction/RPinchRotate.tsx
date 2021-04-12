import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import PinchRotate from 'ol/interaction/PinchRotate';

import RBase from './RBase';
import debug from '../debug';

export interface RPinchRotateProps {
    /** Minimum angle in radians for rotation
     * @default 0.3 */
    threshold?: number;
    /** Animation duration
     * @default 250 */
    duration?: number;
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Rotation by pinching */
export default class RPinchRotate extends RBase<RPinchRotateProps> {
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
