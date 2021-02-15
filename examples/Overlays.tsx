import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'reactlayers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737]
};

export default function Overlays(): JSX.Element {
    const style = RStyle.useRStyle();
    return (
        <RMap className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
            <RStyle.RStyle ref={style}>
                <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <ROSM />
            <RLayerVector zIndex={10}>
                <RFeature
                    style={style}
                    geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
                    onClick={useCallback(
                        (e) =>
                            e.map.getView().fit(e.target.getGeometry().getExtent(), {
                                duration: 250,
                                maxZoom: 15
                            }),
                        []
                    )}
                >
                    <ROverlay className='example-overlay'>
                        Arc de Triomphe
                        <br />
                        <em>click to zoom</em>
                    </ROverlay>
                </RFeature>
            </RLayerVector>
        </RMap>
    );
}
