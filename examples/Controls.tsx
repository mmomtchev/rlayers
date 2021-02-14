import React, {useCallback} from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {fromLonLat, toLonLat} from 'ol/proj';

import {RMap, RMapContext, ROSM, RControl} from 'react-layers';

const origin = [2.364, 48.82];

export default function Controls(): JSX.Element {
    const [loc, setLoc] = React.useState(origin);
    return (
        <React.Fragment>
            <RMap
                className='example-map'
                center={fromLonLat(origin)}
                zoom={11}
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
                <RControl.RFullScreen />
                <RControl.RFullScreen
                    // Take a look at index.html and example.css for this one
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                <RControl.RCustom className='example-control'>
                    <RMapContext.Consumer>
                        {(map: Map) => (
                            <button onClick={() => map.getView().setCenter(fromLonLat(loc))}>
                                o
                            </button>
                        )}
                    </RMapContext.Consumer>
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
