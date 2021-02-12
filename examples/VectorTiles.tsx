import React from 'react';
import {fromLonLat} from 'ol/proj';
import {MVT} from 'ol/format';
import {Style, Stroke, Circle, Fill, Text} from 'ol/style';

import {RMap, RLayerTile, RLayerVectorTile, MapBrowserEvent} from 'react-layers';

// Ignore the style function and scroll to the bottom to see the component

const styleBorders = new Style({
    stroke: new Stroke({
        color: '#007bff',
        width: 1
    }),
    fill: new Fill({
        color: 'transparent'
    })
});

function stylePlace(feature) {
    let width;
    let font;
    if (this == 0) {
        width = 6;
        font = '1.6rem helvetica,sans-serif';
    } else if (this == 1) {
        width = 5;
        font = '1.2rem helvetica,sans-serif';
    } else if (this == 2) {
        width = 3;
        font = '1rem helvetica,sans-serif';
    } else {
        width = 1;
        font = '0.6rem helvetica,sans-serif';
    }
    const color1 = '#007bff';
    const color2 =
        '#ffff' + feature.get('c').charAt(0).toString('hex').substring(0, 2).padStart(2, '0');

    const style = new Style({
        image: new Circle({
            fill: new Fill({
                color: color1
            }),
            radius: width,
            stroke: new Stroke({
                color: color1,
                width: width
            })
        }),
        text: new Text({
            font: font,
            text: feature.get('n'),
            fill: new Fill({
                color: color2
            }),
            stroke: new Stroke({
                color: color1,
                width: 2
            })
        })
    });
    return style;
}

const degree = 111319.49079327358;

// If you know about any open and free to use vector tile services, please let me know
// This example uses a primitive pbf tile server based on geojson-vt
// You can look at its code in examples/geojson-vt-server
export default function VectorTiles(): JSX.Element {
    const [country, setCountry] = React.useState('');
    return (
        <React.Fragment>
            <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
                <RLayerTile
                    properties={{label: 'Watercolor'}}
                    url='http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
                />
                <RLayerVectorTile
                    onPointerEnter={React.useCallback(
                        (e: MapBrowserEvent) =>
                            e.target?.get &&
                            setCountry(e.target.get('n') + ', ' + e.target.get('c')),
                        [setCountry]
                    )}
                    url='https://react-layers.meteo.guru/tiles/admin/{z}/{x}/{y}'
                    style={styleBorders}
                    format={new MVT()}
                />
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/0/{z}/{x}/{y}'
                    maxResolution={0.01 * degree}
                    style={stylePlace}
                    format={new MVT()}
                />
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/1/{z}/{x}/{y}'
                    maxResolution={0.0025 * degree}
                    style={stylePlace}
                    format={new MVT()}
                />
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/2/{z}/{x}/{y}'
                    maxResolution={0.0005 * degree}
                    style={stylePlace}
                    format={new MVT()}
                />
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow shadow'>
                <p>
                    You are now in <strong>{country}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
