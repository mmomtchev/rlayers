import React, {JSX, PropsWithChildren} from 'react';
import {Map as Map, MapBrowserEvent} from 'ol';
import {Feature} from 'ol';
import {FeatureLike} from 'ol/Feature';
import BaseVectorLayer from 'ol/layer/BaseVector';
import CanvasVectorLayerRenderer from 'ol/renderer/canvas/VectorLayer';
import SourceVector from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import {getCenter} from 'ol/extent';

import {RContext, RContextType} from './context';
import {OLEvent, RlayersBase, handlersSymbol} from './REvent';
import {FeatureHandlers, featureHandlersSymbol} from './layer/RLayerBaseVector';
import RStyle, {RStyleLike} from './style/RStyle';
import debug from './debug';

export class RFeatureUIEvent<F extends FeatureLike> extends MapBrowserEvent<UIEvent> {
    target: F;
}

export class RFeatureBaseEvent<F extends FeatureLike> extends BaseEvent {
    target: F;
}

/**
 * @propsfor RFeature
 */
export interface RFeatureProps<G extends Geometry = Geometry> extends PropsWithChildren<unknown> {
    /** OpenLayers geometry, mutually exclusive with feature */
    geometry?: G;
    /** OpenLayers style */
    style?: RStyleLike;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /**
     * Bind the RFeature to an OpenLayers Feature, mutually exclusive with geometry
     *
     * When bound, the RFeature will automatically update its state when the Feature
     * changes
     *
     * geometry is usually a better choice for a dynamic feature
     */
    feature?: Feature<G>;
    /** Called immediately on click */
    onClick?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called on single click when the double click timer has expired */
    onSingleClick?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called on double click */
    onDblClick?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called on every pointer move when dragging, `e.preventDefault()`
     * can be used to stop OpenLayers from also panning the map */
    onPointerDrag?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called when the object is released */
    onPointerDragEnd?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called on every pointer movement over the RFeature, use sparingly */
    onPointerMove?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called once when the pointer moves over the RFeature */
    onPointerEnter?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called once when the pointer moves out of the RFeature */
    onPointerLeave?: (this: RFeature<G>, e: RFeatureUIEvent<Feature<G>>) => boolean | void;
    /** Called on every change */
    onChange?: (this: RFeature<G>, e: RFeatureBaseEvent<Feature<G>>) => void;
}

type FeatureRef<G extends Geometry = Geometry> = {
    feature: Feature<G>;
    layer: BaseVectorLayer<FeatureLike, SourceVector<FeatureLike>, CanvasVectorLayerRenderer>;
};

/**
 * Component for a single vector feature
 *
 * Vector features can be either
 *
 * * implicit, when loaded from a file as props of a `RLayerVector`
 * * explicit, when declared as JSX with this component
 *
 * Requires a vector layer context
 *
 * Provides a location context
 *
 * [Example for explicit RFeatures](https://mmomtchev.github.io/rlayers/#/overlays)
 *
 * [Example for implicit RFeatures](https://mmomtchev.github.io/rlayers/#/RFeatures)
 *
 */
export default class RFeature<G extends Geometry = Geometry> extends RlayersBase<
    RFeatureProps<G>,
    Record<string, never>
> {
    private static pointerEvents: (
        | 'click'
        | 'pointerdrag'
        | 'pointermove'
        | 'singleclick'
        | 'dblclick'
    )[] = ['click', 'pointerdrag', 'pointermove', 'singleclick', 'dblclick'];
    private static lastFeaturesEntered: FeatureRef[] = [];
    private static lastFeaturesDragged: FeatureRef[] = [];
    static hitTolerance = 3;
    ol: Feature<G>;
    onchange: () => boolean | void;

    constructor(props: Readonly<RFeatureProps<G>>) {
        super(props);
        if (props.feature) this.ol = props.feature;
        else
            this.ol = new Feature<G>({
                ...(props.properties ?? {}),
                geometry: props.geometry,
                style: RStyle.getStyle(props.style)
            });
        this.onchange = () => this.forceUpdate();
    }

    static initEventRelay(map: Map): void {
        // These are reinstalled at every new feature
        // but since eventRelay is static this doesn't grow the listeners array
        for (const ev of RFeature.pointerEvents) map.on(ev, RFeature.eventRelay);
    }

    protected incrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.context.vectorlayer
        );
        featureHandlers[ev] = (featureHandlers[ev] ?? 0) + 1;
    }
    protected decrementHandlers(ev: OLEvent): void {
        const featureHandlers = RlayersBase.getOLObject<FeatureHandlers>(
            featureHandlersSymbol,
            this.context.vectorlayer
        );
        featureHandlers[ev]--;
    }

    protected static dispatchEvent(
        fr: FeatureRef,
        event: RFeatureUIEvent<Feature<Geometry>>
    ): boolean {
        if (!fr.feature) return true;
        if (fr.feature.dispatchEvent) {
            const propagate = fr.feature.dispatchEvent(event);
            if (propagate === false) return false;
        }
        if (!event.target) event.target = fr.feature;
        const layerHandler = fr.layer?.get(handlersSymbol)[event.type];
        if (layerHandler) {
            return layerHandler.call(null, event);
        }
        return true;
    }

    private static eventRelay(e: RFeatureUIEvent<Feature<Geometry>>): boolean {
        const triggered: FeatureRef[] = [];
        e.map.forEachFeatureAtPixel(
            e.pixel,
            (
                f: Feature<Geometry>,
                l: BaseVectorLayer<
                    FeatureLike,
                    SourceVector<FeatureLike>,
                    CanvasVectorLayerRenderer
                >
            ) => triggered.push({feature: f, layer: l}) && false,
            {
                hitTolerance: RFeature.hitTolerance,
                layerFilter: (layer) => {
                    const handlers = RlayersBase.getOLObject<FeatureHandlers>(
                        featureHandlersSymbol,
                        layer
                    );
                    switch (e.type) {
                        case 'click':
                            return handlers['click'] > 0;
                        case 'dblclick':
                            return handlers['dblclick'] > 0;
                        case 'singleclick':
                            return handlers['singleclick'] > 0;
                        case 'pointermove':
                            return (
                                (handlers['pointermove'] ?? 0) +
                                    (handlers['pointerenter'] ?? 0) +
                                    (handlers['pointerleave'] ?? 0) >
                                0
                            );
                        case 'pointerdrag':
                            return (
                                (handlers['pointerdrag'] ?? 0) + (handlers['pointerdragend'] ?? 0) >
                                0
                            );
                    }
                    return Object.keys(handlers).reduce((a, x) => a + handlers[x], 0) > 0;
                }
            }
        );

        if (e.dragging) {
            if (!RFeature.lastFeaturesDragged.length) RFeature.lastFeaturesDragged = [...triggered];
            for (const fr of RFeature.lastFeaturesDragged)
                if (!triggered.find((f) => f.feature === fr.feature)) triggered.push(fr);
        } else {
            for (const fr of RFeature.lastFeaturesDragged) {
                const propagation = RFeature.dispatchEvent(
                    fr,
                    new RFeatureUIEvent('pointerdragend', e.map, e.originalEvent)
                );
                if (propagation === false) {
                    RFeature.lastFeaturesDragged = [];
                    return false;
                }
            }
            RFeature.lastFeaturesDragged = [];
        }

        if (e.type === 'pointermove') {
            // For all features previously entered, check if the pointer is still over them
            // Send pointerleave and then remove those that are not under the pointer anymore
            for (const fr of RFeature.lastFeaturesEntered)
                if (!triggered.find((f) => f.feature === fr.feature)) {
                    const propagation = RFeature.dispatchEvent(
                        fr,
                        new RFeatureUIEvent('pointerleave', e.map, e.originalEvent)
                    );
                    fr.feature = null;
                    fr.layer = null;
                    if (propagation === false) {
                        RFeature.lastFeaturesEntered = RFeature.lastFeaturesEntered.filter(
                            (fr) => fr.feature
                        );
                        return false;
                    }
                }
            RFeature.lastFeaturesEntered = RFeature.lastFeaturesEntered.filter((fr) => fr.feature);

            // For all features triggered on this cycle, check if they were previously entered
            // Send pointerenter and then register all the new features
            for (const fr of triggered) {
                if (!RFeature.lastFeaturesEntered.find((f) => f.feature === fr.feature)) {
                    const propagation = RFeature.dispatchEvent(
                        fr,
                        new RFeatureUIEvent('pointerenter', e.map, e.originalEvent)
                    );
                    RFeature.lastFeaturesEntered.push(fr);
                    if (propagation === false) return false;
                }
            }
        }

        // Normal re-dispatch for everything else
        // Stop on false
        for (const fr of triggered)
            if (
                RFeature.dispatchEvent(fr, new RFeatureUIEvent(e.type, e.map, e.originalEvent)) ===
                false
            )
                return false;
        return true;
    }

    protected refresh(prevProps?: RFeatureProps<G>): void {
        super.refresh(prevProps);
        if (this.props.feature !== undefined && this.props.feature !== this.ol) {
            debug('replacing bound feature', this.ol);
            this.componentWillUnmount();
            this.ol = this.props.feature;
            this.componentDidMount();
        }
        if (this.props.properties !== prevProps?.properties)
            this.ol.setProperties(this.props.properties);
        if (this.props.geometry !== prevProps?.geometry) this.ol.setGeometry(this.props.geometry);
        if (this.props.style !== prevProps?.style)
            this.ol.setStyle(RStyle.getStyle(this.props.style));
    }

    componentDidMount(): void {
        debug('didMount', this.ol);
        super.componentDidMount();
        this.ol.on('change', this.onchange);
        this.context.vectorsource.addFeature(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.ol.un('change', this.onchange);
        this.context.vectorsource.removeFeature(this.ol);
    }

    render(): JSX.Element {
        if (!this?.context?.vectorlayer)
            throw new Error('An RFeature must be part of a vector layer');
        RFeature.initEventRelay(this.context.map);
        const extent = this.ol?.getGeometry()?.getExtent();
        const center = extent && getCenter(extent);
        return (
            <div className='_rlayers_RFeature'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            feature: this.ol,
                            rFeature: this,
                            location: center
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
