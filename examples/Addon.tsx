/**
 * This example shows how to extend RLayers to include support for your custom component
 */

import React from 'react';
import {fromLonLat} from 'ol/proj';
import {MapboxVectorLayer as VectorMapbox} from 'ol-mapbox-style';

import {RMap, RLayer, RLayerProps, RContextType} from 'rlayers';

/**
 * The properties interface definition
 */
interface MyLayerMapboxProps extends RLayerProps {
    styleUrl: string;
    accessToken: string;
}

/**
 * A component wrapper for ol/layer/MapboxVector
 */
class MyLayerMapbox extends RLayer<MyLayerMapboxProps> {
    ol: VectorMapbox;

    // Tiled layers must extend RLayerRaster, non-tiled vector layers must extend RLayerVector
    // This allows you to have the same features as RLayers built-in components
    // Completely custom layers must extend RLayer
    constructor(props: Readonly<MyLayerMapboxProps>, context?: React.Context<RContextType>) {
        // You must call the parent constructor
        super(props, context);

        // You must create the this.ol object which must be compatible with the this.ol of the parent
        this.ol = new VectorMapbox({
            ...props
        });

        // You must enumerate all OpenLayers event sources here
        this.eventSources = [this.ol];

        // And call this function for the event handlers to work
        this.attachEventHandlers();
    }
}

/**
 * Using your custom component
 */
export default function Addon(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}>
            <MyLayerMapbox
                styleUrl={'mapbox://styles/mapbox/bright-v9'}
                // Be sure to get your own Mapbox token
                // (this won't work in CodePen)
                accessToken={MAPBOX_TOKEN}
            />
        </RMap>
    );
}
