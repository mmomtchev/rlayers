import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import Pointer from 'ol/interaction/Pointer';

import {RContextType} from '../context';
import RBase from './RBase';
import debug from '../debug';

export interface RPointerProps {
    /** Called on down event (click or touch)
     * if it returns true, a drag sequence is started
     */
    handleDownEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every move event while dragging */
    handleDragEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every event, use with care */
    handleEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every pointer move, use with care */
    handleMoveEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on up event (end of click or touch) */
    handleUpEvent?: (e: MapBrowserEvent) => boolean;
}

/**
 * A basic pointer interaction component
 *
 * It is meant to be be extended by more specific interactions
 */
export default class RPointer<P> extends RBase<P> {
    static classProps = ['handleDownEvent', 'handleDragEvent', 'handleMoveEvent', 'handleUpEvent'];
    classProps: string[];
    ol: Pointer;
}
