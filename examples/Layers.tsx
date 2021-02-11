import React from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Stroke, Fill} from 'ol/style';
import {RMap, ROSM, RLayerTile, RLayerVector, RControl} from 'react-layers';
import layersIcon from './svg/layers.svg';

const layersButton = (
    <button>
        <img src={layersIcon} alt='layers' />
    </button>
);

const blueContours = new Style({
    stroke: new Stroke({color: '#007bff', width: 3}),
    fill: new Fill({color: 'transparent'})
});

export default function Layers(): JSX.Element {
    return (
        <RMap className='example-map' center={fromLonLat([2.364, 48.82])} zoom={11}>
            <RControl.RLayers element={layersButton}>
                <ROSM properties={{label: 'OpenStreetMap'}} />
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
                <RLayerTile
                    properties={{label: 'HillShading'}}
                    url='http://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Mapnik'}}
                    url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Transport'}}
                    url='http://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
                />
                <RLayerTile
                    properties={{label: 'Watercolor'}}
                    url='http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
                />
            </RControl.RLayers>
            {/* This one is always visible */}
            <RLayerVector
                style={blueContours}
                zIndex={5}
                format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
            />
        </RMap>
    );
}
