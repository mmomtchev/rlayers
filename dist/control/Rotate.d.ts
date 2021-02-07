import React from 'react';
import { Map as OLMap } from 'ol';
import { Rotate as OLRotate } from 'ol/control';
import { Options } from 'ol/control/Rotate';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface RotateProps extends ControlProps {
    label?: string;
    autoHide?: boolean;
}
export default class Rotate extends ControlBase<RotateProps, null> {
    ol: OLRotate;
    constructor(props: Readonly<RotateProps>, context: React.Context<OLMap>);
    toOLProps(props: RotateProps): Options;
}
//# sourceMappingURL=Rotate.d.ts.map