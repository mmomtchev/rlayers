import React, {JSX} from 'react';
import {fromLonLat} from 'ol/proj';
import {RMap, RLayerTile} from 'rlayers';
import spinnerIcon from './svg/pacman.svg';
import 'ol/ol.css';

export default function Layers(): JSX.Element {
    const [loading, setLoading] = React.useState(0);
    return (
        <React.Fragment>
            <RMap className='example-map' initial={{center: fromLonLat([2.364, 48.82]), zoom: 4}}>
                <RLayerTile
                    onTileLoadStart={() => setLoading((loading) => loading + 1)}
                    onTileLoadEnd={() => setLoading((loading) => loading - 1)}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
            </RMap>
            <div className='example-spinner' style={{display: loading ? 'initial' : 'none'}}>
                <img src={spinnerIcon} alt='spinner' />
                <strong>{loading} Loading...</strong>
            </div>
        </React.Fragment>
    );
}
