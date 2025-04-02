import React from 'react';
import {MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as DragRotate} from 'ol/interaction/DragRotate';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RDragRotate
 */
export interface RDragRotateProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => boolean;
    /** Animation duration
     * @default 250 */
    duration?: number;
    /** Called on every change */
    onChange?: (this: RDragRotate, e: ObjectEvent) => void;
}

/** Rotation by clicking and dragging */
export default class RDragRotate extends RBaseInteraction<RDragRotateProps> {
    protected static classProps = ['condition', 'duration'];
    ol: DragRotate;

    createOL(props: RDragRotateProps): DragRotate {
        this.classProps = RDragRotate.classProps;
        return new DragRotate(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
