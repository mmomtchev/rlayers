import React from 'react';
import { OverviewMap } from 'ol/control';
import { Options } from 'ol/control/OverviewMap';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface OverviewProps extends RControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
    collapseLabel?: string;
    label?: string;
    width?: number;
    height?: number;
}
export default class ROverviewMap extends RControlBase<OverviewProps, null> {
    ol: OverviewMap;
    constructor(props: Readonly<OverviewProps>, context: React.Context<RContextType>);
    toOLProps(props: OverviewProps): Options;
    render(): JSX.Element;
}
//# sourceMappingURL=ROverviewMap.d.ts.map