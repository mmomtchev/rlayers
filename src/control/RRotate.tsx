import React from 'react';
import {Map as Map} from 'ol';
import {Rotate as OLRRotate} from 'ol/control';
import {Options} from 'ol/control/Rotate';

import {default as RControlBase, RControlProps} from './RControlBase';

export interface RRotateProps extends RControlProps {
    /** Label */
    label?: string;
    /** automatically hide the control when the orientation is straight north */
    autoHide?: boolean;
}

/** A rotate control for mobile devices */
export default class RRotate extends RControlBase<RRotateProps, null> {
    ol: OLRRotate;

    constructor(props: Readonly<RRotateProps>, context: React.Context<Map>) {
        super(props, context);
        this.ol = new OLRRotate(this.toOLProps(props));
    }

    toOLProps(props: RRotateProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            label: props.label,
            autoHide: props.autoHide
        };
    }
}
