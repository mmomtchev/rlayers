import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {StyleLike} from 'ol/style/Style';
import {Style, Fill, Stroke, Icon} from 'ol/style';
import {Polygon, Point} from 'ol/geom';
import {Map, OSM, LayerVector, Feature, Popup} from 'react-layers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriumphe: [2.295, 48.8737],
    PlaceDItalie: [2.355, 48.831],
    Bastille: [2.369, 48.853],
    TourEiffel: [2.294, 48.858],
    Montmartre: [2.342, 48.887]
};

const styles: Record<string, StyleLike> = {
    yellow: new Style({
        stroke: new Stroke({color: 'yellow', width: 4}),
        fill: new Fill({color: 'transparent'})
    }),
    location: new Style({
        image: new Icon({
            src: locationIcon,
            anchor: [0.5, 0.8]
        })
    })
};

export default function Popups(): JSX.Element {
    return (
        <Map className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
            <OSM />
            <LayerVector zIndex={10}>
                <Feature
                    style={styles.location}
                    geometry={new Point(fromLonLat(coords.ArcDeTriumphe))}
                >
                    <Popup trigger={'click'} className='example-overlay'>
                        <div className='card'>
                            <p className='card-header'>
                                <strong>Arc de Triomphe</strong>
                            </p>
                            <p className='card-body text-center'>Popup on click</p>
                        </div>
                    </Popup>
                </Feature>
                <Feature
                    style={styles.yellow}
                    geometry={
                        new Polygon([
                            [
                                fromLonLat(coords.PlaceDItalie),
                                fromLonLat(coords.Bastille),
                                fromLonLat(coords.TourEiffel),
                                fromLonLat(coords.PlaceDItalie)
                            ]
                        ])
                    }
                    onClick={useCallback(
                        (e) =>
                            e.map.getView().fit(e.target.getGeometry().getExtent(), {
                                duration: 250
                            }),
                        []
                    )}
                >
                    <Popup trigger={'hover'} className='example-overlay'>
                        <p>
                            <strong>Les catacombes</strong>
                        </p>
                        <p>
                            <em>Popup on hover, pan on click</em>
                        </p>
                    </Popup>
                </Feature>
            </LayerVector>
        </Map>
    );
}
