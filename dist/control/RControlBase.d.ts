import React from 'react';
import { Control as Control } from 'ol/control';
import { Options } from 'ol/control/Control';
import { RContextType } from '../context';
import { RlayersBase } from '../REvent';
export interface RControlProps {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}
export default class RControlBase<P extends RControlProps, S> extends RlayersBase<P, S> {
    ol: Control;
    constructor(props: Readonly<P>, context: React.Context<RContextType>);
    toOLProps(props: P): Options;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RControlBase.d.ts.map