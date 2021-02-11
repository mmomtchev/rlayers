import React from 'react';
import {fromLonLat} from 'ol/proj';
import {RMap, ROSM} from 'react-layers';

export default function Simple(): JSX.Element {
    return (
        <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
            <ROSM />
        </RMap>
    );
}
