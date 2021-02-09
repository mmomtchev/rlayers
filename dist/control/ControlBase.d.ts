import React from 'react';
import { Map as OLMap } from 'ol';
import { Control as OLControl } from 'ol/control';
import { Options } from 'ol/control/Control';
import { ReactLayersBase } from '../Event';
export interface ControlProps {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}
export default class ControlBase<P extends ControlProps, S> extends ReactLayersBase<P, S> {
    static contextType: React.Context<any>;
    ol: OLControl;
    context: OLMap;
    constructor(props: Readonly<P>, context: React.Context<OLMap>);
    toOLProps(props: P): Options;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=ControlBase.d.ts.map