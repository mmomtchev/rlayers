import React, {useCallback} from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Geometry, Point} from 'ol/geom';
import {Feature} from 'ol';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, ROverlay, RStyle} from 'rlayers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    Montmartre: [2.342, 48.887]
};

// This example is meant to illustrate the use of the various RFeature callbacks
// If you simply want to implement a translation interaction, the Interactions
// example has a method which handles the pointer movements internally
// with a much better performance
export default function PinDrop(): JSX.Element {
    const [loc, setLoc] = React.useState(coords.Montmartre);
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat(coords.origin), zoom: 11}}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        geometry={new Point(fromLonLat(loc))}
                        // useCallback is here for performance reasons
                        // without it RFeature will have its props updated at every call
                        onPointerDrag={useCallback((e) => {
                            const coords = e.map.getCoordinateFromPixel(e.pixel);
                            e.target.setGeometry(new Point(coords));
                            // this stops OpenLayers from interpreting the event to pan the map
                            e.preventDefault();
                            return false;
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
                        <RStyle.RStyle>
                            <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                        </RStyle.RStyle>
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
