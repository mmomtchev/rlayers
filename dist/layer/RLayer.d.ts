import React from 'react';
import { Map } from 'ol';
import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { ReactLayersBase } from '../REvent';
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
export default class RLayer<P extends RLayerProps> extends ReactLayersBase<P, null> {
    static contextType: React.Context<any>;
    ol: Layer;
    source: Source;
    constructor(props: Readonly<P>, context: React.Context<Map>);
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RLayer.d.ts.map