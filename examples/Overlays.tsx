import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Geometry, Point} from 'ol/geom';
import {Feature} from 'ol';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737]
};

export default function Overlays(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat(coords.origin), zoom: 11}}>
            <ROSM />
            <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                </RStyle.RStyle>
                <RFeature
                    geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
                    onClick={(e) =>
                        e.map
                            .getView()
                            .fit((e.target as Feature<Geometry>).getGeometry().getExtent(), {
                                duration: 250,
                                maxZoom: 15
                            })
                    }
                >
                    <ROverlay className='example-overlay'>
                        Arc de Triomphe
                        <br />
                        <em>&#11017; click to zoom</em>
                    </ROverlay>
                </RFeature>
            </RLayerVector>
        </RMap>
    );
}
