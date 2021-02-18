import React from 'react';
import {Map} from 'ol';
import {ZoomSlider} from 'ol/control';
import {Options} from 'ol/control/ZoomSlider';

import {RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

export interface RZoomSliderProps extends RControlProps {
    /** Animation duration @default 200 */
    duration?: number;
}

/** ZoomSlider control */
export default class RZoomSlider extends RControlBase<RZoomSliderProps, null> {
    ol: ZoomSlider;

    constructor(props: Readonly<RZoomSliderProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new ZoomSlider(this.toOLProps(props));
    }

    toOLProps(props: RZoomSliderProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            duration: props.duration
        };
    }
}
