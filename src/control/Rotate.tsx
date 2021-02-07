import React from 'react';
import {Map as OLMap} from 'ol';
import {Rotate as OLRotate} from 'ol/control';
import {Options} from 'ol/control/Rotate';

import {default as ControlBase, ControlProps} from './ControlBase';

export interface RotateProps extends ControlProps {
    label?: string;
    autoHide?: boolean;
}

export default class Rotate extends ControlBase<RotateProps, null> {
    ol: OLRotate;

    constructor(props: Readonly<RotateProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLRotate(this.toOLProps(props));
    }

    toOLProps(props: RotateProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            label: props.label,
            autoHide: props.autoHide
        };
    }
}
