import React from 'react';
import { Map as OLMap } from 'ol';
import { ScaleLine as OLScaleLine } from 'ol/control';
import { Options, Units } from 'ol/control/ScaleLine';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface ScaleLineProps extends ControlProps {
    minWidth?: number;
    bar?: boolean;
    text?: boolean;
    units?: Units;
}
export default class ScaleLine extends ControlBase<ScaleLineProps, null> {
    ol: OLScaleLine;
    constructor(props: Readonly<ScaleLineProps>, context: React.Context<OLMap>);
    toOLProps(props: ScaleLineProps): Options;
}
//# sourceMappingURL=ScaleLine.d.ts.map