import React from 'react';
import { Map as OLMap } from 'ol';
import { OverviewMap as OLOverviewMap } from 'ol/control';
import { Options } from 'ol/control/OverviewMap';
import { default as ControlBase, ControlProps } from './ControlBase';
import Layer from '../layer/Layer';
export interface OverviewProps extends ControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
    collapseLabel?: string;
    label?: string;
    layer?: Layer<unknown>;
    width?: number;
    height?: number;
}
export default class OverviewMap extends ControlBase<OverviewProps, null> {
    ol: OLOverviewMap;
    layer?: Layer<unknown>;
    constructor(props: Readonly<OverviewProps>, context: React.Context<OLMap>);
    toOLProps(props: OverviewProps): Options;
    render(): JSX.Element;
}
//# sourceMappingURL=OverviewMap.d.ts.map