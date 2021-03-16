import React, {useCallback} from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {fromLonLat, toLonLat} from 'ol/proj';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

import {RMap, RContext, ROSM, RControl} from 'rlayers';

const origin = [2.364, 48.82];

export default function Controls(): JSX.Element {
    const [loc, setLoc] = React.useState(origin);
    return (
        <React.Fragment>
            <RMap
                className='example-map'
                initial={{center: fromLonLat(origin), zoom: 11}}
                noDefaultControls={true}
                onClick={useCallback((e: MapBrowserEvent) => {
                    const coords = e.map.getCoordinateFromPixel(e.pixel);
                    const lonlat = toLonLat(coords);
                    setLoc(lonlat);
                }, [])}
            >
                <ROSM />
                <RControl.RScaleLine />
                <RControl.RAttribution />
                <RControl.RZoom />
                <RControl.RZoomSlider />
                <RControl.RFullScreen />
                <RControl.RFullScreen
                    // Take a look at index.html and example.css for this one
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                <RControl.RCustom className='example-control'>
                    <RContext.Consumer>
                        {({map}) => (
                            <button onClick={() => map.getView().setCenter(fromLonLat(loc))}>
                                o
                            </button>
                        )}
                    </RContext.Consumer>
                </RControl.RCustom>
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow'>
                <p>
                    Last click location is{' '}
                    <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
