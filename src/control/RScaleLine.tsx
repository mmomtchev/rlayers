import React from 'react';
import {ScaleLine} from 'ol/control';
import {Options, Units} from 'ol/control/ScaleLine';

import {RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

export interface RScaleLineProps extends RControlProps {
    /** Minimum width */
    minWidth?: number;
    /** Use bars instead of a line */
    bar?: boolean;
    /** Label */
    text?: boolean;
    /** Units for the scale line: 'degrees', 'imperial', 'nautical', 'metric', 'us'
     * @default 'metric' */
    units?: Units;
}

/**
 * Scaleline control
 *
 * Requires an `RMap` context
 */
export default class RScaleLine extends RControlBase<RScaleLineProps, null> {
    ol: ScaleLine;

    constructor(props: Readonly<RScaleLineProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new ScaleLine(this.toOLProps(props));
    }

    toOLProps(props: RScaleLineProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            minWidth: props.minWidth,
            bar: props.bar,
            text: props.text,
            units: props.units ?? 'metric'
        };
    }
}
