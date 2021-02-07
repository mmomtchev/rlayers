import React from 'react';
import {fromLonLat} from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import {Style, Stroke, Fill} from 'ol/style';
import {Map, OSM, LayerTile, LayerVector, Control} from 'react-layers';
import layersIcon from './layers.svg';

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
                <LayerTile
                    properties={{label: 'Watercolor'}}
                    url='http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
                />
            </Control.Layers>
            {/* This one is always visible */}
            <LayerVector
                style={blueContours}
                zIndex={5}
                format={new GeoJSON({featureProjection: 'EPSG:3857'})}
                url='https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson'
            />
        </Map>
    );
}
