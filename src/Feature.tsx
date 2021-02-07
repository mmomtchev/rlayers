import React from 'react';
import {Map as OLMap, MapBrowserEvent} from 'ol';
import {Vector as OLLayerVector} from 'ol/layer';
import {Feature as OLFeature} from 'ol';
import {StyleLike} from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';
import {getCenter} from 'ol/extent';
import {Coordinate} from 'ol/coordinate';

import {VectorContext, VectorContextType} from './layer/LayerVector';
import {ReactLayersBase} from './Event';
import debug from './debug';

export interface FeatureProps {
    geometry?: Geometry;
    style?: StyleLike;
    properties?: Record<string, unknown>;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerDragEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
    onPointerLeave?: (e: MapBrowserEvent) => boolean | void;
}

export interface LocationContextType {
    map: OLMap;
    layer: OLLayerVector;
    feature: OLFeature;
    location: Coordinate;
}

export const LocationContext = React.createContext(null);

export default class Feature extends ReactLayersBase<FeatureProps, null> {
    static contextType = VectorContext;
    static lastFeatureEntered: undefined | OLFeature;
    static lastFeatureDragged: undefined | OLFeature;
    static hitTolerance = 10;
    ol: OLFeature;
    context: VectorContextType;
    onchange: () => boolean | void;

    constructor(props: Readonly<FeatureProps>, context: React.Context<VectorContextType>) {
        super(props, context);
        this.ol = new OLFeature({
            ...(props.properties ?? {}),
            geometry: props.geometry,
            style: props.style
        });
        Feature.initEventRelay(this.context.map);
        this.onchange = () => this.forceUpdate();
    }

    static initEventRelay(map: OLMap): void {
        for (const ev of ['click', 'pointerdrag', 'pointermove']) map.on(ev, Feature.eventRelay);
    }

    static eventRelay(e: MapBrowserEvent): boolean {
        let feature = e.map.forEachFeatureAtPixel(e.pixel, (f: OLFeature) => f.dispatchEvent && f, {
            hitTolerance: Feature.hitTolerance
        });
        if (e.dragging) {
            if (!Feature.lastFeatureDragged) Feature.lastFeatureDragged = feature;
            feature = Feature.lastFeatureDragged;
            if (feature && feature.getListeners('pointerdrag')) e.preventDefault();
        } else {
            if (Feature.lastFeatureDragged)
                feature.dispatchEvent(
                    new MapBrowserEvent('pointerdragend', e.map, e.originalEvent)
                );
            Feature.lastFeatureDragged = undefined;
        }

        if (e.type === 'pointermove') {
            if (Feature.lastFeatureEntered !== feature) {
                if (Feature.lastFeatureEntered)
                    Feature.lastFeatureEntered.dispatchEvent(
                        new MapBrowserEvent('pointerleave', e.map, e.originalEvent)
                    );
                Feature.lastFeatureEntered = feature;
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
        this.context.layer.getSource().addFeature(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.ol.un('change', this.onchange);
        this.context.layer.getSource().removeFeature(this.ol);
    }

    render(): JSX.Element {
        const extent = this.ol?.getGeometry()?.getExtent();
        const center = extent && getCenter(extent);
        return (
            <LocationContext.Provider
                value={
                    {
                        map: this.context.map,
                        layer: this.context.layer,
                        feature: this.ol,
                        location: center
                    } as LocationContextType
                }
            >
                {this.props.children}
            </LocationContext.Provider>
        );
    }
}
