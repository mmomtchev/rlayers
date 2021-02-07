import React from 'react';
import {Map as OLMap} from 'ol';
import {Zoom as OLZoom} from 'ol/control';
import {Options} from 'ol/control/Zoom';

import {default as ControlBase, ControlProps} from './ControlBase';

export interface ZoomProps extends ControlProps {
    duration?: number;
    zoomInLabel?: string;
    zoomOutLabel?: string;
    zoomInTipLabel?: string;
    zoomOutTipLabel?: string;
    delta?: number;
}

export default class Zoom extends ControlBase<ZoomProps, null> {
    ol: OLZoom;

    constructor(props: Readonly<ZoomProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLZoom(this.toOLProps(props));
    }

    toOLProps(props: ZoomProps): Options {
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
