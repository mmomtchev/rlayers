import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';

import RBase from './RBase';
import debug from '../debug';

export interface RDoubleClickZoomProps {
    /** Animation duration @default 250 */
    duration?: number;
    /** Zoom delta @default 1 */
    delta?: number;
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Zooming by double click
 */
export default class RDoubleClickZoom extends RBase<RDoubleClickZoomProps> {
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
