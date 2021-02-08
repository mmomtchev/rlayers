import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Feature as OLFeature} from 'ol';
import {Map, LayerStamen, LayerHeatmap} from 'react-layers';

import earthquakes from '!!file-loader!./data/earthquakes.geojson';
type InputFormEventType = React.FormEvent<HTMLInputElement>;
const reader = new GeoJSON({featureProjection: 'EPSG:3857'});

export default function Heatmap(): JSX.Element {
    const [blur, setBlur] = React.useState(15);
    const [radius, setRadius] = React.useState(8);
    return (
        <React.Fragment>
            <Map className='example-map' center={fromLonLat([0, 0])} zoom={1}>
                <LayerStamen layer='toner' />
                <LayerHeatmap
                    blur={blur}
                    radius={radius}
                    format={reader}
                    url={earthquakes}
                    weight={useCallback((f: OLFeature) => parseFloat(f.get('mag')) - 5, [])}
                />
            </Map>
            <div className='d-flex flex-row w-100'>
                <div className='w-50 mr-2'>
                    <label htmlFor='blur'>Blur</label>
                    <div className='w-100'>
                        <input
                            type='range'
                            className='range-slider range-slider--primary w-100'
                            min='0'
                            max='50'
                            id='blur'
                            value={blur}
                            onChange={useCallback(
                                (e: InputFormEventType) => setBlur(parseInt(e.currentTarget.value)),
                                []
                            )}
                        />
                    </div>
                </div>
                <div className='w-50'>
                    <label htmlFor='radius'>Radius</label>
                    <div className='w-100'>
                        <input
                            type='range'
                            className='range-slider range-slider--primary w-100'
                            min='0'
                            max='20'
                            id='radius'
                            value={radius}
                            onChange={useCallback(
                                (e: InputFormEventType) =>
                                    setRadius(parseInt(e.currentTarget.value)),
                                []
                            )}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
