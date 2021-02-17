import React from 'react';
import {fromLonLat} from 'ol/proj';
import {boundingExtent, getCenter} from 'ol/extent';
import 'ol/ol.css';

import {RMap, ROSM} from 'rlayers';

const extent = boundingExtent([fromLonLat([2.25, 48.81]), fromLonLat([2.42, 48.9])]);
const center = getCenter(extent);
export default function Extent(): JSX.Element {
    return (
        <RMap className='example-map' center={center} extent={extent} maxZoom={16} zoom={8}>
            <ROSM />
        </RMap>
    );
}
