import React from 'react';
import {ObjectEvent} from 'ol/Object';
import {default as PinchZoom} from 'ol/interaction/PinchZoom';

import {default as RBase} from './RBase';
import debug from '../debug';

/**
 * Properties for RPinchZoom
 */
export interface RPinchZoomProps {
    /** Animation duration
     * @default 400 */
    duration?: number;
    /** Called on every change */
    onChange?: (this: RPinchZoom, e: ObjectEvent) => void;
}

/** Zoom by pinching */
export default class RPinchZoom extends RBase<RPinchZoomProps> {
    static classProps = ['duration'];
    ol: PinchZoom;

    createOL(props: RPinchZoomProps): PinchZoom {
        this.classProps = RPinchZoom.classProps;
        return new PinchZoom(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
