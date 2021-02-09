import React from 'react';
import {Map as OLMap} from 'ol';
import {Layer as OLLayer} from 'ol/layer';
import {Source as OLSource} from 'ol/source';

import {default as Map, MapContext} from '../Map';
import {ReactLayersBase} from '../Event';
import debug from '../debug';

export interface LayerProps {
    visible?: boolean;
    opacity?: number;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    attributions?: string;
    properties?: Record<string, unknown>;
    projection?: string;
}

export default class Layer<P extends LayerProps> extends ReactLayersBase<P, null> {
    static contextType = MapContext;
    ol: OLLayer;
    source: OLSource;

    constructor(props: Readonly<P>, context: React.Context<OLMap>) {
        super(props, context);
        if (!this.context || !this.context.addLayer)
            throw new Error('A layer must be part of a map');
    }

    refresh(): void {
        super.refresh();
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
        debug('didMount', this);
        super.componentDidMount();
        this.context.addLayer(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.removeLayer(this.ol);
    }
}

export const LayerContext = React.createContext(null);
