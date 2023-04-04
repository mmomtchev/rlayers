import React from 'react';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import {RMap, RLayerRasterMBTiles} from 'rlayers';

// This is an example for rendering directly from a remote MBTiles source over HTTP
// It uses the `ol-mbtiles` plugin which you must install separately:
//
// npm install ol-mbtiles
//
// Be sure to check its documentation for more information:
// https://github.com/mmomtchev/ol-mbtiles

const center = fromLonLat([55.47437, -21.08468]);
export default function MBTiles(): JSX.Element {
    return (
        <RMap width={'100%'} height={'60vh'} initial={{center: center, zoom: 9}}>
            <RLayerRasterMBTiles url={'https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles'} />
        </RMap>
    );
}
