import React from 'react';
import { Map as Map } from 'ol';
import { Control as Control } from 'ol/control';
import { Options } from 'ol/control/Control';
import { ReactLayersBase } from '../REvent';
export interface RControlProps {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}
export default class RControlBase<P extends RControlProps, S> extends ReactLayersBase<P, S> {
    static contextType: React.Context<any>;
    ol: Control;
    context: Map;
    constructor(props: Readonly<P>, context: React.Context<Map>);
    toOLProps(props: P): Options;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RControlBase.d.ts.map