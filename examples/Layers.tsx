import React from 'react';
import {fromLonLat} from 'ol/proj';
import {Map, OSM, LayerTile, Control} from 'react-layers';
import layersIcon from './layers.svg';

const layersButton = (
    <button>
        <img src={layersIcon} alt='layers' />
    </button>
);

export default function Layers(): JSX.Element {
    return (
        <Map className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
            <Control.Layers element={layersButton}>
                <OSM properties={{label: 'OpenStreetMap'}} />
                <LayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <LayerTile
                    properties={{label: 'HillShading'}}
                    url='http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
                />
                <LayerTile
                    properties={{label: 'Mapnik'}}
                    url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
                />
                <LayerTile
                    properties={{label: 'Transport'}}
                    url='http://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
                />
            </Control.Layers>
        </Map>
    );
}
