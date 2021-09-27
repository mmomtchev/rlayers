import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as DragRotate} from 'ol/interaction/DragRotate';

import {default as RBase} from './RBase';
import debug from '../debug';

export interface RDragRotateProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /** Animation duration
     * @default 250 */
    duration?: number;
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Rotation by clicking and dragging */
export default class RDragRotate extends RBase<RDragRotateProps> {
    static classProps = ['condition', 'duration'];
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
