import React from 'react';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import {RMap, ROSM, RControl} from 'rlayers';

const origin = [2.364, 48.82];

// Most of the customization is in the example-overview CSS class
// Include the OpenLayers built-in .ol-overviewmap to avoid recreating everything from scratch

export default function Overview(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat(origin), zoom: 11}}>
            <ROSM />
            <RControl.ROverviewMap className='ol-overviewmap example-overview'>
                <ROSM />
            </RControl.ROverviewMap>
        </RMap>
    );
}
