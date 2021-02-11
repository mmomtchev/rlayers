import React from 'react';
import { Map as Map } from 'ol';
import { Attribution } from 'ol/control';
import { Options } from 'ol/control/Attribution';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RAttributionProps extends RControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
}
export default class RAtrribution extends RControlBase<RAttributionProps, null> {
    ol: Attribution;
    constructor(props: Readonly<RAttributionProps>, context: React.Context<Map>);
    toOLProps(props: RAttributionProps): Options;
}
//# sourceMappingURL=RAttribution.d.ts.map