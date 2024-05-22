import React, {useCallback} from 'react';
import {Feature} from 'ol';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Point} from 'ol/geom';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RStyle} from 'rlayers';

/**
 * Including data from a static file included at bundling time
 * webpack will do everything necessary
 * (this won't work in CodePen)
 */
import geojsonFeatures from './data/geo.json';

export default function Features(): JSX.Element {
    const [flow, setFlow] = React.useState([]);
    return (
        <div className='d-flex flex-row'>
            <RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 11}}>
                <ROSM />
                {/* When using TypeScript you can (optionally) specify the type of the features */}
                <RLayerVector<Feature<Point>>
                    zIndex={10}
                    /* Input data will have to be typed too */
                    features={
                        new GeoJSON({
                            featureProjection: 'EPSG:3857',
                            featureClass: Feature
                        }).readFeatures(geojsonFeatures) as Feature<Point>[]
                    }
                    /* The type will be propagated to all callbacks */
                    onClick={useCallback(
                        (e) => {
                            setFlow([...flow, e.target.get('en')].slice(-16));
                        },
                        [flow]
                    )}
                >
                    <RStyle.RStyle>
                        <RStyle.RCircle radius={5}>
                            <RStyle.RFill color='blue' />
                        </RStyle.RCircle>
                    </RStyle.RStyle>
                </RLayerVector>
                {/* Without any type, the features will be assumed to be a of a generic Geometry type */}
                <RLayerVector
                    zIndex={5}
                    /**
                     * This layer will be getting its data from an URL, do not forget that in
                     * OpenLayers 9.2 the format parsers now return RenderFeature by default unless
                     * featureClass is explicitly specified
                     */
                    format={new GeoJSON({featureProjection: 'EPSG:3857', featureClass: Feature})}
                    url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
                    onPointerEnter={useCallback(
                        (e) => {
                            setFlow([...flow, 'Entering ' + e.target.get('nom')].slice(-16));
                        },
                        [flow]
                    )}
                >
                    <RStyle.RStyle>
                        <RStyle.RStroke color='#007bff' width={3} />
                        <RStyle.RFill color='transparent' />
                    </RStyle.RStyle>
                </RLayerVector>
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
