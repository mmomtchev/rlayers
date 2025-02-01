import React, {JSX} from 'react';
import {fromLonLat} from 'ol/proj';
import {register} from 'ol/proj/proj4';
import proj4 from 'proj4';
import 'ol/ol.css';

import {RLayerWMTS, RMap} from 'rlayers';

proj4.defs(
    'EPSG:2056',
    '+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 ' +
        '+x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs'
);
register(proj4);

const Bern = fromLonLat([7.4475, 46.948056], 'EPSG:2056');
export default function WMTS(): JSX.Element {
    const [info, setInfo] = React.useState('...retrieving capabilities..');
    const [format, setFormat] = React.useState<string | null>(null);
    return (
        <>
            <RMap
                width={'100%'}
                height={'60vh'}
                projection='EPSG:2056'
                initial={{center: Bern, zoom: 12}}
            >
                <RLayerWMTS
                    zIndex={5}
                    projection='EPSG:2056'
                    onCapabilities={function (opt) {
                        setInfo('Map is ready, format is');
                        setFormat(opt.format);
                    }}
                    url='https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml'
                    layer='ch.swisstopo.pixelkarte-farbe'
                />
            </RMap>
            <div className='border round my-1 p-1'>
                {info}
                {format && <em className='ms-1'>{format}</em>}
            </div>
        </>
    );
}
