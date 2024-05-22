import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Polygon, Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, RPopup} from 'rlayers';
import {RStyle, RIcon, RFill, RStroke} from 'rlayers/style';

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
    const popup = React.useRef<RPopup>();
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat(coords.origin), zoom: 11}}>
                <ROSM />
                <RLayerVector zIndex={10}>
                    <RFeature geometry={new Point(fromLonLat(coords.ArcDeTriomphe))}>
                        <RStyle>
                            <RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                        </RStyle>
                        <RPopup ref={popup} trigger={'click'} className='example-overlay'>
                            <div className='card'>
                                <p className='card-header'>
                                    <strong>Arc de Triomphe</strong>
                                </p>
                                <p className='card-body text-center'>Popup on click</p>
                            </div>
                        </RPopup>
                    </RFeature>
                    <RFeature
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
                        <RStyle>
                            <RStroke color='yellow' width={4} />
                            <RFill color='transparent' />
                        </RStyle>
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
            <div>Control programmatically:</div>
            <div>
                <button className='btn btn-primary m-1' onClick={() => popup.current.hide()}>
                    Hide Arc de Triomphe
                </button>
                <button className='btn btn-primary m-1' onClick={() => popup.current.show()}>
                    Show Arc de Triomphe
                </button>
            </div>
        </React.Fragment>
    );
}
