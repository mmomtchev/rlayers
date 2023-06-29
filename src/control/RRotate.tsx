import React from 'react';
import {Rotate as OLRRotate} from 'ol/control';
import {Options} from 'ol/control/Rotate';

import {RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor RRotate
 */
export interface RRotateProps extends RControlProps {
    /** Label */
    label?: string;
    /** automatically hide the control when the orientation is straight north */
    autoHide?: boolean;
}

/**
 * A rotation control for mobile devices
 *
 * Requires an `RMap` context
 */
export default class RRotate extends RControlBase<RRotateProps, Record<string, never>> {
    ol: OLRRotate;

    constructor(props: Readonly<RRotateProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.ol = new OLRRotate(this.toOLProps(props));
    }

    toOLProps(props: RRotateProps): Options {
        return {
            ...super.toOLProps(props),
            label: props.label,
            autoHide: props.autoHide
        };
    }
}
