import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Map, OSM} from 'react-layers';

export default function Simple(): JSX.Element {
    return (
        <Map className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
            <OSM />
        </Map>
    );
}
