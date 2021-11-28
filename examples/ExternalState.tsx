import React from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

import {RMap, ROSM} from 'rlayers';

const origin = fromLonLat([2.364, 48.82]);

export default function ExternalState(): JSX.Element {
    const [view, setView] = React.useState({center: origin, zoom: 11});
    return (
        <React.Fragment>
            <RMap className='example-map' initial={view} view={[view, setView]}>
                <ROSM />
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow'>
                <p>
                    Center is at{' '}
                    <strong>{`${toLonLat(view.center)[1].toFixed(3)} :
                    ${toLonLat(view.center)[0].toFixed(3)}`}</strong>
                </p>
            </div>
        </React.Fragment>
    );
}
