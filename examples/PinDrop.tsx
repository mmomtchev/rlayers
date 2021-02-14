import React, {useCallback} from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'react-layers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    Montmartre: [2.342, 48.887]
};

export default function PinDrop(): JSX.Element {
    const [loc, setLoc] = React.useState(coords.Montmartre);
    const location = RStyle.useRStyle();
    return (
        <React.Fragment>
            <RStyle.RStyle ref={location}>
                <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <RMap className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        style={location}
                        geometry={new Point(fromLonLat(loc))}
                        // useCallback is here for performance reasons
                        // without it RFeature will have its props updated at every call
                        onPointerDrag={useCallback((e) => {
                            const coords = e.map.getCoordinateFromPixel(e.pixel);
                            e.target.setGeometry(new Point(coords));
                            e.preventDefault();
                        }, [])}
                        onPointerDragEnd={useCallback((e) => {
                            const coords = e.map.getCoordinateFromPixel(e.pixel);
                            setLoc(toLonLat(coords));
                        }, [])}
                        onPointerEnter={useCallback(
                            (e) => (e.map.getTargetElement().style.cursor = 'move') && undefined,
                            []
                        )}
                        onPointerLeave={useCallback(
                            (e) => (e.map.getTargetElement().style.cursor = 'initial') && undefined,
                            []
                        )}
                    >
                        <ROverlay className='example-overlay'>Move me</ROverlay>
                    </RFeature>
                </RLayerVector>
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow'>
                <p>
                    Pin location is <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
