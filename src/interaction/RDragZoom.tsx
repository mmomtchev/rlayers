import React from 'react';
import {MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as DragZoom} from 'ol/interaction/DragZoom';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RDragZoom
 */
export interface RDragZoomProps {
    /** Optionnal CSS class for styling the box
     * @default ol-dragzoom */
    className?: string;
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => boolean;
    /** Animation duration
     * @default 200 */
    duration?: number;
    /** Use interaction for zooming out
     * @default false */
    out?: boolean;
    /** Minimum area that can be selected
     * @default 64 */
    minArea?: number;
    /** Called on every change */
    onChange?: (this: RDragZoom, e: ObjectEvent) => void;
}

/** Zoom by dragging a box, see `RDragBox` for selecting features */
export default class RDragZoom extends RBaseInteraction<RDragZoomProps> {
    protected static classProps = ['className', 'condition', 'duration', 'out', 'minArea'];
    ol: DragZoom;

    createOL(props: RDragZoomProps): DragZoom {
        this.classProps = RDragZoom.classProps;
        return new DragZoom(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
