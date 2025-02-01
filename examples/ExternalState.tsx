import React, {JSX} from 'react';
import {fromLonLat, toLonLat} from 'ol/proj';
import 'ol/ol.css';
import 'rlayers/control/layers.css';

import {RMap, ROSM} from 'rlayers';
import {RView} from 'rlayers/RMap';

const origin = fromLonLat([2.364, 48.82]);

export default function ExternalState(): JSX.Element {
    const [view, setView] = React.useState<RView>({center: origin, zoom: 11});
    return (
        <React.Fragment>
            <RMap className='example-map' initial={view} view={[view, setView]}>
                <ROSM />
            </RMap>
            <div className='mx-0 mt-0 mb-3 p-1 w-100 jumbotron shadow d-flex flex-row justify-content-between'>
                <div>
                    Center is at
                    <strong className='mx-1'>
                        {`${toLonLat(view.center)[1].toFixed(3)}° :
                    ${toLonLat(view.center)[0].toFixed(3)}°`}
                    </strong>
                </div>
                <div>
                    Zoom level is <strong className='mx-1'>{Math.round(view.zoom)}</strong>
                </div>
                <div>
                    Resolution is
                    <strong className='mx-1'>
                        {view.resolution && view.resolution.toFixed(2)}m/pixel
                    </strong>
                </div>
            </div>
        </React.Fragment>
    );
}
