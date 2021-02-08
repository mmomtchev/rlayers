import React from 'react';
import {Map as OLMap, Feature as OLFeature, MapBrowserEvent} from 'ol';
import {VectorSourceEvent} from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
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
        this.eventSources = [this.ol, this.source];
        Feature.initEventRelay(this.context);
        this.ol.on('change', this.onchange);
        this.refresh();
    }

    onchange = (): void => this.refresh();

    eventRelay = (e: MapBrowserEvent): boolean => {
        for (const ev of ['Click', 'PointerMove', 'PointerEnter', 'PointerLeave'])
            if (e.type === ev.toLowerCase() && this.props['On' + ev])
                return this.props['On' + ev](e) !== false;
        return true;
    };

    refresh(prevProps?: LayerVectorProps): void {
        super.refresh();
        for (const ev of ['Click', 'PointerMove', 'PointerEnter', 'PointerLeave'])
            if (!prevProps || this.props['On' + ev] !== prevProps['On' + ev])
                this.source.forEachFeature((f) => f.on(ev.toLowerCase(), this.eventRelay) && false);
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
