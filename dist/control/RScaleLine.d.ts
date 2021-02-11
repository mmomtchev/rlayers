import React from 'react';
import { Map as Map } from 'ol';
import { ScaleLine } from 'ol/control';
import { Options, Units } from 'ol/control/ScaleLine';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RScaleLineProps extends RControlProps {
    minWidth?: number;
    bar?: boolean;
    text?: boolean;
    units?: Units;
}
export default class RScaleLine extends RControlBase<RScaleLineProps, null> {
    ol: ScaleLine;
    constructor(props: Readonly<RScaleLineProps>, context: React.Context<Map>);
    toOLProps(props: RScaleLineProps): Options;
}
//# sourceMappingURL=RScaleLine.d.ts.map