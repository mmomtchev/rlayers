import React from 'react';
import {Map} from 'ol';
import {Zoom} from 'ol/control';
import {Options} from 'ol/control/Zoom';

import {RContextType} from '../context';
import RControlBase, {RControlProps} from './RControlBase';

export interface RZoomProps extends RControlProps {
    /** Animation duration */
    duration?: number;
    /** Zoom in label instead of + */
    zoomInLabel?: string;
    /** Zoom out label instead of - */
    zoomOutLabel?: string;
    /** Zoom in tip */
    zoomInTipLabel?: string;
    /** Zoom out tip */
    zoomOutTipLabel?: string;
    /** Amount to zoom at each step */
    delta?: number;
}

/**
 * Zoom control
 *
 * Requires an `RMap` context
 */
export default class RZoom extends RControlBase<RZoomProps, null> {
    ol: Zoom;

    constructor(props: Readonly<RZoomProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new Zoom(this.toOLProps(props));
    }

    toOLProps(props: RZoomProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            duration: props.duration,
            zoomInLabel: props.zoomInLabel,
            zoomOutLabel: props.zoomOutLabel,
            zoomInTipLabel: props.zoomInTipLabel,
            zoomOutTipLabel: props.zoomOutTipLabel,
            delta: props.delta
        };
    }
}
