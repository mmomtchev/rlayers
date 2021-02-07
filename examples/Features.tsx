import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {StyleLike} from 'ol/style/Style';
import {Style, Stroke, Circle, Fill} from 'ol/style';
import {Map, OSM, LayerVector, MapBrowserEvent} from 'react-layers';
import geojsonFeatures from './geo.json';

const styles: Record<string, StyleLike> = {
    blueContours: new Style({
        stroke: new Stroke({color: '#007bff', width: 3}),
        fill: new Fill({color: 'transparent'})
    }),
    blueDot: new Style({
        image: new Circle({
            radius: 5,
            fill: new Fill({color: 'blue'})
        })
    })
};

export default function Features(): JSX.Element {
    const [flow, setFlow] = React.useState([]);
    return (
        <div className='d-flex flex-row'>
            <Map className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
                <OSM />
                {/* From a static file included at bundling time */}
                <LayerVector
                    style={styles.blueDot}
                    zIndex={10}
                    features={new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(
                        geojsonFeatures
                    )}
                    onClick={useCallback(
                        (e: MapBrowserEvent) => {
                            setFlow([...flow, e.target.getProperties().en].slice(-16));
                        },
                        [flow]
                    )}
                />
                {/* From an URL */}
                <LayerVector
                    style={styles.blueContours}
                    zIndex={5}
                    format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                    url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
                    onPointerEnter={useCallback(
                        (e: MapBrowserEvent) => {
                            setFlow(
                                [...flow, 'Entering ' + e.target.getProperties().nom].slice(-16)
                            );
                        },
                        [flow]
                    )}
                />
            </Map>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow example-list'>
                <p>Your actions</p>
                <ul
                    dangerouslySetInnerHTML={{
                        __html: flow.map((p) => `<li className="m-0">${p}</li>`).join('')
                    }}
                />
            </div>
        </div>
    );
}
