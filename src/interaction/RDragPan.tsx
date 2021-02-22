import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import DragPan from 'ol/interaction/DragPan';

import RBase from './RBase';
import debug from '../debug';

export interface RDragPanProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent) => boolean;
    /** Kinetic parameters */
    kinetic?: {
        decay: number;
        minVelocity: number;
        delay: number;
    };
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Panning by dragging
 */
export default class RDragPan extends RBase<RDragPanProps> {
    static classProps = ['condition', 'kinetic'];
    ol: DragPan;

    createOL(props: RDragPanProps): DragPan {
        this.classProps = RDragPan.classProps;
        return new DragPan(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
