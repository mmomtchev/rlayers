import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {Pixel} from 'ol/pixel';
import {default as DragBox, DragBoxEvent} from 'ol/interaction/DragBox';

import {default as RPointer} from './RPointer';
import debug from '../debug';

export interface RDragBoxProps {
    /** A CSS class to be used for the box */
    className?: string;
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent) => boolean;
    /** Minimum area that needs to be selected */
    minArea?: number;
    /** An optional OpenLayers condition */
    boxEndCondition?: (e: MapBrowserEvent, p1: Pixel, p2: Pixel) => boolean;
    /** Called when the user starts dragging */
    onBoxStart?: (e: DragBoxEvent) => void;
    /** Called on selection
     * (note that this is the OpenLayers event, not the constructor property) */
    onBoxEnd?: (e: DragBoxEvent) => void;
}

/** A basic pointer interaction component
 * It is meant to be be extended by more specific interactions
 */
export default class RDragBox extends RPointer<RDragBoxProps> {
    static classProps = ['className', 'condition', 'minArea', 'boxEndCondition'];
    ol: DragBox;

    createOL(props: RDragBoxProps): DragBox {
        this.classProps = RDragBox.classProps;
        return new DragBox(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
