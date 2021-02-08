import React, {useCallback} from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Style, Icon} from 'ol/style';
import {Point} from 'ol/geom';
import {Map, OSM, LayerVector, Feature, Overlay} from 'react-layers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    Montmartre: [2.342, 48.887]
};

const styles: Record<string, Style> = {
    location: new Style({
        image: new Icon({
            src: locationIcon,
            anchor: [0.5, 0.8]
        })
    })
};

export default function PinDrop(): JSX.Element {
    const [loc, setLoc] = React.useState(coords.Montmartre);
    return (
        <React.Fragment>
            <Map className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
                <OSM />
                <LayerVector>
                    <Feature
                        style={styles.location}
                        geometry={new Point(fromLonLat(loc))}
                        // useCallback is here for performance reasons
                        // without it Feature will have its props updated at every call
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
                        <Overlay className='example-overlay'>Move me</Overlay>
                    </Feature>
                </LayerVector>
            </Map>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow'>
                <p>
                    Pin location is <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
