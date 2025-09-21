import React, {JSX} from 'react';
import {LoadingStrategy, VectorSourceEvent} from 'ol/source/Vector';
import RenderEvent from 'ol/render/Event';
import BaseVector from 'ol/layer/BaseVector';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import CanvasVectorImageLayerRenderer from 'ol/renderer/canvas/VectorImageLayer';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer';
import {Vector as SourceVector} from 'ol/source';
import FeatureFormat from 'ol/format/Feature';
import {FeatureLoader, FeatureUrlFunction} from 'ol/featureloader';
import BaseObject from 'ol/Object';
import {FeatureLike} from 'ol/Feature';
import {FlatStyleLike} from 'ol/style/flat';

import {RContext, RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {default as RFeature, RFeatureUIEvent} from '../RFeature';
import {isOLFlatStyle, default as RStyle, RStyleLike} from '../style/RStyle';
import {OLEvent, RlayersBase} from '../REvent';

import debug from '../debug';

export const featureHandlersSymbol = '_rlayers_feature_handlers';
export type FeatureHandlers = Record<OLEvent, number>;

/**
 * @propsfor RLayerBaseVector
 */
export interface RLayerBaseVectorProps<F extends FeatureLike> extends RLayerProps {
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
    /**
     * OpenLayers features that will be loaded
     *
     * This property currently does not support dynamic updates.
     *
     * Prefer nesting JSX <RFeature> components inside the layer in this case.
     */
    features?: F[];
    /** Format of the features when `url` is used
     *
     * this property currently does not support dynamic updates
     */
    format?: FeatureFormat<F>;
    /** Use a custom loader instead of XHR */
    loader?: FeatureLoader<F>;
    /** OpenLayers default style for features without `style` */
    style?: RStyleLike | FlatStyleLike;
    /** OpenLayers option to specify LoadingStrategy default is `all` strategy */
    strategy?: LoadingStrategy;
    /**
     * Wrap features around the antimeridian. Cannot be dynamically updated once the layer is created.
     * @default false
     */
    wrapX?: boolean;
    /** Default onClick handler for loaded features */
    onClick?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RFeatureUIEvent<F>
    ) => boolean | void;
    /**
     * Called when a feature is added, not called for features
     * already present at creation, ie loaded via `features` or `url`
     *
     * use onFeaturesLoadEnd for features loaded via `url`
     */
    onAddFeature?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: VectorSourceEvent<F>
    ) => boolean | void;
    /**
     * Called upon initiating the request for new features
     */
    onFeaturesLoadStart?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: VectorSourceEvent<F>
    ) => boolean | void;
    /**
     * Called when the external features have been loaded from `url`
     *
     * e.features will contain the new features
     *
     * This callback is invoked before the features are loaded
     */
    onFeaturesLoadEnd?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: VectorSourceEvent<F>
    ) => boolean | void;
    /**
     * Called on failure while loading features
     */
    onFeaturesLoadError?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: VectorSourceEvent<F>
    ) => boolean | void;
    /** onPointerMove handler for all loaded features */
    onPointerMove?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RFeatureUIEvent<F>
    ) => boolean | void;
    /** onPointerEnter handler for all loaded features */
    onPointerEnter?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RFeatureUIEvent<F>
    ) => boolean | void;
    /** onPointerLeave handler for all loaded features */
    onPointerLeave?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RFeatureUIEvent<F>
    ) => boolean | void;
    onPostRender?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RenderEvent
    ) => boolean | void;
    onPreRender?: (
        this: RLayerBaseVector<F, RLayerBaseVectorProps<F>>,
        e: RenderEvent
    ) => boolean | void;
}

/**
 * An abstract class used for grouping code common to all Vector layers
 *
 * Meant to be extended
 */
export default class RLayerBaseVector<
    F extends FeatureLike,
    P extends RLayerBaseVectorProps<F>
> extends RLayer<P> {
    ol: BaseVector<
        F,
        SourceVector<F>,
        | CanvasVectorLayerRenderer
        | CanvasVectorTileLayerRenderer
        | CanvasVectorImageLayerRenderer
        | WebGLVectorLayerRenderer
    >;
    source: SourceVector<F>;

    constructor(props: Readonly<P>) {
        super(props);
        this.eventSources = this.createSource(props);
        super.refresh();
    }

    protected createSource(props: Readonly<P>): BaseObject[] {
        throw new Error('RLayerBaseVector is an abstract class');
    }

    protected refresh(prevProps?: P): void {
        super.refresh(prevProps);
        if (prevProps?.style !== this.props.style) {
            if (isOLFlatStyle(this.props.style)) this.ol.setStyle(this.props.style);
            else this.ol.setStyle(RStyle.getStyle(this.props.style));
        }
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
        super.render();
        RFeature.initEventRelay(this.context.map);
        return (
            <div className='_rlayers_RLayerVector'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            layer: this.ol,
                            source: this.source,
                            vectorlayer: this.ol,
                            vectorsource: this.source,
                            rLayer: this,
                            rLayerVector: this
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
