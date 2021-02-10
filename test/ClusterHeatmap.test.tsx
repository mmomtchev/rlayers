window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {LayerCluster, LayerHeatmap, Map} from 'react-layers';
import * as common from './common';

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/earthquakes.geojson', 'utf-8'));
const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geojsonFeatures);

describe('<LayerCluster>', () => {
    it('should create a cluster layer', async () => {
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerCluster features={features} />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});

describe('<LayerHeatmap>', () => {
    it('should create a heatmap layer', async () => {
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerHeatmap features={features} />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
