window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {RMap, RLayerStamen, RLayerTileJSON, RLayerWMS, RLayerTileWMS} from 'rlayers';
import * as common from './common';

describe('<RLayerStamen>', () => {
    it('should display a tiled Stamen layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerStamen>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerStamen ref={layer} layer='toner' />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current.source.getUrls()[0]).toBe(
            'https://stamen-tiles-a.a.ssl.fastly.net/toner/{z}/{x}/{y}.png'
        );
    });
});

describe('<RLayerWMS>', () => {
    it('should display a WMS source layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerWMS>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerWMS
                    ref={layer}
                    url='https://magosm.magellium.com/geoserver/ows'
                    params={{LAYERS: 'magosm:france_schools_point', FORMAT: 'image/jpeg'}}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current.source.getUrl()).toBe('https://magosm.magellium.com/geoserver/ows');
        expect(layer.current.source.getParams().LAYERS).toBe('magosm:france_schools_point');
    });
});

describe('<RLayerTileJSON>', () => {
    it('should display a TileJSON source layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerTileJSON>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerTileJSON
                    ref={layer}
                    url='https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1'
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current.source.getUrls()[0]).toBe(
            'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1'
        );
    });
});

describe('<RLayerTileWMS>', () => {
    it('should display a TileWMS source layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerTileWMS>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerTileWMS
                    ref={layer}
                    url='https://wms.geo.admin.ch/'
                    params={{
                        LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                        FORMAT: 'image/jpeg',
                        serverType: 'mapserver'
                    }}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current.source.getUrls()[0]).toBe('https://wms.geo.admin.ch/');
        expect(layer.current.source.getParams().LAYERS).toBe(
            'ch.swisstopo.pixelkarte-farbe-pk1000.noscale'
        );
    });
});
