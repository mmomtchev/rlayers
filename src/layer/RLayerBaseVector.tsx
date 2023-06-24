import React from 'react';
import {Feature, MapBrowserEvent} from 'ol';
import {LoadingStrategy, VectorSourceEvent} from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import BaseVector from 'ol/layer/BaseVector';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import CanvasVectorImageLayerRenderer from 'ol/renderer/canvas/VectorImageLayer';
import WebGLPointsLayerRenderer from 'ol/renderer/webgl/PointsLayer';
import {Vector as SourceVector} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import {FeatureLoader, FeatureUrlFunction} from 'ol/featureloader';
import Geometry from 'ol/geom/Geometry';
import BaseObject from 'ol/Object';

import {RContext, RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import {default as RStyle, RStyleLike} from '../style/RStyle';
import {OLEvent, RlayersBase} from '../REvent';

import debug from '../debug';

export const featureHandlersSymbol = '_rlayers_feature_handlers';
export type FeatureHandlers = Record<OLEvent, number>;

/**
 * @propsfor RLayerBaseVector
 */
export interface RLayerBaseVectorProps extends RLayerProps {
    /** URL for loading features can be a function of type `FeatureUrlFunction`, requires `format` */
    url?: string | FeatureUrlFunction;
    /**
     * Width of the frame around the viewport that shall be rendered too
     * so that the symbols, whose center is outside of the viewport,
     * but are partially inside, can be rendered
     *
     * this property currently does not support dynamic updates
     */
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
    /**  OpenLayers option to specify LoadingStrategy default is `all` strategy */
    strategy?: LoadingStrategy;
    /**
     * Wrap features around the antimeridian. Cannot be dynamically updated once the layer is created.
     * @default false
     */
    wrapX?: boolean;
    /** Default onClick handler for loaded features */
    onClick?: (this: RLayerBaseVector<RLayerBaseVectorProps>, e: RFeatureUIEvent) => boolean | void;
    /** Called when a feature is added, not called for features
     * already present at creation, ie loaded via `features` or `url`
     *
     * use onFeaturesLoadEnd for features loaded via `url`
     */
    onAddFeature?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: VectorSourceEvent<Geometry>
    ) => boolean | void;
    /**
     * Called upon initiating the request for new features
     */
    onFeaturesLoadStart?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: VectorSourceEvent<Geometry>
    ) => boolean | void;
    /**
     * Called when the external features have been loaded from `url`
     *
     * e.features will contain the new features
     *
     * This callback is invoked before the features are loaded
     */
    onFeaturesLoadEnd?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: VectorSourceEvent<Geometry>
    ) => boolean | void;
    /**
     * Called on failure while loading features
     */
    onFeaturesLoadError?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: VectorSourceEvent<Geometry>
    ) => boolean | void;
    /** onPointerMove handler for all loaded features */
    onPointerMove?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: RFeatureUIEvent
    ) => boolean | void;
    /** onPointerEnter handler for all loaded features */
    onPointerEnter?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: RFeatureUIEvent
    ) => boolean | void;
    /** onPointerLeave handler for all loaded features */
    onPointerLeave?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: RFeatureUIEvent
    ) => boolean | void;
    onPostRender?: (
        this: RLayerBaseVector<RLayerBaseVectorProps>,
        e: RenderEvent
    ) => boolean | void;
    onPreRender?: (this: RLayerBaseVector<RLayerBaseVectorProps>, e: RenderEvent) => boolean | void;
}

/**
 * An abstract class used for grouping code common to all Vector layers
 *
 * Meant to be extended
 */
export default class RLayerBaseVector<P extends RLayerBaseVectorProps> extends RLayer<P> {
    ol: BaseVector<
        SourceVector<Geometry>,
        | CanvasVectorLayerRenderer
        | CanvasVectorTileLayerRenderer
        | CanvasVectorImageLayerRenderer
        | WebGLPointsLayerRenderer
    >;
    source: SourceVector<Geometry>;

    constructor(props: Readonly<P>, context: React.Context<RContextType>) {
        super(props, context);
        RFeature.initEventRelay(this.context.map);
        this.eventSources = this.createSource(props);
        this.attachEventHandlers();
    }

    createSource(props: Readonly<P>): BaseObject[] {
        throw new Error('RLayerBaseVector is an abstract class');
    }

    refresh(prevProps?: P): void {
        super.refresh(prevProps);
        if (prevProps?.style !== this.props.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
    }

    incrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.ol
        );
        featureHandlers[ev] = (featureHandlers[ev] ?? 0) + 1;
    }
    decrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.ol
        );
        featureHandlers[ev]--;
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RLayerVector'>
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
            </div>
        );
    }
}
