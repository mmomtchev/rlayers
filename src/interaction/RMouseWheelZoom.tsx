import React from 'react';
import {MapBrowserEvent} from 'ol';
import {ObjectEvent} from 'ol/Object';
import {default as MouseWheelZoom} from 'ol/interaction/MouseWheelZoom';

import {default as RBaseInteraction} from './RBaseInteraction';
import debug from '../debug';

/**
 * @propsfor RMouseWheelZoom
 */
export interface RMouseWheelZoomProps {
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<PointerEvent | KeyboardEvent | WheelEvent>) => boolean;
    /** Zoom speed
     * @default 1 */
    maxDelta?: number;
    /** Animation duration in ms
     * @default 250 */
    duration?: number;
    /** Center of zoom is the mouse position
     * @default true */
    useAnchor?: boolean;
    /** Allow only integer zoom levels
     * @default false */
    constrainResolution?: boolean;
    /** Called on every change */
    onChange?: (this: RMouseWheelZoom, e: ObjectEvent) => void;
}

/** Mouse wheel zoom */
export default class RMouseWheelZoom extends RBaseInteraction<RMouseWheelZoomProps> {
    protected static classProps = [
        'condition',
        'maxDelta',
        'duration',
        'useAnchor',
        'constrainResolution'
    ];
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
