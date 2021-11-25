import React from 'react';
import {fromLonLat, transform} from 'ol/proj';
import {LineString, Point} from 'ol/geom';
import {Feature} from 'ol';
import {Polyline as PolylineFormat} from 'ol/format';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RFeature} from 'rlayers';
import {RStyle, RCircle, RFill, RStroke} from 'rlayers/style';

function fillAddress(coords) {
    const coordsWGS = transform(coords, 'EPSG:3857', 'EPSG:4326');
    const URL = `http://nominatim.openstreetmap.org/reverse?format=json&lon=${coordsWGS[0]}&lat=${coordsWGS[1]}`;
    return fetch(URL)
        .then((r) => r.json())
        .then((data) => data.display_name);
}

const polyReader = new PolylineFormat();
function parseRoute(routes): LineString {
    if (routes.length > 0) {
        const f = polyReader.readFeature(routes[0].geometry);
        f.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        return f.getGeometry();
    }
    return null;
}

function buildRoute(start: Feature<Point>, finish: Feature<Point>): Promise<LineString> {
    const startCoords = transform(start.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');
    const finishCoords = transform(finish.getGeometry().getCoordinates(), 'EPSG:3857', 'EPSG:4326');

    const URL =
        'https://router.project-osrm.org/route/v1/driving/' +
        `${startCoords[0]},${startCoords[1]};${finishCoords[0]},${finishCoords[1]}`;
    return fetch(URL)
        .then((r) => r.json())
        .then((data) => parseRoute(data.routes));
}

export default function Routing(): JSX.Element {
    const [start] = React.useState(new Feature<Point>());
    const [finish] = React.useState(new Feature<Point>());
    enum Step {
        START,
        FINISH
    }
    const [step, setStep] = React.useState(Step.START);
    const [startAddress, setStartAddress] = React.useState('');
    const [finishAddress, setFinishAddress] = React.useState('');
    const [route] = React.useState(new Feature<LineString>());

    return (
        <React.Fragment>
            <RMap
                className='example-map'
                initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}
                onClick={(e) => {
                    const coords = e.map.getCoordinateFromPixel(e.pixel);
                    if (step === Step.START) {
                        start.setGeometry(new Point(coords));
                        setStep(Step.FINISH);
                        fillAddress(coords).then((address) => setStartAddress(address));
                        route.setGeometry(null);
                        setFinishAddress('');
                        finish.setGeometry(null);
                    } else {
                        finish.setGeometry(new Point(coords));
                        setStep(Step.START);
                        fillAddress(coords).then((address) => setFinishAddress(address));
                        buildRoute(start, finish).then((line) => route.setGeometry(line));
                    }
                }}
            >
                <ROSM />
                <RLayerVector>
                    <RStyle>
                        <RCircle radius={6}>
                            <RFill color='blue' />
                        </RCircle>
                    </RStyle>
                    <RFeature key={0} feature={start} />
                    <RFeature key={1} feature={finish} />
                </RLayerVector>
                <RLayerVector>
                    <RStyle>
                        <RStroke width={2} color='green' />
                    </RStyle>
                    <RFeature feature={route} />
                </RLayerVector>
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow'>
                <p>
                    <strong>Select {step === Step.START ? 'START' : 'FINISH'} point</strong>
                </p>
                <div className={'d-flex mt-2'}>
                    {startAddress.length == 0 ? null : (
                        <div>
                            <strong>From: </strong>
                            <em>{startAddress}</em>
                        </div>
                    )}
                    {finishAddress.length == 0 ? null : (
                        <div>
                            <strong>To: </strong>
                            <em>{finishAddress}</em>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
