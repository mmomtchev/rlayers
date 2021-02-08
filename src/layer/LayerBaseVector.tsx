import React from 'react';
import {Map as OLMap, Feature as OLFeature, MapBrowserEvent} from 'ol';
import {VectorSourceEvent} from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import {default as OLLayerBaseVector} from 'ol/layer/BaseVector';
import {Vector as OLSourceVector} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import {StyleLike} from 'ol/style/Style';

import {Map, Layer, LayerProps, Feature} from '..';
import debug from '../debug';

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

export const VectorContext = React.createContext(null);

class LayerBaseVector<P extends LayerBaseVectorProps> extends Layer<P> {
    ol: OLLayerBaseVector;
    source: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<P>, context: React.Context<OLMap>) {
        super(props, context);
        Feature.initEventRelay(this.context);
    }

    onchange = (prevProps?: P): void => {
        for (const ev of ['Click', 'PointerMove', 'PointerEnter', 'PointerLeave'])
            if (!prevProps || this.props['On' + ev] !== prevProps['On' + ev])
                this.source.forEachFeature((f) => f.on(ev.toLowerCase(), this.eventRelay) && false);
    };

    eventRelay = (e: MapBrowserEvent): boolean => {
        for (const ev of ['Click', 'PointerMove', 'PointerEnter', 'PointerLeave'])
            if (e.type === ev.toLowerCase() && this.props['On' + ev])
                return this.props['On' + ev](e) !== false;
        return true;
    };

    refresh(prevProps?: P): void {
        super.refresh();
        this.onchange(prevProps);
        if (!prevProps || prevProps.style !== this.props.style) this.ol.setStyle(this.props.style);
    }

    render(): JSX.Element {
        return (
            <VectorContext.Provider
                value={
                    {map: this.context, layer: this.ol, source: this.source} as VectorContextType
                }
            >
                {this.props.children}
            </VectorContext.Provider>
        );
    }
}

export default LayerBaseVector;
