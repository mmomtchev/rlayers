import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Style, Fill, Stroke, Icon} from 'ol/style';
import {Polygon, Point} from 'ol/geom';
import {RMap, ROSM, RLayerVector, RFeature, RPopup, RStyle} from 'react-layers';
import locationIcon from './svg/location.svg';

const coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737],
    PlaceDItalie: [2.355, 48.831],
    Bastille: [2.369, 48.853],
    TourEiffel: [2.294, 48.858],
    Montmartre: [2.342, 48.887]
};

export default function Popups(): JSX.Element {
    const styles = {
        yellow: React.useRef() as RStyle.RStyleRef,
        location: React.useRef() as RStyle.RStyleRef
    };
    return (
        <RMap className='example-map' center={fromLonLat(coords.origin)} zoom={11}>
            <RStyle.RStyle ref={styles.location}>
                <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
            </RStyle.RStyle>
            <RStyle.RStyle ref={styles.yellow}>
                <RStyle.RStroke color='yellow' width={4} />
                <RStyle.RFill color='transparent' />
            </RStyle.RStyle>
            <ROSM />
            <RLayerVector zIndex={10}>
                <RFeature
                    style={styles.location}
                    geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}
                >
                    <RPopup trigger={'click'} className='example-overlay'>
                        <div className='card'>
                            <p className='card-header'>
                                <strong>Arc de Triomphe</strong>
                            </p>
                            <p className='card-body text-center'>Popup on click</p>
                        </div>
                    </RPopup>
                </RFeature>
                <RFeature
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
                    <RPopup trigger={'hover'} className='example-overlay'>
                        <p>
                            <strong>Les catacombes</strong>
                        </p>
                        <p>
                            <em>Popup on hover, pan on click</em>
                        </p>
                    </RPopup>
                </RFeature>
            </RLayerVector>
        </RMap>
    );
}
