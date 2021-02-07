import React from 'react';
import { Map as OLMap } from 'ol';
import { Control as OLControl } from 'ol/control';
import { default as ControlBase, ControlProps } from './ControlBase';
export default class Custom extends ControlBase<ControlProps, null> {
    ol: OLControl;
    targetRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<ControlProps>, context: React.Context<OLMap>);
    componentDidMount(): void;
    toOLProps(props: ControlProps): Record<string, unknown>;
    render(): JSX.Element;
}
//# sourceMappingURL=Custom.d.ts.map