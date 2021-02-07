import React from 'react';
import {Map as OLMap, Feature as OLFeature, MapBrowserEvent} from 'ol';
import {Vector as OLLayerVector} from 'ol/layer';
import {Vector as OLSourceVector} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import {StyleLike} from 'ol/style/Style';

import {Map, Layer, LayerProps, Feature} from '..';
import debug from '../debug';

export interface LayerVectorProps extends LayerProps {
    url?: string;
    renderBuffer?: number;
    features?: OLFeature[];
    format?: FeatureFormat;
    style?: StyleLike;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
}

export interface VectorContextType {
    map: OLMap;
    layer: OLLayerVector;
}

export const VectorContext = React.createContext(null);

class LayerVector extends Layer<LayerVectorProps> {
    ol: OLLayerVector;
    source: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<LayerVectorProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.source = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new OLLayerVector({style: this.props.style, source: this.source});
        Feature.initEventRelay(this.context);
        this.ol.on('change', this.onchange);
    }

    onchange = (): void => this.refresh();

    eventRelay = (e: MapBrowserEvent): boolean => {
        if (e.type === 'click' && this.props.onClick) return this.props.onClick(e) !== false;
        if (e.type === 'pointermove' && this.props.onPointerMove)
            return this.props.onPointerMove(e) !== false;
        if (e.type === 'pointerenter' && this.props.onPointerEnter)
            return this.props.onPointerEnter(e) !== false;
        if (e.type === 'pointerleave' && this.props.onPointerLeave)
            return this.props.onPointerLeave(e) !== false;
        return true;
    };

    refresh(): void {
        super.refresh();
        if (this.props.onClick)
            this.source.forEachFeature((f) => f.on('click', this.eventRelay) && false);
        if (this.props.onPointerMove)
            this.source.forEachFeature((f) => f.on('pointermove', this.eventRelay) && false);
        if (this.props.onPointerEnter)
            this.source.forEachFeature((f) => f.on('pointerenter', this.eventRelay) && false);
        if (this.props.onPointerLeave)
            this.source.forEachFeature((f) => f.on('pointerleave', this.eventRelay) && false);
    }

    render(): JSX.Element {
        return (
            <VectorContext.Provider
                value={{map: this.context, layer: this.ol} as VectorContextType}
            >
                {this.props.children}
            </VectorContext.Provider>
        );
    }
}

export default LayerVector;
