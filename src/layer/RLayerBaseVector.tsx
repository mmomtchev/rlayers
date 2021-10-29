import React from 'react';
import {Map, Feature, MapBrowserEvent} from 'ol';
import {VectorSourceEvent} from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import BaseVector from 'ol/layer/BaseVector';
import {Vector as SourceVector} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import {FeatureLoader} from 'ol/featureloader';

import {RContext, RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature} from '../RFeature';
import {default as RStyle, RStyleLike} from '../style/RStyle';

import debug from '../debug';
import Geometry from 'ol/geom/Geometry';
export interface RLayerBaseVectorProps extends RLayerProps {
    /** URL for loading features, requires `format` */
    url?: string;
    /** Width of the frame around the viewport that shall be rendered too
     * so that the symbols, whose center is outside of the viewport,
     * but are partially inside, can be rendered */
    renderBuffer?: number;
    /** OpenLayers features that will be loaded
     *
     * this property currently does not support dynamic updates
     */
    features?: Feature<Geometry>[];
    /** Format of the features when `url` is used
     *
     * this property currently does not support dynamic updates
     */
    format?: FeatureFormat;
    /** Use a custom loader instead of XHR */
    loader?: FeatureLoader;
    /** OpenLayers default style for features without `style` */
    style?: RStyleLike;
    /** Default onClick handler for loaded features */
    onClick?: (e: MapBrowserEvent<UIEvent>) => boolean | void;
    /** Called when a feature is added, not called for features
     * already present at creation, ie loaded via `features` or `url`
     *
     * use onFeaturesLoadEnd for features loaded via `url`
     */
    onAddFeature?: (e: VectorSourceEvent<Geometry>) => boolean | void;
    /** Called when the external features have been loaded from `url`
     *
     * e.features will contain the features which still
     * won't be loaded into the layer
     */
    onFeaturesLoadEnd?: (e: VectorSourceEvent<Geometry>) => boolean | void;
    /** Default onPointerMove handler for loaded features */
    onPointerMove?: (e: MapBrowserEvent<UIEvent>) => boolean | void;
    /** Default onPointerEnter handler for loaded features */
    onPointerEnter?: (e: MapBrowserEvent<UIEvent>) => boolean | void;
    /** Default onPointerLeave handler for loaded features */
    onPointerLeave?: (e: MapBrowserEvent<UIEvent>) => boolean | void;
    onPostRender?: (e: RenderEvent) => boolean | void;
    onPreRender?: (e: RenderEvent) => boolean | void;
}

export default class RLayerBaseVector<P extends RLayerBaseVectorProps> extends RLayer<P> {
    ol: BaseVector<SourceVector<Geometry>>;
    source: SourceVector<Geometry>;
    static relayedEvents = {
        click: 'Click',
        pointermove: 'PointerMove',
        pointerenter: 'PointerEnter',
        pointerleave: 'PointerLeave'
    };

    constructor(props: Readonly<P>, context: React.Context<RContextType>) {
        super(props, context);
        RFeature.initEventRelay(this.context.map);
    }

    newFeature = (e: VectorSourceEvent<Geometry>): void => {
        if (e.feature) this.attachFeatureHandlers([e.feature]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e as any).features) this.attachFeatureHandlers((e as any).features);
    };

    attachFeatureHandlers(features: Feature<Geometry>[], prevProps?: P): void {
        for (const ev of Object.values(RLayerBaseVector.relayedEvents))
            if (this.props['on' + ev] !== (prevProps && prevProps['on' + ev]))
                for (const f of features) f.on(ev.toLowerCase() as 'change', this.eventRelay);
    }

    eventRelay = (e: MapBrowserEvent<UIEvent>): boolean => {
        if (this.props['on' + RLayerBaseVector.relayedEvents[e.type]])
            return (
                this.props['on' + RLayerBaseVector.relayedEvents[e.type]].call(this, e) !== false
            );
        return true;
    };

    componentWillUnmount(): void {
        super.componentWillUnmount();
        for (const ev of Object.values(RLayerBaseVector.relayedEvents))
            this.source.forEachFeature((f) => {
                f.un(ev.toLowerCase() as 'change', this.eventRelay);
                return false;
            });
    }

    refresh(prevProps?: P): void {
        super.refresh(prevProps);
        this.attachFeatureHandlers(this.source.getFeatures(), prevProps);
        if (prevProps?.style !== this.props.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
    }

    render(): JSX.Element {
        return (
            <RContext.Provider
                value={
                    {
                        ...this.context,
                        layer: this.ol,
                        source: this.source,
                        vectorlayer: this.ol,
                        vectorsource: this.source
                    } as RContextType
                }
            >
                {this.props.children}
            </RContext.Provider>
        );
    }
}
