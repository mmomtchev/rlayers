import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import 'ol/ol.css';

import {RMap, ROSM, RLayerVector, RStyle} from 'rlayers';

// These are the French internal administrative borders in GeoJSON format
const departements =
    'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson';
// Population by French administrative division
// https://public.opendatasoft.com/explore/dataset/population-francaise-par-departement-2018/
// Published under Etalab Open License https://www.etalab.gouv.fr/wp-content/uploads/2018/11/open-licence.pdf
const inputData =
    'https://public.opendatasoft.com/api/records/1.0/search/?dataset=population-francaise-par-departement-2018&q=&rows=200';
type inputDataType = {records: {fields: {code_departement: string; population: number}}[]};
const fetchData = fetch(inputData).then((raw) => raw.json() as Promise<inputDataType>);
const getData = (data: inputDataType, dep: string) =>
    data.records.find((el) => el.fields.code_departement === dep)?.fields.population ?? 0;

export default function GeoData(): JSX.Element {
    const [data, setData] = React.useState({records: []} as inputDataType);
    React.useEffect(() => {
        fetchData.then((r) => setData(r));
    }, []);
    return (
        <div className='d-flex flex-row'>
            <RMap
                className='example-map'
                center={fromLonLat([2, 46.5])}
                zoom={5.75}
                noDefaultControls={true}
                noDefaultInteractions={true}
            >
                <ROSM />
                <RLayerVector
                    zIndex={5}
                    opacity={0.75}
                    format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                    url={departements}
                >
                    <RStyle.RStyle
                        render={(f) => (
                            <RStyle.RFill
                                color={`rgb(0, 0, ${getData(data, f.get('code')) / 5000})`}
                            />
                        )}
                    />
                </RLayerVector>
            </RMap>
        </div>
    );
}
