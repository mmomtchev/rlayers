import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as MouseWheelZoom} from 'ol/interaction/MouseWheelZoom';

import {default as RBase} from './RBase';
import debug from '../debug';

export interface RMouseWheelZoomProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent) => boolean;
    /** Zoom speed, @default 1 */
    maxDelta?: number;
    /** Animation duration in ms @default 250 */
    duration?: number;
    /** Center of zoom is the mouse position @default true */
    useAnchor?: boolean;
    /** Allow only integer zoom levels @default false */
    constrainResolution?: boolean;
    /** Called on every change */
    onChange?: (e: ObjectEvent) => void;
}

/** Mouse wheel zoom
 */
export default class RMouseWheelZoom extends RBase<RMouseWheelZoomProps> {
    static classProps = ['condition', 'maxDelta', 'duration', 'useAnchor', 'constrainResolution'];
    ol: MouseWheelZoom;

    createOL(props: RMouseWheelZoomProps): MouseWheelZoom {
        this.classProps = RMouseWheelZoom.classProps;
        return new MouseWheelZoom(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
