import React from 'react';
import {Map as Map, MapBrowserEvent} from 'ol';
import {Feature} from 'ol';
import BaseVectorLayer from 'ol/layer/BaseVector';
import Geometry from 'ol/geom/Geometry';
import BaseEvent from 'ol/events/Event';
import {getCenter} from 'ol/extent';

import {RContext, RContextType} from './context';
import {RlayersBase} from './REvent';
import RStyle, {RStyleLike} from './style/RStyle';
import debug from './debug';

export interface RFeatureProps {
    /** OpenLayers geometry, mutually exclusive with feature */
    geometry?: Geometry;
    /** OpenLayers style */
    style?: RStyleLike;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /** Bind the RFeature to an OpenLayers Feature, mutually exclusive with geometry
     *
     * When bound, the RFeature will automatically update its state when the Feature
     * changes
     *
     * rebinding to a different feature on update is not supported */
    feature?: Feature;
    /** Called immediately on click */
    onClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called on single click when the double click timer has expired */
    onSingleClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called on double click */
    onDblClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called on every pointer move when dragging, `e.preventDefault()`
     * can be used to stop OpenLayers from also panning the map */
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    /** Called when the object is released */
    onPointerDragEnd?: (e: MapBrowserEvent) => boolean | void;
    /** Called on every pointer movement over the RFeature, use sparingly */
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    /** Called once when the pointer moves over the RFeature */
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    /** Called once when the pointer moves out of the RFeature */
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
    /** Called on every change */
    onChange?: (e: BaseEvent) => void;
}

type FeatureRef = {
    feature: Feature;
    layer: BaseVectorLayer;
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
export default class RFeature extends RlayersBase<RFeatureProps, null> {
    static pointerEvents = ['click', 'pointerdrag', 'pointermove', 'singleclick', 'dblclick'];
    static lastFeaturesEntered: FeatureRef[] = [];
    static lastFeaturesDragged: FeatureRef[] = [];
    static hitTolerance = 3;
    ol: Feature;
    onchange: () => boolean | void;

    constructor(props: Readonly<RFeatureProps>, context: React.Context<RContextType>) {
        super(props, context);
        if (!this?.context?.vectorlayer)
            throw new Error('An RFeature must be part of a vector layer');
        if (props.feature) this.ol = props.feature;
        else
            this.ol = new Feature({
                ...(props.properties ?? {}),
                geometry: props.geometry,
                style: RStyle.getStyle(props.style)
            });
        RFeature.initEventRelay(this.context.map);
        this.onchange = () => this.forceUpdate();
    }

    static initEventRelay(map: Map): void {
        for (const ev of RFeature.pointerEvents) map.on(ev, RFeature.eventRelay);
    }

    static dispatchEvent(fr: FeatureRef, event: MapBrowserEvent): boolean {
        if (!fr.feature) return true;
        if (fr.feature.dispatchEvent) return fr.feature.dispatchEvent(event);
        if (!event.target) event.target = fr.feature;
        if (fr.layer?.get('_on' + event.type)) return fr.layer.get('_on' + event.type)(event);
        return true;
    }

    static eventRelay(e: MapBrowserEvent): boolean {
        const triggered: FeatureRef[] = [];
        e.map.forEachFeatureAtPixel(
            e.pixel,
            (f: Feature, l: BaseVectorLayer) => triggered.push({feature: f, layer: l}) && false,
            {
                hitTolerance: RFeature.hitTolerance
            }
        );

        if (e.dragging) {
            if (!RFeature.lastFeaturesDragged.length) RFeature.lastFeaturesDragged = [...triggered];
            for (const fr of RFeature.lastFeaturesDragged)
                if (!triggered.find((f) => f.feature === fr.feature)) triggered.push(fr);
        } else {
            for (const fr of RFeature.lastFeaturesDragged)
                RFeature.dispatchEvent(
                    fr,
                    new MapBrowserEvent('pointerdragend', e.map, e.originalEvent)
                );
            RFeature.lastFeaturesDragged = [];
        }

        if (e.type === 'pointermove') {
            // For all features previously entered, check if the pointer is still over them
            // Send pointerleave and then remove those that are not under the pointer anymore
            for (const fr of RFeature.lastFeaturesEntered)
                if (!triggered.find((f) => f.feature === fr.feature)) {
                    RFeature.dispatchEvent(
                        fr,
                        new MapBrowserEvent('pointerleave', e.map, e.originalEvent)
                    );
                    fr.feature = null;
                    fr.layer = null;
                }
            RFeature.lastFeaturesEntered = RFeature.lastFeaturesEntered.filter((fr) => fr.feature);

            // For all features triggered on this cycle, check if they were previous entered
            // Send pointerenter and then register all the new feature
            for (const fr of triggered) {
                if (!RFeature.lastFeaturesEntered.find((f) => f.feature === fr.feature)) {
                    RFeature.dispatchEvent(
                        fr,
                        new MapBrowserEvent('pointerenter', e.map, e.originalEvent)
                    );
                    RFeature.lastFeaturesEntered.push(fr);
                }
            }
        }

        // Normal re-dispatch for everything else
        // Stop on false
        for (const fr of triggered)
            if (
                RFeature.dispatchEvent(fr, new MapBrowserEvent(e.type, e.map, e.originalEvent)) ===
                false
            )
                return false;
        return true;
    }

    refresh(prevProps?: RFeatureProps): void {
        super.refresh(prevProps);
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
        const extent = this.ol?.getGeometry()?.getExtent();
        const center = extent && getCenter(extent);
        return (
            <RContext.Provider
                value={
                    {
                        map: this.context.map,
                        layer: this.context.vectorlayer,
                        source: this.context.vectorsource,
                        feature: this.ol,
                        location: center
                    } as RContextType
                }
            >
                {this.props.children}
            </RContext.Provider>
        );
    }
}
