import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Feature as OLFeature} from 'ol';
import {Circle, Fill, RegularShape, Stroke, Style, Text} from 'ol/style';
import {createEmpty, extend, getHeight, getWidth} from 'ol/extent';
import {Map, LayerStamen, LayerCluster} from 'react-layers';

import earthquakes from '!!file-loader!./data/earthquakes.geojson';
type InputFormEventType = React.FormEvent<HTMLInputElement>;
const reader = new GeoJSON({featureProjection: 'EPSG:3857'});

// Styles are copied with (almost) no modification from
// https://openlayers.org/en/latest/examples/earthquake-clusters.html

// Scroll down to "export default function Cluster()" for the react-layers code

const earthquakeFill = new Fill({
    color: 'rgba(255, 153, 0, 0.8)'
});
const earthquakeStroke = new Stroke({
    color: 'rgba(255, 204, 0, 0.2)',
    width: 1
});
const textFill = new Fill({
    color: '#fff'
});
const textStroke = new Stroke({
    color: 'rgba(0, 0, 0, 0.6)',
    width: 3
});

function createEarthquakeStyle(feature) {
    const magnitude = parseFloat(feature.get('mag'));
    const radius = 5 + 20 * (magnitude - 5);

    return new Style({
        geometry: feature.getGeometry(),
        image: new RegularShape({
            radius1: radius,
            radius2: 3,
            points: 5,
            angle: Math.PI,
            fill: earthquakeFill,
            stroke: earthquakeStroke
        })
    });
}

let maxFeatureCount;
const calculateClusterInfo = function (resolution) {
    maxFeatureCount = 0;
    const features = this.source.getFeatures();
    let feature, radius;
    for (let i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        const originalFeatures = feature.get('features');
        const extent = createEmpty();
        let j = 0,
            jj = 0;
        for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
            extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        maxFeatureCount = Math.max(maxFeatureCount, jj);
        radius = (0.25 * (getWidth(extent) + getHeight(extent))) / resolution;
        feature.set('radius', radius);
    }
};

let currentResolution;
function clusterStyle(feature: OLFeature, resolution: number): Style {
    if (!this.current) return null;
    if (resolution != currentResolution) {
        calculateClusterInfo.call(this.current, resolution);
        currentResolution = resolution;
    }
    let style;
    const size = feature.get('features').length;
    if (size > 1) {
        style = new Style({
            image: new Circle({
                radius: feature.get('radius'),
                fill: new Fill({
                    color: [255, 153, 0, Math.min(0.8, 0.4 + size / maxFeatureCount)]
                })
            }),
            text: new Text({
                text: size.toString(),
                fill: textFill,
                stroke: textStroke
            })
        });
    } else {
        const originalFeature = feature.get('features')[0];
        style = createEarthquakeStyle(originalFeature);
    }
    return style;
}

export default function Cluster(): JSX.Element {
    const [distance, setDistance] = React.useState(20);
    const earthquakeLayer = React.useRef();
    return (
        <React.Fragment>
            <Map
                className='example-map'
                center={fromLonLat([0, 0])}
                zoom={1}
                // This needed because the examples app hot-loads components when switching tabs
                onRenderComplete={useCallback(() => (currentResolution = undefined), [])}
            >
                <LayerStamen layer='toner' />
                <LayerCluster
                    ref={earthquakeLayer}
                    distance={distance}
                    format={reader}
                    url={earthquakes}
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    style={useCallback(clusterStyle.bind(earthquakeLayer), [earthquakeLayer])}
                />
            </Map>
            <div className='w-100'>
                <label htmlFor='distance'>Clustering distance</label>
                <div className='w-100'>
                    <input
                        type='range'
                        className='range-slider range-slider--primary w-100'
                        min='5'
                        max='50'
                        id='distance'
                        value={distance}
                        onChange={useCallback(
                            (e: InputFormEventType) => setDistance(parseInt(e.currentTarget.value)),
                            []
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    );
}
