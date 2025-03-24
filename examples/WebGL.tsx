import React, {JSX} from 'react';
import {fromLonLat} from 'ol/proj';
import 'ol/ol.css';

import {RMap, RLayerTileWebGL, ROSMWebGL, RControl} from 'rlayers';
import 'rlayers/control/layers.css';

const center = fromLonLat([2.364, 48.82]);
export default function Simple(): JSX.Element {
    return (
        <React.Fragment>
            <RMap width={'100%'} height={'60vh'} initial={{center: center, zoom: 11}}>
                <RControl.RLayers>
                    <ROSMWebGL properties={{label: 'OSM'}} />
                    <RLayerTileWebGL
                        properties={{label: 'OpenTopo'}}
                        url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                        attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                    />
                </RControl.RLayers>
            </RMap>
            <div className={'my-4'}>
                <strong>WebGL generally allows for a smoother animation experience</strong>
                <p>Use the button in the upper right corner to switch the active layer</p>
            </div>
        </React.Fragment>
    );
}
