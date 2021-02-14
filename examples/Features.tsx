import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';

import {RMap, ROSM, RLayerVector, RStyle, MapBrowserEvent} from 'react-layers';

import geojsonFeatures from './data/geo.json';

export default function Features(): JSX.Element {
    const [flow, setFlow] = React.useState([]);
    const styles = {
        blueDot: RStyle.useRStyle(),
        blueContours: RStyle.useRStyle()
    };
    return (
        <div className='d-flex flex-row'>
            <RStyle.RStyle ref={styles.blueContours}>
                <RStyle.RStroke color='#007bff' width={3} />
                <RStyle.RFill color='transparent' />
            </RStyle.RStyle>
            <RStyle.RStyle ref={styles.blueDot}>
                <RStyle.RCircle radius={5}>
                    <RStyle.RFill color='blue' />
                </RStyle.RCircle>
            </RStyle.RStyle>
            <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
                <ROSM />
                {/* From a static file included at bundling time */}
                <RLayerVector
                    style={styles.blueDot}
                    zIndex={10}
                    features={new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(
                        geojsonFeatures
                    )}
                    onClick={useCallback(
                        (e: MapBrowserEvent) => {
                            setFlow([...flow, e.target.get('en')].slice(-16));
                        },
                        [flow]
                    )}
                />
                {/* From an URL */}
                <RLayerVector
                    style={styles.blueContours}
                    zIndex={5}
                    format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                    url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
                    onPointerEnter={useCallback(
                        (e: MapBrowserEvent) => {
                            setFlow([...flow, 'Entering ' + e.target.get('nom')].slice(-16));
                        },
                        [flow]
                    )}
                />
            </RMap>
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
