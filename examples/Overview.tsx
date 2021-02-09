import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Map, OSM, Control} from 'react-layers';

const origin = [2.364, 48.82];

// Most of the customization is in the example-overview CSS class
// Include the OpenLayers built-in .ol-overviewmap to avoid recreating everything from scratch

export default function Overview(): JSX.Element {
    return (
        <Map className='example-map' center={fromLonLat(origin)} zoom={11}>
            <OSM />
            <Control.OverviewMap className='ol-overviewmap example-overview'>
                <OSM />
            </Control.OverviewMap>
        </Map>
    );
}
