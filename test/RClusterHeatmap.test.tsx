import * as fs from 'fs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {Feature} from 'ol';
import {Point} from 'ol/geom';
import {RFeature, RLayerCluster, RLayerHeatmap, RMap} from 'rlayers';
import * as common from './common';

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/earthquakes.geojson', 'utf-8'));
const parser = new GeoJSON({featureProjection: 'EPSG:3857'});
const features = parser.readFeatures(geojsonFeatures) as Feature<Point>[];

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

    it('should add features to the cluster layer', async () => {
        const ref = React.createRef<RLayerCluster>();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerCluster ref={ref}>
                    <RFeature geometry={new Point(common.coords.ArcDeTriomphe)} />
                </RLayerCluster>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.cluster.getFeatures()).toHaveLength(1);
        unmount();
    });

    it('should allow replacing the url', async () => {
        const ref = React.createRef<RLayerCluster>();
        const {container, unmount, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerCluster ref={ref} format={parser} url={'http://url1'} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.cluster.getUrl()).toBe('http://url1');

        rerender(
            <RMap {...common.mapProps}>
                <RLayerCluster ref={ref} format={parser} url={'http://url2'} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.cluster.getUrl()).toBe('http://url2');
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
