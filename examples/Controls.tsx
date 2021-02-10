import React, {useCallback} from 'react';
import {Map as OLMap, MapBrowserEvent} from 'ol';
import {fromLonLat, toLonLat} from 'ol/proj';
import {Map, MapContext, OSM, Control} from 'react-layers';

const origin = [2.364, 48.82];

export default function Controls(): JSX.Element {
    const [loc, setLoc] = React.useState(origin);
    return (
        <React.Fragment>
            <Map
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
                <OSM />
                <Control.ScaleLine />
                <Control.Attribution />
                <Control.Zoom />
                <Control.FullScreen />
                <Control.FullScreen
                    // Take a look at index.html and example.css for this one
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                <Control.Custom className='example-control'>
                    <MapContext.Consumer>
                        {(map: OLMap) => (
                            <button onClick={() => map.getView().setCenter(fromLonLat(loc))}>
                                o
                            </button>
                        )}
                    </MapContext.Consumer>
                </Control.Custom>
            </Map>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow'>
                <p>
                    Last click location is{' '}
                    <strong>{`${loc[1].toFixed(3)} : ${loc[0].toFixed(3)}`}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
