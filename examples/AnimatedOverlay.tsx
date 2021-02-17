import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import pacman from './svg/pacman.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737]
};

export default function AnimatedOverlay(): JSX.Element {
    return (
        <RMap className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
            <ROSM />
            <RLayerVector zIndex={10}>
                <RFeature geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}>
                    <ROverlay>
                        <img
                            src={pacman}
                            style={{
                                position: 'relative',
                                top: -24,
                                left: -24,
                                userSelect: 'none',
                                pointerEvents: 'none'
                            }}
                            width={48}
                            height={48}
                            alt='animated icon'
                        />
                    </ROverlay>
                </RFeature>
            </RLayerVector>
        </RMap>
    );
}
