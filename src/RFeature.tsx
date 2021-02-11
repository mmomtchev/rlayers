import React from 'react';
import {Map as Map, MapBrowserEvent} from 'ol';
import {Feature} from 'ol';
import {StyleLike} from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';
import {getCenter} from 'ol/extent';

import {
    RVectorContext,
    RVectorContextType,
    RLocationContext,
    RLocationContextType
} from './context';
import {ReactLayersBase} from './REvent';
import debug from './debug';

export interface RFeatureProps {
    /** OpenLayers geometry, mutually exclusive with RFeature */
    geometry?: Geometry;
    /** OpenLayers style */
    style?: StyleLike;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /** An OpenLayers RFeature, mutually exclusive with geometry */
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
}

/**
 * Component for a single vector feature
 *
 * Vector features can be either
 *
 * * implicit, when loaded from a file as props of a `RLayerVector`
 * * explicit, when declared as JSX with this component
 *
 * Requires a vector layer context `RVectorContext`
 *
 * Provides a location context `RLocationContext`
 *
 * [Example for explicit RFeatures](https://mmomtchev.github.io/react-layers/#/overlays)
 *
 * [Example for implicit RFeatures](https://mmomtchev.github.io/react-layers/#/RFeatures)
 *
 */

export default class RFeature extends ReactLayersBase<RFeatureProps, null> {
    static pointerEvents = ['click', 'pointerdrag', 'pointermove', 'singleclick', 'dblclick'];
    static contextType = RVectorContext;
    static lastFeatureEntered: undefined | Feature;
    static lastFeatureDragged: undefined | Feature;
    static hitTolerance = 10;
    ol: Feature;
    context: RVectorContextType;
    onchange: () => boolean | void;

    constructor(props: Readonly<RFeatureProps>, context: React.Context<RVectorContextType>) {
        super(props, context);
        if (!this.context || !this.context.layer)
            throw new Error('An RFeature must be part of a vector layer');
        if (props.feature) this.ol = props.feature;
        else
            this.ol = new Feature({
                ...(props.properties ?? {}),
                geometry: props.geometry,
                style: props.style
            });
        RFeature.initEventRelay(this.context.map);
        this.onchange = () => this.forceUpdate();
    }

    static initEventRelay(map: Map): void {
        for (const ev of RFeature.pointerEvents) map.on(ev, RFeature.eventRelay);
    }

    // This doesn't support overlappig RFeatures (yet?)
    static eventRelay(e: MapBrowserEvent): boolean {
        let feature = e.map.forEachFeatureAtPixel(e.pixel, (f: Feature) => f.dispatchEvent && f, {
            hitTolerance: RFeature.hitTolerance
        });
        if (e.dragging) {
            if (!RFeature.lastFeatureDragged) RFeature.lastFeatureDragged = feature;
            feature = RFeature.lastFeatureDragged;
        } else {
            if (RFeature.lastFeatureDragged)
                RFeature.lastFeatureDragged.dispatchEvent(
                    new MapBrowserEvent('pointerdragend', e.map, e.originalEvent)
                );
            RFeature.lastFeatureDragged = undefined;
        }

        if (e.type === 'pointermove') {
            if (RFeature.lastFeatureEntered !== feature) {
                if (RFeature.lastFeatureEntered)
                    RFeature.lastFeatureEntered.dispatchEvent(
                        new MapBrowserEvent('pointerleave', e.map, e.originalEvent)
                    );
                RFeature.lastFeatureEntered = feature;
                if (feature)
                    feature.dispatchEvent(
                        new MapBrowserEvent('pointerenter', e.map, e.originalEvent)
                    );
            }
        }
        if (feature) {
            return feature.dispatchEvent(new MapBrowserEvent(e.type, e.map, e.originalEvent));
        }
        return true;
    }

    refresh(): void {
        super.refresh();
        if (this.props.properties && this.props.properties !== this.ol.getProperties())
            this.ol.setProperties(this.props.properties);
        if (this.props.geometry && this.props.geometry !== this.ol.getGeometry())
            this.ol.setGeometry(this.props.geometry);
        if (this.props.style && this.props.style !== this.ol.getStyle())
            this.ol.setStyle(this.props.style);
    }

    componentDidMount(): void {
        debug('didMount', this.ol);
        super.componentDidMount();
        this.ol.on('change', this.onchange);
        this.context.source.addFeature(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.ol.un('change', this.onchange);
        this.context.source.removeFeature(this.ol);
    }

    render(): JSX.Element {
        const extent = this.ol?.getGeometry()?.getExtent();
        const center = extent && getCenter(extent);
        return (
            <RLocationContext.Provider
                value={
                    {
                        map: this.context.map,
                        layer: this.context.layer,
                        feature: this.ol,
                        location: center
                    } as RLocationContextType
                }
            >
                {this.props.children}
            </RLocationContext.Provider>
        );
    }
}
