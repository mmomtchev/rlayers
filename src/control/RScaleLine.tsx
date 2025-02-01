import React from 'react';
import {ScaleLine} from 'ol/control';
import {Options, Units} from 'ol/control/ScaleLine';

import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor RScaleLine
 */
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
export default class RScaleLine extends RControlBase<RScaleLineProps, Record<string, never>> {
    ol: ScaleLine;

    constructor(props: Readonly<RScaleLineProps>) {
        super(props);
        this.ol = new ScaleLine(this.toOLProps(props));
    }

    toOLProps(props: RScaleLineProps): Options {
        return {
            ...super.toOLProps(props),
            minWidth: props.minWidth,
            bar: props.bar,
            text: props.text,
            units: props.units ?? 'metric'
        };
    }
}
