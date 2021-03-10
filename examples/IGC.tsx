/* This example reimplements the excellent OpenLayers example by @twpayne
 * from https://openlayers.org/en/latest/examples/igc.html
 * It illustrates various techniques that can be used to greatly improve performance
 *
 * React makes creating complex web applications very easy
 * It also makes very easy writing terribly inefficient code
 * You can get away with it when your DOM is not too complex
 * But when dealing with a canvas-drawn map, every care must be
 * taken to avoid unnecessary re-rendering
 */

import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import IGC from 'ol/format/IGC';
import {getVectorContext} from 'ol/render';
import {LineString, Point} from 'ol/geom';

import {
    RMap,
    RLayerTile,
    RLayerVector,
    RFeature,
    RenderEvent,
    MapBrowserEvent,
    VectorSourceEvent
} from 'rlayers';
import {RStyle, RStroke, RFill, RCircle, useRStyle} from 'rlayers/style';
import 'ol/ol.css';

import ClementLatour from '!!file-loader!./data/igc/Clement-Latour.igc';
import DamienDeBaenst from '!!file-loader!./data/igc/Damien-de-Baenst.igc';
import SylvainDhonneur from '!!file-loader!./data/igc/Sylvain-Dhonneur.igc';
import TomPayne from '!!file-loader!./data/igc/Tom-Payne.igc';
import UlrichPrinz from '!!file-loader!./data/igc/Ulrich-Prinz.igc';

type InputFormEventType = React.FormEvent<HTMLInputElement>;

const igcsDesc = [
    {c: 'rgba(0, 0, 250, 0.7)', i: ClementLatour},
    {c: 'rgba(0, 50, 200, 0.7)', i: DamienDeBaenst},
    {c: 'rgba(0, 100, 150, 0.7)', i: SylvainDhonneur},
    {c: 'rgba(0, 150, 200, 0.7)', i: TomPayne},
    {c: 'rgba(0, 200, 50, 0.7)', i: UlrichPrinz}
];

// A constant avoids re-rendering of the component
// a property initialized with an anonymous object is not constant
// it will recreate a new instance at every evaluation
const origin = fromLonLat([6, 45.7]);

// This part is re-rendered on every pointermove
export default function IGCComp(): JSX.Element {
    const [time, setTime] = React.useState('');
    const [point, setPoint] = React.useState(null as Point);
    const [line, setLine] = React.useState(null as LineString);
    const [slider, setSlider] = React.useState(0);
    const [highlights, setHighlights] = React.useState([]);
    const [flight, setFlight] = React.useState({
        start: Infinity,
        stop: -Infinity,
        duration: 0
    });
    const [igcs, setIgcs] = React.useState(() => {
        Promise.all(igcsDesc.map((i) => fetch(i.i).then((r) => r.text()))).then((r) => setIgcs(r));
        return [];
    });

    const styles = {
        redCircle: useRStyle(),
        blueCircle: useRStyle(),
        // This is a technique for an array of React.RefObjects
        // It is ugly but it works
        flightPath: React.useRef([]) as React.RefObject<RStyle[]>
    };

    // createRef insted of useRef here will severely impact performance
    const igcVectorLayer = React.useRef() as React.RefObject<RLayerVector>;
    const highlightVectorLayer = React.useRef() as React.RefObject<RLayerVector>;

    return (
        <React.Fragment>
            {React.useMemo(
                // This is not a dynamic RStyle, these are 5 static RStyle's
                // Thus the useMemo
                () =>
                    igcsDesc.map((igc, idx) => (
                        <RStyle key={idx} ref={(el) => (styles.flightPath.current[idx] = el)}>
                            <RStroke color={igc.c} width={3} />
                        </RStyle>
                    )),
                [styles.flightPath]
            )}
            <RStyle ref={styles.redCircle}>
                <RStroke color='red' width={1} />
                <RCircle radius={6}>
                    <RFill color='red' />
                </RCircle>
            </RStyle>
            <RStyle ref={styles.blueCircle}>
                <RCircle radius={6}>
                    <RFill color='blue' />
                </RCircle>
            </RStyle>
            <RMap
                className='example-map'
                center={origin}
                zoom={9}
                onPointerMove={useCallback(
                    (e: MapBrowserEvent) => {
                        // This useCallback is very important -> without it
                        // onPointerMove will be a new anonymous function on every render
                        const source = igcVectorLayer.current.source;
                        const feature = source.getClosestFeatureToCoordinate(e.coordinate);
                        const point = feature.getGeometry().getClosestPoint(e.coordinate);
                        const date = new Date(point[2] * 1000);
                        setPoint(new Point(point));
                        setLine(new LineString([e.coordinate, [point[0], point[1]]]));
                        setTime(
                            '<strong>' +
                                feature.get('PLT') +
                                '</strong><br><em>' +
                                date.toUTCString() +
                                '</em>'
                        );
                        e.map.render();
                    },
                    [igcVectorLayer]
                )}
            >
                <RLayerTile
                    zIndex={5}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <RLayerVector
                    zIndex={10}
                    ref={igcVectorLayer}
                    onAddFeature={useCallback(
                        // This useCallback transforms this function to a constant value
                        // None of its dependencies change after initialization
                        (e: VectorSourceEvent) => {
                            const geometry = e.feature.getGeometry() as LineString;
                            flight.start = Math.min(flight.start, geometry.getFirstCoordinate()[2]);
                            flight.stop = Math.max(flight.stop, geometry.getLastCoordinate()[2]);
                            flight.duration = flight.stop - flight.start;
                            setFlight({...flight});
                        },
                        [flight]
                    )}
                    onPostRender={useCallback(
                        // This useCallback is less efficient than the previous one
                        // as it depends on the state
                        // LayerVector is re-rendered every time point/line change
                        (e: RenderEvent) => {
                            const vectorContext = getVectorContext(e);
                            vectorContext.setStyle(RStyle.getStyleStatic(styles.redCircle));
                            if (point && line) {
                                vectorContext.drawGeometry(point);
                                vectorContext.drawGeometry(line);
                            }
                        },
                        [point, line, styles.redCircle]
                    )}
                >
                    {React.useMemo(
                        () => (
                            // This component appears dynamic to React because of the map but it is in fact constant
                            // useMemo will render it truly constant
                            <React.Fragment>
                                {igcs.map((igc, idx) => (
                                    <RFeature
                                        key={idx}
                                        feature={
                                            new IGC().readFeatures(igc, {
                                                featureProjection: 'EPSG:3857'
                                            })[0]
                                        }
                                        style={styles.flightPath.current[idx]}
                                    />
                                ))}
                            </React.Fragment>
                        ),
                        // The array trick renders it impossible for React to track the useMemo dependencies
                        // -> we do it manually
                        // eslint-disable-next-line react-hooks/exhaustive-deps
                        [igcs, styles.flightPath, styles.flightPath.current[0]]
                    )}
                </RLayerVector>
                <RLayerVector zIndex={10} ref={highlightVectorLayer} style={styles.blueCircle}>
                    {React.useMemo(
                        () => (
                            // This component appears dynamic to React because of the map but it is in fact constant
                            // useMemo will render it truly constant
                            <React.Fragment>
                                {highlights.map((coords, i) => (
                                    <RFeature key={i} geometry={new Point(coords)} />
                                ))}
                            </React.Fragment>
                        ),
                        [highlights]
                    )}
                </RLayerVector>
            </RMap>
            <div className='d-flex flex-row mb-3 align-items-center'>
                <div
                    className='jumbotron py-1 px-3 m-0 mr-3 w-50'
                    dangerouslySetInnerHTML={{__html: time}}
                />
                <div className='w-50'>
                    <input
                        type='range'
                        className='range-slider range-slider--primary w-100'
                        min='0'
                        max='100'
                        value={slider}
                        onChange={useCallback(
                            // This useCallback transforms this function to a constant value
                            // None of its dependencies change after initialization
                            // A normal function instead of an arrow lambda allows to access
                            // the context in this
                            function (e: InputFormEventType) {
                                const value = parseInt(e.currentTarget.value);
                                setSlider(value);
                                const source = igcVectorLayer.current.source;
                                const m = flight.start + (flight.duration * value) / 100;
                                const newHighlights = [];
                                source.forEachFeature((feature) => {
                                    if (!feature.get('PLT')) return;
                                    const geometry = feature.getGeometry() as LineString;
                                    const coords = geometry.getCoordinateAtM(m, true);
                                    newHighlights.push(coords);
                                });
                                setHighlights(newHighlights);
                                this.context.map.render();
                            },
                            [igcVectorLayer, flight]
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
