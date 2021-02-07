import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {StyleLike} from 'ol/style/Style';
import {Style, Icon} from 'ol/style';
import {Point} from 'ol/geom';
import {Map, OSM, LayerVector, Feature, Overlay} from 'react-layers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737]
};

const styles: Record<string, StyleLike> = {
    location: new Style({
        image: new Icon({
            src: locationIcon,
            anchor: [0.5, 0.8]
        })
    })
};

export default function Overlays(): JSX.Element {
    return (
        <Map className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
            <OSM />
            <LayerVector zIndex={10}>
                <Feature
                    style={styles.location}
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
                    <Overlay className='example-overlay'>
                        Arc de Triomphe
                        <br />
                        <em>click to zoom</em>
                    </Overlay>
                </Feature>
            </LayerVector>
        </Map>
    );
}
