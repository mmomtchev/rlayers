import React, {JSX} from 'react';
import proj4 from 'proj4';
import {fromLonLat} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import 'ol/ol.css';

import {RMap, ROSM, RLayerWMTS} from 'rlayers';

// British National Grid definition (EPSG:27700)
proj4.defs(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
        '+x_0=400000 +y_0=-100000 +ellps=airy ' +
        '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
        '+units=m +no_defs'
);
register(proj4);

export default function Reprojection(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat([0, 50]), zoom: 5}}>
            <ROSM />
            <RLayerWMTS
                zIndex={5}
                projection='EPSG:27700'
                attributions='Contains OS data © Crown Copyright and database right'
                url='https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS'
                layer='OS_Open_Raster'
            />
        </RMap>
    );
}
