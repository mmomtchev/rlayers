import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import proj4 from 'proj4';
import {register as proj4register} from 'ol/proj/proj4';

import {
    RMap,
    RLayerStamen,
    RLayerTileJSON,
    RLayerWMS,
    RLayerTileWMS,
    RLayerImage,
    RLayerGraticule,
    RStyle
} from 'rlayers';

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
        expect((layer.current?.source.getUrls() || [])[0]).toBe(
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
        expect(layer.current?.source.getUrl()).toBe('https://magosm.magellium.com/geoserver/ows');
        expect(layer.current?.source.getParams().LAYERS).toBe('magosm:france_schools_point');
    });
});

describe('<RLayerImage>', () => {
    it('should display an image source layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerImage>;
        const {container, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerImage
                    ref={layer}
                    url='https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg'
                    extent={[-180, -90, 180, 90]}
                    size={[2058, 1036]}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current?.source.getUrl()).toBe(
            'https://upload.wikimedia.org/wikipedia/commons/8/83/Equirectangular_projection_SW.jpg'
        );
        expect(layer.current?.source.getImageExtent()).toEqual([-180, -90, 180, 90]);
        rerender(
            <RMap {...common.mapProps}>
                <RLayerImage
                    ref={layer}
                    url='https://upload.wikimedia.org/wikipedia/commons/2/23/Blue_Marble_2002.png'
                    extent={[-180, -90, 180, 90]}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current?.source.getUrl()).toBe(
            'https://upload.wikimedia.org/wikipedia/commons/2/23/Blue_Marble_2002.png'
        );
    });
});

describe('<RLayerGraticule>', () => {
    it('should display a graticule layer', async () => {
        const layer = React.createRef() as React.RefObject<RLayerGraticule>;
        const style = React.createRef() as React.RefObject<RStyle.RStyle>;
        const {container, rerender} = render(
            <RMap {...common.mapProps}>
                <RStyle.RStyle ref={style}>
                    <RStyle.RStroke color='red' width={4} />
                    <RStyle.RText text='' scale={2} offsetY={-10} offsetX={-10}>
                        <RStyle.RStroke color='green' width={2} />
                        <RStyle.RFill color='black' />
                    </RStyle.RText>
                </RStyle.RStyle>
                <RLayerGraticule
                    ref={layer}
                    extent={[-10, 35, 15, 55]}
                    latLabelStyle={style}
                    lonLabelStyle={style}
                    strokeStyle={style}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current?.ol.getExtent()).toEqual([-10, 35, 15, 55]);
        rerender(
            <RMap {...common.mapProps}>
                <RLayerGraticule ref={layer} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(layer.current?.ol.getExtent()).toBeUndefined();
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
        expect((layer.current?.source.getUrls() || [])[0]).toBe(
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
                    projection='EPSG:2056'
                    params={{
                        LAYERS: 'ch.swisstopo.pixelkarte-farbe-pk1000.noscale',
                        FORMAT: 'image/jpeg',
                        serverType: 'mapserver'
                    }}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect((layer.current?.source.getUrls() || [])[0]).toBe('https://wms.geo.admin.ch/');
        expect(layer.current?.source.getParams().LAYERS).toBe(
            'ch.swisstopo.pixelkarte-farbe-pk1000.noscale'
        );
        expect(layer.current?.source.getProjection()?.getCode()).toBe('EPSG:2056');
    });
});
