import React from 'react';
import {MapBrowserEvent} from 'ol';
import {Pixel} from 'ol/pixel';
import {default as DragBox, DragBoxEvent} from 'ol/interaction/DragBox';

import {default as RPointer} from './RPointer';
import debug from '../debug';

/**
 * @propsfor RDragBox
 */
export interface RDragBoxProps {
    /** A CSS class to be used for the box */
    className?: string;
    /** An optional OpenLayers condition */
    condition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /** Minimum area that needs to be selected */
    minArea?: number;
    /** An optional OpenLayers condition */
    boxEndCondition?: (
        this: RDragBox,
        e: MapBrowserEvent<UIEvent>,
        p1: Pixel,
        p2: Pixel
    ) => boolean;
    /** Called when the user starts dragging */
    onBoxStart?: (this: RDragBox, e: DragBoxEvent) => void;
    /** Called on selection
     * (note that this is the OpenLayers event, not the constructor property) */
    onBoxEnd?: (this: RDragBox, e: DragBoxEvent) => void;
}

/** A dragbox, can be used for selecting features, see `RDragZoom` for zooming */
export default class RDragBox extends RPointer<RDragBoxProps> {
    protected static classProps = ['className', 'condition', 'minArea', 'boxEndCondition'];
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
