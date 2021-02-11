import React from 'react';
import { Map } from 'ol';
import { Control } from 'ol/control';
import './layers.css';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface LayersProps extends RControlProps {
    element?: React.ReactElement;
}
export interface LayersState {
    collapsed: boolean;
    visible: boolean[];
}
export default class RLayers extends RControlBase<LayersProps, LayersState> {
    static contextType: React.Context<any>;
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;
    context: Map;
    constructor(props: Readonly<LayersProps>, context: React.Context<Map>);
    onchange: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    toOLProps(props: LayersProps): Record<string, unknown>;
    clickCollapse: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=RLayers.d.ts.map