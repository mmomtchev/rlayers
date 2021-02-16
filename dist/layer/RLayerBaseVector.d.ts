import React from 'react';
import { Feature, MapBrowserEvent } from 'ol';
import { VectorSourceEvent } from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import BaseVector from 'ol/layer/BaseVector';
import { Vector as SourceVector } from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import { RContextType } from '../context';
import { default as RLayer, RLayerProps } from './RLayer';
import { RStyleLike } from '../style/RStyle';
export interface RLayerBaseVectorProps extends RLayerProps {
    url?: string;
    renderBuffer?: number;
    features?: Feature[];
    format?: FeatureFormat;
    style?: RStyleLike;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onAddFeature?: (e: VectorSourceEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
    onPostRender?: (e: RenderEvent) => boolean | void;
    onPreRender?: (e: RenderEvent) => boolean | void;
}
export default class RLayerBaseVector<P extends RLayerBaseVectorProps> extends RLayer<P> {
    ol: BaseVector;
    source: SourceVector;
    static relayedEvents: {
        click: string;
        pointermove: string;
        pointerenter: string;
        pointerleave: string;
    };
    constructor(props: Readonly<P>, context: React.Context<RContextType>);
    newFeature: (e: VectorSourceEvent) => void;
    attachFeatureHandlers(features: Feature[], prevProps?: P): void;
    eventRelay: (e: MapBrowserEvent) => boolean;
    componentWillUnmount(): void;
    refresh(prevProps?: P): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RLayerBaseVector.d.ts.map