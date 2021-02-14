import React from 'react';
import {Feature} from 'ol';
import {fromLonLat} from 'ol/proj';
import {MVT} from 'ol/format';

import {RMap, RLayerTile, RLayerVectorTile, MapBrowserEvent, RStyle} from 'react-layers';

const degree = 111319.49079327358;
const fonts = {
    0: {width: 6, font: '1.6rem helvetica,sans-serif'},
    1: {width: 5, font: '1.2rem helvetica,sans-serif'},
    2: {width: 3, font: '1rem helvetica,sans-serif'},
    def: {width: 1, font: '0.6rem helvetica,sans-serif'}
};

// If you know about any open and free to use vector tile services, please let me know
// This example uses a primitive pbf tile server based on geojson-vt
// You can look at its code in examples/geojson-vt-server
export default function VectorTiles(): JSX.Element {
    const [country, setCountry] = React.useState('');
    const styles = {
        borders: RStyle.useRStyle(),
        towns: RStyle.useRStyle()
    };
    return (
        <React.Fragment>
            <RStyle.RStyle ref={styles.borders}>
                {/* This is the borders style */}
                <RStyle.RStroke color='#007bff' width={2} />
                <RStyle.RFill color='transparent' />
            </RStyle.RStyle>

            <RStyle.RStyle
                ref={styles.towns}
                render={(feature: Feature) => {
                    /* This is a the towns style
                     *
                     * This is a dynamic style that creates a new object
                     * every time it is access
                     * Use with care
                     */

                    const {width, font} = fonts[feature.get('p')] ?? fonts.def;
                    const color =
                        '#ffff' +
                        feature.get('c').charAt(0).toString('hex').substring(0, 2).padStart(2, '0');
                    return (
                        <React.Fragment>
                            <RStyle.RCircle radius={width}>
                                <RStyle.RStroke color={'#007bff'} width={width} />
                                <RStyle.RFill color={'#007bff'} />
                            </RStyle.RCircle>
                            <RStyle.RText font='helvetica' text={feature.get('n')}>
                                <RStyle.RStroke color={'#007bff'} width={2} />
                                <RStyle.RFill color={color} />
                            </RStyle.RText>
                        </React.Fragment>
                    );
                }}
            />
            <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={8}>
                {/* This is the background raster map */}
                <RLayerTile
                    properties={{label: 'Watercolor'}}
                    url='http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
                />
                {/* These are the administrative borders */}
                <RLayerVectorTile
                    onPointerEnter={React.useCallback(
                        (e: MapBrowserEvent) =>
                            e.target?.get &&
                            setCountry(e.target.get('n') + ', ' + e.target.get('c')),
                        [setCountry]
                    )}
                    url='https://react-layers.meteo.guru/tiles/admin/{z}/{x}/{y}'
                    style={styles.borders}
                    format={new MVT()}
                />
                {/* These are the cities */}
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/0/{z}/{x}/{y}'
                    maxResolution={0.01 * degree}
                    style={styles.towns}
                    format={new MVT()}
                />
                {/* The towns visible only when zoomed in */}
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/1/{z}/{x}/{y}'
                    maxResolution={0.0025 * degree}
                    style={styles.towns}
                    format={new MVT()}
                />
                {/* The small villages at maximum resolution */}
                <RLayerVectorTile
                    url='https://react-layers.meteo.guru/tiles/place/2/{z}/{x}/{y}'
                    maxResolution={0.0005 * degree}
                    style={styles.towns}
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
