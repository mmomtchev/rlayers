import React, {JSX} from 'react';
import {fromLonLat} from 'ol/proj';
import {FeatureLike} from 'ol/Feature';
import {Style} from 'ol/style';
import 'ol/ol.css';

import {RMap} from 'rlayers';
import RLayerVectorMBTiles from 'rlayers/layer/RLayerVectorMBTiles';

import * as style from './style';

// This is an example for rendering directly from a remote MBTiles source over HTTP
// It uses the `ol-mbtiles` plugin which you must install separately:
//
// npm install ol-mbtiles
//
// Be sure to check its documentation for more information:
// https://github.com/mmomtchev/ol-mbtiles

export default function MBTiles(): JSX.Element {
    return (
        <div>
            <RMap
                width={'100%'}
                height={'60vh'}
                initial={{center: fromLonLat([2.364, 48.82]), zoom: 9}}
            >
                <RLayerVectorMBTiles
                    url={'https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles'}
                    layers={['transportation', 'water', 'waterway', 'landuse', 'place', 'boundary']}
                    style={function (feature: FeatureLike): Style {
                        switch (feature.get('layer')) {
                            case 'water':
                            case 'waterway':
                                return style.waterStyle;
                            case 'transportation':
                                return style.roadStyle(feature);
                            case 'landuse':
                                return style.buildingStyle;
                            case 'boundary':
                                return style.boundaryStyle;
                            case 'place':
                                return style.placeStyle(feature);
                            default:
                                return null as unknown as Style;
                        }
                    }}
                />
            </RMap>
            <p>
                The data comes from a huge 30GB <code>.mbtiles</code> file and initial loading times
                may be slow due to the CDN provider not keeping it in its cache
            </p>
        </div>
    );
}
