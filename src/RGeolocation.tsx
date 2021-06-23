import React from 'react';
import {MapBrowserEvent} from 'ol';
import Geolocation from 'ol/Geolocation';
import BaseEvent from 'ol/events/Event';

import {RlayersBase} from './REvent';
import {RContextType} from './context';

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
    projection?: string;
    /** Called on every change */
    onChange?: (e: BaseEvent) => void;
    /** Called on error */
    onError?: (e: BaseEvent) => void;
}

/**
 * A wrapper around the OpenLayers Geolocation helper
 *
 * Must have an `RMap` parent
 */
export default class RGeolocation extends RlayersBase<RGeolocationProps, Record<string, never>> {
    ol: Geolocation;

    constructor(props: Readonly<RGeolocationProps>, context: React.Context<RContextType>) {
        super(props, context);
        if (!this?.context?.map) throw new Error('A Geolocation must be part of a map');
        const projection = props.projection ?? this.context.map.getView().getProjection();
        this.ol = new Geolocation({...props, projection});
    }
}
