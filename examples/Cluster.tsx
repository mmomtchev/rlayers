import React, {useCallback} from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {createEmpty, extend, getHeight, getWidth} from 'ol/extent';
import 'ol/ol.css';

// This example illustrates the versatility of a dynamic RStyle
// It also makes use of its caching abilities
import {RMap, RLayerStamen, RLayerCluster} from 'rlayers';
import {RStyle, RFill, RStroke, RRegularShape, RCircle, RText} from 'rlayers/style';

// Earthquakes of magnitude of at least 3.0 in 2020 (courtesy of USGS)
// (this won't work in CodePen)
import earthquakes from '!!file-loader!./data/earthquakes.geojson';
type InputFormEventType = React.FormEvent<HTMLInputElement>;
const reader = new GeoJSON({featureProjection: 'EPSG:3857'});

const colorBlob = (size) =>
    'rgba(' + [255, 153, 0, Math.min(0.8, 0.4 + Math.log(size / 10) / 20)].join() + ')';
const radiusStar = (feature) => Math.round(5 * (parseFloat(feature.get('mag')) - 2.5));

// This returns the north/south east/west extent of a group of features
// divided by the resolution
const extentFeatures = (features, resolution) => {
    const extent = createEmpty();
    for (const f of features) extend(extent, f.getGeometry().getExtent());
    return Math.round(0.25 * (getWidth(extent) + getHeight(extent))) / resolution;
};

export default function Cluster(): JSX.Element {
    const [distance, setDistance] = React.useState(20);
    const [selected, setSelected] = React.useState<string>('Click a cluster for details');
    const earthquakeLayer = React.useRef();
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat([0, 0]), zoom: 1}}>
                <RLayerStamen layer='toner' />
                <RLayerCluster
                    ref={earthquakeLayer}
                    distance={distance}
                    format={reader}
                    url={earthquakes}
                    onClick={React.useCallback((e) => {
                        const features = e.target.get('features') ?? [];
                        setSelected(
                            `${features.length} earthquakes in this location, ` +
                                `magnitudes are ${features.map((eq) => eq.get('mag')).join(', ')}`
                        );
                    }, [])}
                >
                    <RStyle
                        cacheSize={1024}
                        cacheId={useCallback(
                            (feature, resolution) =>
                                // This is the hashing function, it takes a feature as its input
                                // and returns a string
                                // It must be dependant of the same inputs as the rendering function
                                feature.get('features').length > 1
                                    ? '#' + extentFeatures(feature.get('features'), resolution)
                                    : '$' + radiusStar(feature.get('features')[0]),
                            []
                        )}
                        render={useCallback((feature, resolution) => {
                            // This is the rendering function
                            // It has access to the cluster which appears as a single feature
                            // and has a property with an array of all the features that make it
                            const size = feature.get('features').length;
                            // This is the size (number of features) of the cluster
                            if (size > 1) {
                                // Render a blob with a number
                                const radius = extentFeatures(feature.get('features'), resolution);
                                return (
                                    // A dynamic style should return a fragment instead of a
                                    // full-blown RStyle - returning a full RStyle here
                                    // will simply replace the style used by the vector layer
                                    // with a fixed one
                                    <React.Fragment>
                                        <RCircle radius={radius}>
                                            <RFill color={colorBlob(size)} />
                                        </RCircle>
                                        <RText text={size.toString()}>
                                            <RFill color='#fff' />
                                            <RStroke color='rgba(0, 0, 0, 0.6)' width={3} />
                                        </RText>
                                    </React.Fragment>
                                );
                            }
                            // We have a single feature cluster
                            const unclusteredFeature = feature.get('features')[0];
                            // Render a star
                            return (
                                <RRegularShape
                                    radius1={radiusStar(unclusteredFeature)}
                                    radius2={3}
                                    points={5}
                                    angle={Math.PI}
                                >
                                    <RFill color='rgba(255, 153, 0, 0.8)' />
                                    <RStroke color='rgba(255, 204, 0, 0.2)' width={1} />
                                </RRegularShape>
                            );
                        }, [])}
                    />
                </RLayerCluster>
            </RMap>
            <div className='my-3 w-100'>
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
            <div>{selected}</div>
        </React.Fragment>
    );
}
