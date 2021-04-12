import React from 'react';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import {RMap, ROSM} from 'rlayers';

const center = fromLonLat([2.364, 48.82]);
export default function Simple(): JSX.Element {
    return (
        <RMap width={'100%'} height={'60vh'} initial={{center: center, zoom: 11}}>
            <ROSM />
        </RMap>
    );
}
