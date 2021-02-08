import React from 'react';
import { Map as OLMap, Feature as OLFeature, MapBrowserEvent } from 'ol';
import { VectorSourceEvent } from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import { default as OLLayerBaseVector } from 'ol/layer/BaseVector';
import { Vector as OLSourceVector } from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import { StyleLike } from 'ol/style/Style';
import { Layer, LayerProps } from '..';
export interface LayerBaseVectorProps extends LayerProps {
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
    layer: OLLayerBaseVector;
    source: OLSourceVector;
}
export declare const VectorContext: React.Context<any>;
declare class LayerBaseVector<P extends LayerBaseVectorProps> extends Layer<P> {
    ol: OLLayerBaseVector;
    source: OLSourceVector;
    context: OLMap;
    constructor(props: Readonly<P>, context: React.Context<OLMap>);
    onchange: () => void;
    attachFeatureHandlers(prevProps?: P): void;
    eventRelay: (e: MapBrowserEvent) => boolean;
    refresh(prevProps?: P): void;
    render(): JSX.Element;
}
export default LayerBaseVector;
//# sourceMappingURL=LayerBaseVector.d.ts.map