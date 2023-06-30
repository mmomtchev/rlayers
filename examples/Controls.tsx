import React, {useCallback} from 'react';
import {MapBrowserEvent} from 'ol';
import {fromLonLat, toLonLat} from 'ol/proj';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

import {RMap, ROSM, RControl} from 'rlayers';
import {RView} from 'rlayers/RMap';

const origin = [2.364, 48.82];
const initial: RView = {center: fromLonLat(origin), zoom: 11};

export default function Controls(): JSX.Element {
    const [loc, setLoc] = React.useState(origin);
    const [view, setView] = React.useState(initial);
    return (
        <React.Fragment>
            <RMap
                className='example-map'
                initial={initial}
                view={[view, setView]}
                noDefaultControls={true}
                onClick={useCallback((e: MapBrowserEvent<UIEvent>) => {
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
                <RControl.RFullScreen
                    // A custom-looking full-screen control
                    // Take a look at index.html and example.css
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                {/* A control that centers the map on the last clicked point
                 * without modifying the current zoom level */}
                <RControl.RCustom className='example-control'>
                    <button onClick={() => setView({...view, center: fromLonLat(loc)})}>o</button>
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
