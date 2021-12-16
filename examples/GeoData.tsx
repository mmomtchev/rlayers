import React, {useCallback, useMemo} from 'react';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import {Geometry} from 'ol/geom';
import 'ol/ol.css';

import {RMap, RLayerVector, RStyle, RFeature, ROverlay, RLayerStamen} from 'rlayers';

// These are the French internal administrative borders in GeoJSON format
const departements =
    'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson';
const parser = new GeoJSON({featureProjection: 'EPSG:3857'});
// Population by French administrative division
// https://public.opendatasoft.com/explore/dataset/population-francaise-par-departement-2018/
// Published under Etalab Open License https://www.etalab.gouv.fr/wp-content/uploads/2018/11/open-licence.pdf
const inputData =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=population-francaise-par-departement-2018&q=&rows=200';
type inputDataType = {records: {fields: {code_departement: string; population: number}}[]};
const fetchData = fetch(inputData).then((raw) => raw.json() as Promise<inputDataType>);
const getData = (data: inputDataType, dep: string) =>
    data.records.find((el) => el.fields.code_departement === dep)?.fields.population ?? 0;
// The default hitbox around the features is 3px wide making narrow gaps between the borders difficult to select
RFeature.hitTolerance = 0;

export default function GeoData(): JSX.Element {
    const [data, setData] = React.useState({records: []} as inputDataType);
    const [current, setCurrent] = React.useState(null as Feature<Geometry> | null);
    React.useEffect(() => {
        fetchData.then((r) => setData(r));
    }, []);
    return (
        <div className='d-flex flex-row'>
            <RMap
                className='example-map'
                initial={useMemo(() => ({center: fromLonLat([2, 46.5]), zoom: 5.75}), [])}
                noDefaultControls={true}
                noDefaultInteractions={true}
            >
                <RLayerStamen layer='toner' />

                {/* This the internal borders layer, initialized with the GeoJSON
                 * useCallback is a performance optimization, it allows to always have
                 * the same function object unless 'current' changes
                 * without it you will create a new function at every frame rendered */}
                <RLayerVector
                    zIndex={5}
                    format={parser}
                    url={departements}
                    onPointerEnter={useCallback((e) => setCurrent(e.target), [])}
                    onPointerLeave={useCallback(
                        (e) => current === e.target && setCurrent(null),
                        [current]
                    )}
                >
                    {/* When styling each feature, compute the color from the population data
                     * The function is memoized and it is replaced only once - when the population data
                     * becomes available. Without memoization (useCallback) all the features will need to
                     * be re-evaluated at every frame */}
                    <RStyle.RStyle
                        render={useCallback(
                            (f) => (
                                <RStyle.RFill
                                    color={`rgba(0, 0, ${
                                        getData(data, f.get('code')) / 5000
                                    }, 0.75)`}
                                />
                            ),
                            [data]
                        )}
                    />
                </RLayerVector>
                {/* This is a layer with a single feature - current - that holds the highlighted borders
                 * It is styled with the default OpenLayers style */}
                <RLayerVector zIndex={10}>
                    {current ? (
                        <div>
                            <RFeature geometry={current.getGeometry()}>
                                <ROverlay className='example-overlay' autoPosition={true}>
                                    Population in <strong>{current.get('nom')}</strong> in 2018 is{' '}
                                    <strong>{getData(data, current.get('code'))}</strong>
                                </ROverlay>
                            </RFeature>
                        </div>
                    ) : null}
                </RLayerVector>
            </RMap>
        </div>
    );
}
