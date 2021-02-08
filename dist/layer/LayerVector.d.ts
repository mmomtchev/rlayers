import React from 'react';
import { Map as OLMap, Feature as OLFeature, MapBrowserEvent } from 'ol';
import { VectorSourceEvent } from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import { Vector as OLLayerVector } from 'ol/layer';
import { Vector as OLSourceVector } from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import { StyleLike } from 'ol/style/Style';
import { Layer, LayerProps } from '..';
export interface LayerVectorProps extends LayerProps {
    url?: string;
    renderBuffer?: number;
    features?: OLFeature[];
    format?: FeatureFormat;
    style?: StyleLike;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onAddFeature?: (e: VectorSourceEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
    onPostRender?: (e: RenderEvent) => boolean | void;
    onPreRender?: (e: RenderEvent) => boolean | void;
}
export interface VectorContextType {
    map: OLMap;
    layer: OLLayerVector;
}
export declare const VectorContext: React.Context<any>;
declare class LayerVector extends Layer<LayerVectorProps> {
    ol: OLLayerVector;
    source: OLSourceVector;
    context: OLMap;
    constructor(props: Readonly<LayerVectorProps>, context: React.Context<OLMap>);
    onchange: () => void;
    eventRelay: (e: MapBrowserEvent) => boolean;
    refresh(prevProps?: LayerVectorProps): void;
    render(): JSX.Element;
}
export default LayerVector;
//# sourceMappingURL=LayerVector.d.ts.map