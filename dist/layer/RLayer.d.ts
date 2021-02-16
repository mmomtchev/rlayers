import React from 'react';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { RContextType } from '../context';
import { RlayersBase } from '../REvent';
export interface RLayerProps {
    visible?: boolean;
    opacity?: number;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    attributions?: string;
    properties?: Record<string, unknown>;
    projection?: string;
}
export default class RLayer<P extends RLayerProps> extends RlayersBase<P, null> {
    ol: Layer;
    source: Source;
    constructor(props: Readonly<P>, context: React.Context<RContextType>);
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RLayer.d.ts.map