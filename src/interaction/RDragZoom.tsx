import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import DragZoom from 'ol/interaction/DragZoom';

import RBase from './RBase';
import debug from '../debug';

export interface RDragZoomProps {
    /** Optionnal CSS class for styling the box @default ol-dragzoom */
    className?: string;
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent) => boolean;
    /** Animation duration @default 200 */
    duration?: number;
    /** Use interaction for zooming out @default false */
    out?: boolean;
    /** Minimum area that can be selected @default 64 */
    minArea?: number;
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Zoom by dragging a box
 */
export default class RDragZoom extends RBase<RDragZoomProps> {
    static classProps = ['className', 'condition', 'duration', 'out', 'minArea'];
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
