import React from 'react';
import {Map as OLMap} from 'ol';
import {ScaleLine as OLScaleLine} from 'ol/control';
import {Options, Units} from 'ol/control/ScaleLine';

import {default as ControlBase, ControlProps} from './ControlBase';

export interface ScaleLineProps extends ControlProps {
    minWidth?: number;
    bar?: boolean;
    text?: boolean;
    units?: Units;
}

export default class ScaleLine extends ControlBase<ScaleLineProps, null> {
    ol: OLScaleLine;

    constructor(props: Readonly<ScaleLineProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLScaleLine(this.toOLProps(props));
    }

    toOLProps(props: ScaleLineProps): Options {
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
