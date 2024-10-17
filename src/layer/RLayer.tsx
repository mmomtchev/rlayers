import React, {PropsWithChildren} from 'react';
import {Layer} from 'ol/layer';
import {Source} from 'ol/source';
import LayerRenderer from 'ol/renderer/Layer';
import BaseEvent from 'ol/events/Event';
import {ProjectionLike} from 'ol/proj';
import {AttributionLike} from 'ol/source/Source';

import {RContext, RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

/**
 * @propsfor RLayerProps
 */
export interface RLayerProps extends PropsWithChildren<unknown> {
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
    attributions?: AttributionLike;
    /** Initial tile cache size */
    cacheSize?: number | undefined;
    /** Wrap features around the antimeridian */
    wrapX?: boolean | undefined;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /** The layer will be reprojected if its projection is different than the map */
    projection?: ProjectionLike;
    /** Called on every change */
    onChange?: (this: RLayer<RLayerProps>, e: BaseEvent) => void;
}

/**
 * Abstract base class for all layers, not meant to be used directly
 */
export default class RLayer<P extends RLayerProps> extends RlayersBase<P, Record<string, never>> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: Layer<Source, LayerRenderer<any>>;
    source: Source;

    constructor(props: Readonly<P>, context?: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.map?.addLayer) throw new Error('A layer must be part of a map');
    }

    protected refresh(prevProps?: P): void {
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
            const m = p.charAt(0).toUpperCase() + p.substring(1);
            if (this.props[p] !== (prevProps && prevProps[p])) this.ol['set' + m](this.props[p]);
        }
        if (this.source && this.props.attributions)
            this.source.setAttributions(this.props.attributions);
        if (this.props.properties) this.ol.setProperties(this.props.properties);
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.map.addLayer(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.map.removeLayer(this.ol);
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RLayer'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            layer: this.ol,
                            source: this.source,
                            rLayer: this
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
