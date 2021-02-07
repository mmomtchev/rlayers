import React from 'react';
import { Map as OLMap } from 'ol';
import { Layer as OLLayer } from 'ol/layer';
import { Source as OLSource } from 'ol/source';
import { ReactLayersBase } from '../Event';
export interface LayerProps {
    visible?: boolean;
    opacity?: number;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    attributions?: string;
    properties?: Record<string, unknown>;
}
export default class Layer<P extends LayerProps> extends ReactLayersBase<P, null> {
    static contextType: React.Context<any>;
    ol: OLLayer;
    source: OLSource;
    constructor(props: Readonly<P>, context: React.Context<OLMap>);
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
export declare const LayerContext: React.Context<any>;
//# sourceMappingURL=Layer.d.ts.map