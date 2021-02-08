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
import {Style, Stroke, Circle, Fill} from 'ol/style';
import {Vector as OLLayerVector} from 'ol/layer';
import {Feature as OLFeature} from 'ol';
import {getVectorContext} from 'ol/render';
import {LineString, Point} from 'ol/geom';

import {
    Map,
    LayerTile,
    LayerVector,
    Feature,
    RenderEvent,
    MapBrowserEvent,
    VectorSourceEvent
} from 'react-layers';

import ClementLatour from '!!file-loader!./data/igc/Clement-Latour.igc';
import DamienDeBaenst from '!!file-loader!./data/igc/Damien-de-Baenst.igc';
import SylvainDhonneur from '!!file-loader!./data/igc/Sylvain-Dhonneur.igc';
import TomPayne from '!!file-loader!./data/igc/Tom-Payne.igc';
import UlrichPrinz from '!!file-loader!./data/igc/Ulrich-Prinz.igc';

type InputFormEventType = React.FormEvent<HTMLInputElement>;

const igcsDesc = [
    {c: 'rgba(0, 0, 255, 0.7)', i: ClementLatour},
    {c: 'rgba(0, 215, 255, 0.7)', i: DamienDeBaenst},
    {c: 'rgba(0, 165, 255, 0.7)', i: SylvainDhonneur},
    {c: 'rgba(0, 255, 255, 0.7)', i: TomPayne},
    {c: 'rgba(0, 215, 255, 0.7)', i: UlrichPrinz}
];

// Don't even think about creating styles dynamically
const contours = (c: string) =>
    new Style({
        stroke: new Stroke({color: c, width: 3}),
        fill: new Fill({color: 'transparent'})
    });
const redCircle = new Style({
    stroke: new Stroke({color: 'red', width: 1}),
    image: new Circle({
        stroke: new Stroke({color: 'red', width: 2}),
        radius: 6
    })
});
const blueCircle = new Style({
    image: new Circle({
        stroke: new Stroke({color: 'blue', width: 2}),
        radius: 6
    })
});

// A constant avoids re-rendering of the component
// a property initialied with an anonymous object is not constant
// it will recreate a new instance at every evaluation
const origin = fromLonLat([6, 45.7]);

// This part is re-rendered on every pointermove
export default function IGCComp(): JSX.Element {
    const [time, setTime] = React.useState('');
    const [point, setPoint] = React.useState(null as Point);
    const [line, setLine] = React.useState(null as LineString);
    const [slider, setSlider] = React.useState(0);
    const [flight, setFlight] = React.useState({
        start: Infinity,
        stop: -Infinity,
        duration: 0
    });
    const [igcs, setIgcs] = React.useState(() => {
        Promise.all(igcsDesc.map((i) => fetch(i.i).then((r) => r.text()))).then((r) => setIgcs(r));
        return [];
    });

    // createRef insted of useRef here will severely impact performance
    const igcVectorLayer = React.useRef() as React.RefObject<LayerVector>;
    const map = React.useRef() as React.RefObject<Map>;

    return (
        <React.Fragment>
            <Map
                className='example-map'
                center={origin}
                zoom={9}
                ref={map}
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
                <LayerTile
                    zIndex={5}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <LayerVector
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
                            vectorContext.setStyle(redCircle);
                            if (point && line) {
                                vectorContext.drawGeometry(point);
                                vectorContext.drawGeometry(line);
                            }
                        },
                        [point, line]
                    )}
                >
                    {React.useMemo(
                        () => (
                            // This component appears dynamic to React because of the map but it is in fact constant
                            // useMemo will render it truly constant
                            <React.Fragment>
                                {igcs.map((igc, idx) => (
                                    <Feature
                                        key={idx}
                                        feature={
                                            new IGC().readFeatures(igc, {
                                                featureProjection: 'EPSG:3857'
                                            })[0]
                                        }
                                        style={contours(igcsDesc[idx].c)}
                                    />
                                ))}
                            </React.Fragment>
                        ),
                        [igcs]
                    )}
                </LayerVector>
            </Map>
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
                            (e: InputFormEventType) => {
                                const value = parseInt(e.currentTarget.value);
                                setSlider(value);
                                const source = igcVectorLayer.current.source;
                                const m = flight.start + (flight.duration * value) / 100;
                                source.forEachFeature((feature) => {
                                    if (!feature.get('PLT')) return;
                                    const geometry = feature.getGeometry() as LineString;
                                    const coords = geometry.getCoordinateAtM(m, true);
                                    let highlight = feature.get('highlight');
                                    if (highlight === undefined) {
                                        highlight = new OLFeature({
                                            geometry: new Point(coords),
                                            style: blueCircle
                                        });
                                        feature.set('highlight', highlight);
                                        igcVectorLayer.current.source.addFeature(highlight);
                                    } else {
                                        highlight.getGeometry().setCoordinates(coords);
                                    }
                                });
                                map.current.ol.render();
                            },
                            [igcVectorLayer, flight, map]
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
