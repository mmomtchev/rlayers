import React from 'react';
import {Map} from 'ol';
import {Zoom} from 'ol/control';
import {Options} from 'ol/control/Zoom';

import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor RZoom
 */
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
export default class RZoom extends RControlBase<RZoomProps, Record<string, never>> {
    ol: Zoom;

    constructor(props: Readonly<RZoomProps>) {
        super(props);
        this.ol = new Zoom(this.toOLProps(props));
    }

    toOLProps(props: RZoomProps): Options {
        return {
            ...super.toOLProps(props),
            duration: props.duration,
            zoomInLabel: props.zoomInLabel,
            zoomOutLabel: props.zoomOutLabel,
            zoomInTipLabel: props.zoomInTipLabel,
            zoomOutTipLabel: props.zoomOutTipLabel,
            delta: props.delta
        };
    }
}
