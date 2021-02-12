import React from 'react';
import {Map} from 'ol';
import {Layer} from 'ol/layer';
import {Source} from 'ol/source';

import {RMapContext} from '../context';
import {ReactLayersBase} from '../REvent';
import debug from '../debug';

export interface RLayerProps {
    /** State of the layer */
    visible?: boolean;
    /** Opacity when blending */
    opacity?: number;
    /** zIndex */
    zIndex?: number;
    /** Minimum resolution below which the layer is not rendered */
    minResolution?: number;
    /** Maximum resolution above which the layer is not rendered */
    maxResolution?: number;
    /** Minimum zoom level below which the layer is not rendered */
    minZoom?: number;
    /** Maximum zoom level which the layer is not rendered */
    maxZoom?: number;
    /** Custom attributions string */
    attributions?: string;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /** The layer will be reprojected if its projection is different than the map */
    projection?: string;
}

export default class RLayer<P extends RLayerProps> extends ReactLayersBase<P, null> {
    static contextType = RMapContext;
    ol: Layer;
    source: Source;

    constructor(props: Readonly<P>, context: React.Context<Map>) {
        super(props, context);
        if (!this.context || !this.context.addLayer)
            throw new Error('A layer must be part of a map');
    }

    refresh(prevProps?: P): void {
        super.refresh(prevProps);
        for (const p of [
            'visible',
            'opacity',
            'zIndex',
            'minResolution',
            'maxResolution',
            'minZoom',
            'maxZoom'
        ]) {
            if (this.props[p] !== undefined) {
                const m = p.charAt(0).toUpperCase() + p.substring(1);
                if (this.props[p] !== this.ol['get' + m]()) this.ol['set' + m](this.props[p]);
            }
        }
        if (this.source && this.props.attributions)
            this.source.setAttributions(this.props.attributions);
        if (this.props.properties) this.ol.setProperties(this.props.properties);
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.addLayer(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.removeLayer(this.ol);
    }
}
