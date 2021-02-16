import React from 'react';
import { Control as Control } from 'ol/control';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export default class Custom extends RControlBase<RControlProps, null> {
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<RControlProps>, context: React.Context<RContextType>);
    componentDidMount(): void;
    toOLProps(props: RControlProps): Record<string, unknown>;
    render(): JSX.Element;
}
//# sourceMappingURL=RCustom.d.ts.map