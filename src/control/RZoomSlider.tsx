import React from 'react';
import {Map} from 'ol';
import {ZoomSlider} from 'ol/control';
import {Options} from 'ol/control/ZoomSlider';

import {RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor RZoomSlider
 */
export interface RZoomSliderProps extends RControlProps {
    /** Animation duration
     * @default 200 */
    duration?: number;
}

/**
 * ZoomSlider control
 *
 * Requires an `RMap` context
 */
export default class RZoomSlider extends RControlBase<RZoomSliderProps, Record<string, never>> {
    ol: ZoomSlider;

    constructor(props: Readonly<RZoomSliderProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new ZoomSlider(this.toOLProps(props));
    }

    toOLProps(props: RZoomSliderProps): Options {
        return {
            ...super.toOLProps(props),
            duration: props.duration
        };
    }
}
