import React, {JSX} from 'react';
import {fromLonLat} from 'ol/proj';
import {Geometry, Point} from 'ol/geom';
import {Geolocation as OLGeoLoc} from 'ol';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature, RGeolocation, RStyle, useOL} from 'rlayers';
import locationIcon from './svg/location.svg';

function GeolocComp(): JSX.Element {
    const [pos, setPos] = React.useState(new Point(fromLonLat([0, 0])));
    const [accuracy, setAccuracy] = React.useState(undefined as Geometry | undefined);
    // Low-level access to the OpenLayers API
    const {map} = useOL();

    return (
        <>
            <RGeolocation
                tracking={true}
                trackingOptions={{enableHighAccuracy: true}}
                onChange={React.useCallback(
                    (e) => {
                        const geoloc = e.target as OLGeoLoc;
                        setPos(new Point(geoloc.getPosition()));
                        setAccuracy(geoloc.getAccuracyGeometry());

                        map.getView().fit(geoloc.getAccuracyGeometry(), {
                            duration: 250,
                            maxZoom: 15
                        });
                    },
                    [map]
                )}
            />
            <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={locationIcon} anchor={[0.5, 0.8]} />
                    <RStyle.RStroke color={'#007bff'} width={3} />
                </RStyle.RStyle>
                <RFeature geometry={pos}></RFeature>
                <RFeature geometry={accuracy}></RFeature>
            </RLayerVector>
        </>
    );
}

export default function Geolocation(): JSX.Element {
    return (
        <RMap className='example-map' initial={{center: fromLonLat([0, 0]), zoom: 4}}>
            <ROSM />
            <GeolocComp />
        </RMap>
    );
}
