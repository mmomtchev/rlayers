window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {RLayerCluster, RLayerHeatmap, RMap} from 'rlayers';
import * as common from './common';

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/earthquakes.geojson', 'utf-8'));
const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geojsonFeatures);

describe('<RLayerCluster>', () => {
    it('should create a cluster layer', async () => {
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerCluster features={features} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});

describe('<RLayerHeatmap>', () => {
    it('should create a heatmap layer', async () => {
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerHeatmap features={features} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
});
