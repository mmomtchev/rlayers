import React from 'react';
import {ProjectionLike} from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import BaseEvent from 'ol/events/Event';

import {RlayersBase} from './REvent';

/**
 * @propsfor RGeolocation
 */
export interface RGeolocationProps {
    /** Continuous tracking
     * @default false */
    tracking?: boolean;
    /** Tracking options (W3C standard) */
    trackingOptions?: {
        enableHighAccuracy?: boolean;
        timeout?: number;
        maximumAge?: number;
    };
    /** Projection for the returned coordinates
     * @default viewProjection */
    projection?: ProjectionLike;
    /** Called on every change */
    onChange?: (this: RGeolocation, e: BaseEvent) => void;
    /** Called on error */
    onError?: (this: RGeolocation, e: BaseEvent) => void;
}

/**
 * A wrapper around the OpenLayers Geolocation helper
 *
 * Must have an `RMap` parent
 */
export default class RGeolocation extends RlayersBase<RGeolocationProps, Record<string, never>> {
    ol: Geolocation;

    constructor(props: Readonly<RGeolocationProps>) {
        super(props);
        this.ol = null;
    }

    render(): React.JSX.Element {
        if (!this?.context?.map) throw new Error('A Geolocation must be part of a map');
        if (this.ol === null) {
            const projection = this.props.projection ?? this.context.map.getView().getProjection();
            this.ol = new Geolocation({...this.props, projection});
        }
        return super.render();
    }
}
