import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import IGC from 'ol/format/IGC';
import {StyleLike} from 'ol/style/Style';
import {Style, Stroke, Circle, Fill} from 'ol/style';
import {Vector as OLLayerVector} from 'ol/layer';
import {getVectorContext} from 'ol/render';
import {ProgressBar} from 'react-bootstrap';

import {Map, LayerTile, LayerVector, Feature, MapBrowserEvent} from 'react-layers';

import ClementLatour from '!!raw-loader!./data/igc/Clement-Latour.igc';
import DamienDeBaenst from '!!raw-loader!./data/igc/Damien-de-Baenst.igc';
import SylvainDhonneur from '!!raw-loader!./data/igc/Sylvain-Dhonneur.igc';
import TomPayne from '!!raw-loader!./data/igc/Tom-Payne.igc';
import UlrichPrinz from '!!raw-loader!./data/igc/Ulrich-Prinz.igc';

const igcs = [ClementLatour, DamienDeBaenst, SylvainDhonneur, TomPayne, UlrichPrinz];

const styles: Record<string, Style> = {
    blueContours: new Style({
        stroke: new Stroke({color: '#007bff', width: 3}),
        fill: new Fill({color: 'transparent'})
    }),
    yellowCircle: new Style({
        image: new Circle({
            stroke: new Stroke({color: 'yellow', width: 2}),
            radius: 6
        })
    })
};

// This is a performance optimization: it avoids re-rendering the map when the state changes
const MapComp = React.memo(function _MapComp(props: {setTime: (string) => void}) {
    return (
        <Map
            className='example-map'
            center={fromLonLat([0, 50])}
            zoom={5}
            onPointerMove={useCallback(
                (e: MapBrowserEvent) => {
                    const layer = e.map
                        .getLayers()
                        .getArray()
                        .find((l) => l.get('id') === 'igc');
                    const source = (layer as OLLayerVector).getSource();
                    const feature = source.getClosestFeatureToCoordinate(e.coordinate);
                    const point = feature.getGeometry().getClosestPoint(e.coordinate);
                    const date = new Date(point[2] * 1000);
                    props.setTime(feature.get('PLT') + '<br>(' + date.toUTCString() + ')');
                },
                [props]
            )}
        >
            <LayerTile
                zIndex={5}
                url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
            />
            <LayerVector style={styles.blueContours} zIndex={10} properties={{id: 'igc'}}>
                {igcs.map((igc, i) => (
                    <Feature
                        key={i}
                        feature={
                            new IGC().readFeatures(igc, {
                                featureProjection: 'EPSG:3857'
                            })[0]
                        }
                    />
                ))}
            </LayerVector>
        </Map>
    );
});

// This part is re-rendered on every pointermove
export default function IGCComp(): JSX.Element {
    const [time, setTime] = React.useState('');
    return (
        <React.Fragment>
            <MapComp setTime={setTime} />
            <div className='d-flex flex-row mb-3 align-items-center'>
                <div
                    className='jumbotron py-1 px-3 m-0 mr-3 w-50'
                    dangerouslySetInnerHTML={{__html: time}}
                />
                <div className='w-50'>
                    <ProgressBar now={60} />
                </div>
            </div>
        </React.Fragment>
    );
}
