import React from 'react';
import { Rotate as OLRRotate } from 'ol/control';
import { Options } from 'ol/control/Rotate';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RRotateProps extends RControlProps {
    label?: string;
    autoHide?: boolean;
}
export default class RRotate extends RControlBase<RRotateProps, null> {
    ol: OLRRotate;
    constructor(props: Readonly<RRotateProps>, context: React.Context<RContextType>);
    toOLProps(props: RRotateProps): Options;
}
//# sourceMappingURL=RRotate.d.ts.map