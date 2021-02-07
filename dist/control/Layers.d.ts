import React from 'react';
import { Map as OLMap } from 'ol';
import { Control as OLControl } from 'ol/control';
import './layers.css';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface LayersProps extends ControlProps {
    element?: React.ReactElement;
}
export interface LayersState {
    collapsed: boolean;
    visible: boolean[];
}
export default class Layers extends ControlBase<LayersProps, LayersState> {
    static contextType: React.Context<any>;
    ol: OLControl;
    targetRef: React.RefObject<HTMLDivElement>;
    context: OLMap;
    constructor(props: Readonly<LayersProps>, context: React.Context<OLMap>);
    componentDidMount(): void;
    toOLProps(props: LayersProps): Record<string, unknown>;
    clickCollapse: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=Layers.d.ts.map