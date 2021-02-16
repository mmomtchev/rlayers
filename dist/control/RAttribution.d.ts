import React from 'react';
import { Attribution } from 'ol/control';
import { Options } from 'ol/control/Attribution';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RAttributionProps extends RControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
}
export default class RAtrribution extends RControlBase<RAttributionProps, null> {
    ol: Attribution;
    constructor(props: Readonly<RAttributionProps>, context: React.Context<RContextType>);
    toOLProps(props: RAttributionProps): Options;
}
//# sourceMappingURL=RAttribution.d.ts.map