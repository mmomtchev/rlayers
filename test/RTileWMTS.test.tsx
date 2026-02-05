import * as fs from 'fs';
import * as path from 'path';
import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import Projection from 'ol/proj/Projection';
import {createXYZ} from 'ol/tilegrid';
import {WMTS} from 'ol/source';

import {RMap, RLayerTile, RLayerWMTS} from 'rlayers';
import * as common from './common';

describe('<RLayerTile>', () => {
    it('should display a tiled XYZ layer', async () => {
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should update the url by recreating the source', async () => {
        const ref = React.createRef() as React.RefObject<RLayerTile>;
        const handler = jest.fn(() => undefined);
        const comp = (url) => (
            <RMap {...common.mapProps}>
                <RLayerTile ref={ref} url={url} onTileLoadStart={handler} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp('http://url1'));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.source.getUrls() || [])[0]).toEqual('http://url1');
        expect(ref.current?.source.getListeners('tileloadend')).toBeUndefined();
        expect(ref.current?.source.getListeners('tileloadstart')).toHaveLength(1);
        const source = ref.current?.source;
        rerender(comp('http://url2'));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.source.getUrls() || [])[0]).toEqual('http://url2');
        expect(ref.current?.source.getListeners('tileloadend')).toBeUndefined();
        expect(ref.current?.source.getListeners('tileloadstart')).toHaveLength(1);
        expect(ref.current?.source).not.toEqual(source);
        unmount();
    });

    it('should support custom projection and TileGrid', async () => {
        const layer = React.createRef() as React.RefObject<RLayerTile>;
        render(
            <RMap {...common.mapProps}>
                <RLayerTile
                    ref={layer}
                    projection={'EPSG:4326'}
                    tileGrid={createXYZ({
                        maxResolution: 111,
                        maxZoom: 20,
                        tileSize: [512, 512]
                    })}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                />
            </RMap>
        );
        expect(layer.current?.source.getTileGrid()?.getMaxZoom()).toBe(20);
        expect(layer.current?.source.getProjection()?.getCode()).toBe('EPSG:4326');
    });

    it('should relay tile events', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const layer = React.createRef() as React.RefObject<RLayerTile>;
        const handler = jest.fn();
        const events = ['TileEnd', 'TileStart', 'TileError'];
        const handlers = events.reduce((props, ev) => ({...props, ['on' + ev]: handler}), {});
        render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerTile
                    ref={layer}
                    {...handlers}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                />
            </RMap>
        );
        if (map.current === null) throw new Error('failed rendering map');
        for (const ev of events)
            layer.current?.source.dispatchEvent(common.createEvent(ev, map.current.ol));
        expect(handler).toHaveBeenCalledTimes(events.length);
    });
});

let WMTSCaps: string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.fetch = jest.fn(() => Promise.resolve({text: () => WMTSCaps})) as any;

describe('<RLayerWMTS>', () => {
    it('should display a tiled WMTS layer', async () => {
        WMTSCaps = fs.readFileSync(
            path.join(__dirname, 'fixtures', 'tiles.arcgis.com.cap.xml'),
            'utf-8'
        );
        const layer = React.createRef() as React.RefObject<RLayerWMTS>;
        await new Promise((res, rej) => {
            const {container} = render(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        onCapabilities={function (opt) {
                            try {
                                expect((opt.projection as Projection).getCode()).toBe('EPSG:27700');
                                expect(this).toBeInstanceOf(RLayerWMTS);
                                res(undefined);
                            } catch (e) {
                                rej(e);
                            }
                        }}
                        attributions='Contains OS data © Crown Copyright and database right'
                        url='https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS'
                        layer='OS_Open_Raster'
                    />
                </RMap>
            );
            expect(container.innerHTML).toMatchSnapshot();
        });
        expect((layer.current?.source.getUrls() || [])[0]).toBe(
            'https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS/tile/1.0.0/OS_Open_Raster/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
        );
    });

    it('should recreate the source only if the data changes', async () => {
        WMTSCaps = fs.readFileSync(
            path.join(__dirname, 'fixtures', 'tiles.arcgis.com.cap.xml'),
            'utf-8'
        );
        const layer = React.createRef() as React.RefObject<RLayerWMTS>;
        let result: RenderResult | undefined | null;
        let source: WMTS | undefined | null;
        await new Promise((res, rej) => {
            result = render(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        onCapabilities={function (opt) {
                            try {
                                expect((opt.projection as Projection).getCode()).toBe('EPSG:27700');
                                expect(this).toBeInstanceOf(RLayerWMTS);
                                source = layer.current?.ol.getSource();
                                res(undefined);
                            } catch (e) {
                                rej(e);
                            }
                        }}
                        attributions='Contains OS data © Crown Copyright and database right'
                        url='https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS'
                        layer='OS_Open_Raster'
                    />
                </RMap>
            );
            expect(result.container.innerHTML).toMatchSnapshot();
        });
        await new Promise((res, rej) => {
            if (!result) throw new Error('Failed rendering');
            result.rerender(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        onCapabilities={function (opt) {
                            try {
                                expect((opt.projection as Projection).getCode()).toBe('EPSG:27700');
                                expect(this).toBeInstanceOf(RLayerWMTS);
                                if (layer.current?.ol.getSource() !== source)
                                    rej(new Error('Unexpected rerender'));
                                res(undefined);
                            } catch (e) {
                                rej(e);
                            }
                        }}
                        attributions='Contains OS data © Crown Copyright and database right'
                        url='https://tiles.arcgis.com/tiles/qHLhLQrcvEnxjtPr/arcgis/rest/services/OS_Open_Raster/MapServer/WMTS'
                        layer='OS_Open_Raster'
                    />
                </RMap>
            );
        });
        WMTSCaps = fs.readFileSync(
            path.join(__dirname, 'fixtures', 'wmts.geo.admin.ch.caps.xml'),
            'utf-8'
        );
        await new Promise((res, rej) => {
            if (!result) throw new Error('Failed rendering');
            result.rerender(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        onCapabilities={function (opt) {
                            try {
                                expect((opt.projection as Projection).getCode()).toBe('EPSG:2056');
                                expect(this).toBeInstanceOf(RLayerWMTS);
                                if (layer.current?.ol.getSource() === source)
                                    rej(new Error('Expected to rerender'));
                                res(undefined);
                            } catch (e) {
                                rej(e);
                            }
                        }}
                        url='https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml'
                        layer='ch.are.alpenkonvention'
                    />
                </RMap>
            );
        });
        await new Promise((res, rej) => {
            if (!result) throw new Error('Failed rendering');
            result.rerender(
                <RMap {...common.mapProps}>
                    <RLayerWMTS
                        zIndex={5}
                        ref={layer}
                        visible={false}
                        onCapabilities={function (_) {
                            try {
                                if (layer.current?.ol.getVisible() === true)
                                    rej(new Error('Expected to hide'));
                                res(undefined);
                            } catch (e) {
                                rej(e);
                            }
                        }}
                        url='https://wmts.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml'
                        layer='ch.are.alpenkonvention'
                    />
                </RMap>
            );
        });
    });

    type WMTSTestSet = [
        requestedProjection: string | undefined,
        requestedMatrixSet: string | undefined,
        expectedProjection: string | undefined,
        expectedMatrixSet: string | undefined,
        rerenderRequestedProjection: string | undefined,
        rerenderRequestedMatrixSet: string | undefined,
        rerenderExpected: boolean
    ];

    it.each<WMTSTestSet>([
        ['EPSG:3857', undefined, 'EPSG:3857', 'DE_EPSG_3857_ADV', 'EPSG:3857', undefined, false],
        [
            'EPSG:3857',
            undefined,
            'EPSG:3857',
            'DE_EPSG_3857_ADV',
            'EPSG:3857',
            'GLOBAL_WEBMERCATOR',
            true
        ],
        [
            'EPSG:3857',
            'GLOBAL_WEBMERCATOR',
            'EPSG:3857',
            'GLOBAL_WEBMERCATOR',
            'EPSG:3857',
            'GLOBAL_WEBMERCATOR',
            false
        ]
    ])(
        'should consider projection %s and matrixSet %s to select WMTS source(%s, %s) ',
        async (
            requestedProjection,
            requestedMatrixSet,
            expectedProjection,
            expectedMatrixSet,
            rerenderRequestedProjection,
            rerenderRequestedMatrixSet,
            rerenderExpected
        ) => {
            WMTSCaps = fs.readFileSync(
                path.join(__dirname, 'fixtures', 'sgx.geodatenzentrum.de.caps.xml'),
                'utf-8'
            );
            const layer = React.createRef() as React.RefObject<RLayerWMTS>;
            let renderResult: RenderResult | undefined | null;
            let renderSource: WMTS | undefined | null;
            await new Promise((res, rej) => {
                renderResult = render(
                    <RMap {...common.mapProps}>
                        <RLayerWMTS
                            zIndex={5}
                            ref={layer}
                            projection={requestedProjection}
                            matrixSet={requestedMatrixSet}
                            onCapabilities={function (opt) {
                                try {
                                    expect(this).toBeInstanceOf(RLayerWMTS);
                                    expect(opt.projection).toBe(expectedProjection);
                                    expect(opt.matrixSet).toBe(expectedMatrixSet);
                                    expect(this.source.getMatrixSet()).toBe(expectedMatrixSet);
                                    renderSource = layer.current?.ol.getSource();
                                    res(undefined);
                                } catch (e) {
                                    rej(e);
                                }
                            }}
                            url='https://sgx.geodatenzentrum.de/wmts_basemapde/1.0.0/WMTSCapabilities.xml'
                            layer='de_basemapde_web_raster_farbe'
                        />
                    </RMap>
                );
                expect(renderResult.container.innerHTML).toMatchSnapshot();
            });
            expect((layer.current?.source.getUrls() || [])[0]).toBe(
                'https://sgx.geodatenzentrum.de/wmts_basemapde/tile/1.0.0/de_basemapde_web_raster_farbe/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png'
            );
            await new Promise((res, rej) => {
                if (!renderResult) throw new Error('Failed rendering');
                renderResult.rerender(
                    <RMap {...common.mapProps}>
                        <RLayerWMTS
                            zIndex={5}
                            ref={layer}
                            projection={rerenderRequestedProjection}
                            matrixSet={rerenderRequestedMatrixSet}
                            onCapabilities={function (_) {
                                try {
                                    expect(this).toBeInstanceOf(RLayerWMTS);
                                    expect(renderSource !== layer.current?.ol.getSource()).toBe(
                                        rerenderExpected
                                    );
                                    res(undefined);
                                } catch (e) {
                                    rej(e);
                                }
                            }}
                            url='https://sgx.geodatenzentrum.de/wmts_basemapde/1.0.0/WMTSCapabilities.xml'
                            layer='de_basemapde_web_raster_farbe'
                        />
                    </RMap>
                );
            });
        }
    );
});
