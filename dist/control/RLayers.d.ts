import React from 'react';
import { Control } from 'ol/control';
import './layers.css';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface LayersProps extends RControlProps {
    element?: React.ReactElement;
}
export interface LayersState {
    collapsed: boolean;
    visible: boolean[];
}
export default class RLayers extends RControlBase<LayersProps, LayersState> {
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<LayersProps>, context: React.Context<RContextType>);
    onchange: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    toOLProps(props: LayersProps): Record<string, unknown>;
    clickCollapse: () => void;
    render(): JSX.Element;
}
//# sourceMappingURL=RLayers.d.ts.map