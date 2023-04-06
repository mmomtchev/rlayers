import React from 'react';
import {RenderResult, act, render} from '@testing-library/react';

import {RMap} from 'rlayers';
import RLayerRasterMBTiles from 'rlayers/layer/RLayerRasterMBTiles';
import RLayerVectorMBTiles from 'rlayers/layer/RLayerVectorMBTiles';

import * as common from './common';

const reactMajorVersion = +React.version.split('.')[0];
const reactMinorVersion = +React.version.split('.')[1];

describe('<RLayerRasterMBTiles>', () => {
    it('should display an MBTiles raster source layer', async () => {
        let poolClose: (() => Promise<void>) | undefined;
        let result: RenderResult | undefined;

        // render
        await new Promise<void>((res, rej) => {
            const layer = React.createRef() as React.RefObject<RLayerRasterMBTiles>;
            result = render(
                <RMap {...common.mapProps}>
                    <RLayerRasterMBTiles
                        ref={layer}
                        url='https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles'
                        onMetadataReady={function (md) {
                            try {
                                md.pool?.then((p) => {
                                    poolClose = p.close = jest.fn(p.close);
                                });
                                expect(this).toBeInstanceOf(RLayerRasterMBTiles);
                                expect(result?.container.innerHTML).toMatchSnapshot();
                                expect(md.minZoom).toStrictEqual(12);
                                expect(md.sqlWorkers).toStrictEqual(4);
                                expect(md.backendType).toStrictEqual('sync');
                                res();
                            } catch (e) {
                                rej(e);
                            }
                        }}
                    />
                </RMap>
            );
        });

        // check that the pool has been destroyed
        // (alas, this can be tested only for React >= 16.9 bit it should for all versions)
        if (reactMajorVersion > 16 || (reactMajorVersion === 16 && reactMinorVersion >= 9)) {
            await act(async () => {
                result?.rerender(<RMap {...common.mapProps}></RMap>);
            });
            expect(poolClose).toHaveBeenCalledTimes(1);
        }
    });

    it('should support the shared backend', async () => {
        let poolClose: (() => Promise<void>) | undefined;
        let result: RenderResult | undefined;
        await new Promise<void>((res, rej) => {
            const layer = React.createRef() as React.RefObject<RLayerRasterMBTiles>;
            result = render(
                <RMap {...common.mapProps}>
                    <RLayerRasterMBTiles
                        ref={layer}
                        url='https://velivole.b-cdn.net/tiles-RGR92UTM40S.mbtiles'
                        backend='shared'
                        onMetadataReady={function (md) {
                            try {
                                md.pool?.then((p) => {
                                    poolClose = p.close = jest.fn(p.close);
                                });
                                expect(this).toBeInstanceOf(RLayerRasterMBTiles);
                                expect(result?.container.innerHTML).toMatchSnapshot();
                                expect(md.minZoom).toStrictEqual(12);
                                expect(md.sqlWorkers).toStrictEqual(4);
                                expect(md.backendType).toStrictEqual('shared');
                                res();
                            } catch (e) {
                                rej(e);
                            }
                        }}
                    />
                </RMap>
            );
        });
        if (reactMajorVersion > 16 || (reactMajorVersion === 16 && reactMinorVersion >= 9)) {
            await act(async () => {
                result?.rerender(<RMap {...common.mapProps}></RMap>);
            });
            expect(poolClose).toHaveBeenCalledTimes(1);
        }
    });
});

describe('<RLayerVectorMBTiles>', () => {
    it('should load an MBTiles vector layer', async () => {
        let poolClose: (() => Promise<void>) | undefined;
        let result: RenderResult | undefined;

        // render
        await new Promise<void>((res, rej) => {
            const layer = React.createRef() as React.RefObject<RLayerVectorMBTiles>;
            result = render(
                <RMap {...common.mapProps}>
                    <RLayerVectorMBTiles
                        ref={layer}
                        url='https://velivole.b-cdn.net/maptiler-osm-2017-07-03-v3.6.1-europe.mbtiles'
                        onMetadataReady={function (md) {
                            try {
                                md.pool?.then((p) => {
                                    poolClose = p.close = jest.fn(p.close);
                                });
                                expect(this).toBeInstanceOf(RLayerVectorMBTiles);
                                expect(result?.container.innerHTML).toMatchSnapshot();
                                expect(md.minZoom).toStrictEqual(12);
                                expect(md.sqlWorkers).toStrictEqual(4);
                                expect(md.backendType).toStrictEqual('sync');
                                res();
                            } catch (e) {
                                rej(e);
                            }
                        }}
                    />
                </RMap>
            );
        });

        // check that the pool has been destroyed
        // (alas, this can be tested only for React >= 16.9 bit it should for all versions)
        if (reactMajorVersion > 16 || (reactMajorVersion === 16 && reactMinorVersion >= 9)) {
            await act(async () => {
                result?.rerender(<RMap {...common.mapProps}></RMap>);
            });
            expect(poolClose).toHaveBeenCalledTimes(1);
        }
    });
});
