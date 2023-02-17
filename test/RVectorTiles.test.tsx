window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {MVT} from 'ol/format';
import {Pixel} from 'ol/pixel';
import {Style} from 'ol/style';
import {Geometry, Point} from 'ol/geom';
import RenderFeature from 'ol/render/Feature';
import {RLayerVectorTile, RMap} from 'rlayers';
import {RStyle, RCircle, RStroke} from 'rlayers/style';
import * as common from './common';
import CircleStyle from 'ol/style/Circle';

const props = {
    url: 'https://rlayers.meteo.guru/tiles/admin/{z}/{x}/{y}',
    style: common.styles.yellow,
    format: new MVT()
};

const dummyGeom = new Point([0, 0]);
const dummyFeat0 = {id: 0} as unknown as RenderFeature;
const dummyFeat1 = {id: 1} as unknown as RenderFeature;

describe('<RLayerVectorTiles>', () => {
    it('should create a vector tile layer', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVectorTile>;
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVectorTile {...props} ref={ref} renderBuffer={250} />
            </RMap>
        );
        expect(ref.current?.source.getProjection()?.getCode()).toBe('EPSG:3857');
        expect(container.innerHTML).toMatchSnapshot();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((ref.current?.ol as any).renderBuffer_).toBe(250);
        unmount();
    });
    it('should throw an error without a Map', () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() => render(<RLayerVectorTile {...props} />)).toThrow('must be part of');
        // eslint-disable-next-line no-console
        console.error = err;
    });
    it('should attach event handlers to features ', async () => {
        const mapEvents = ['Click', 'PointerMove'];
        const handler = jest.fn();
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const map = React.createRef() as React.RefObject<RMap>;
        const layer = React.createRef() as React.RefObject<RLayerVectorTile>;
        const {container, unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVectorTile ref={layer} {...props} {...handlers} />
            </RMap>
        );
        if (map.current === null || layer.current === null) throw new Error('failed rendering map');
        map.current.ol.getSize = () => [common.mapProps.width, common.mapProps.height];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (map.current.ol as any).viewport_ = {
            getBoundingClientRect: () => ({
                width: common.mapProps.width,
                height: common.mapProps.height,
                left: 0,
                top: 0
            })
        };
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (map.current === null || layer.current === null)
                throw new Error('failed rendering map');
            if (pixel[0] === 10) return cb.call(this, dummyFeat0, layer.current.ol, dummyGeom);
            return undefined;
        });
        for (const ev of mapEvents)
            map.current.ol.dispatchEvent(common.createEvent(ev, map.current.ol));
        expect(handler).toHaveBeenCalledTimes(mapEvents.length);
        unmount();
    });
    it('should generate events to features ', async () => {
        const mapEvents = ['PointerEnter', 'PointerLeave'];
        const handlers = {onPointerEnter: jest.fn(), onPointerLeave: jest.fn()};
        const map = React.createRef() as React.RefObject<RMap>;
        const layer = React.createRef() as React.RefObject<RLayerVectorTile>;
        const {container, unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVectorTile ref={layer} {...props} {...handlers} />
            </RMap>
        );
        if (map.current === null || layer.current === null) throw new Error('failed rendering map');
        map.current.ol.getSize = () => [common.mapProps.width, common.mapProps.height];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (map.current.ol as any).viewport_ = {
            getBoundingClientRect: () => ({
                width: common.mapProps.width,
                height: common.mapProps.height,
                left: 0,
                top: 0
            })
        };
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (map.current === null || layer.current === null)
                throw new Error('failed rendering map');
            if (pixel[0] === 10) return cb.call(this, dummyFeat0, layer.current.ol, dummyGeom);
            if (pixel[0] === 20) return cb.call(this, dummyFeat1, layer.current.ol, dummyGeom);
            return undefined;
        });

        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(0);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(0);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(1);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 20));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(2);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(1);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(2);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(2);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(3);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(2);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter).toHaveBeenCalledTimes(3);
        expect(handlers.onPointerLeave).toHaveBeenCalledTimes(3);

        unmount();
    });
    it('should handle rerenders', async () => {
        const comp = (
            <RMap {...common.mapProps}>
                <RLayerVectorTile {...props} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp);
        expect(container.innerHTML).toMatchSnapshot();
        rerender(comp);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should support projections', async () => {
        const layer = React.createRef() as React.RefObject<RLayerVectorTile>;
        const comp = (
            <RMap {...common.mapProps}>
                <RLayerVectorTile projection='EPSG:4326' ref={layer} {...props} />
            </RMap>
        );
        const {unmount} = render(comp);
        expect(layer.current?.source.getProjection()?.getCode()).toBe('EPSG:4326');
        unmount();
    });
    it('should update the style', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVectorTile>;
        const comp = (style) => (
            <RMap {...common.mapProps}>
                <RLayerVectorTile ref={ref} {...{...props, style}} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp(common.styles.yellow));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.ol.getStyle() as Style).getStroke().getWidth()).toBe(4);
        rerender(comp(common.styles.blueDot));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.ol.getStyle() as Style).getStroke().getWidth()).toBe(2);
        unmount();
    });
    it('should update the url', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVectorTile>;
        const comp = (url) => (
            <RMap {...common.mapProps}>
                <RLayerVectorTile ref={ref} {...{...props, url}} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp('http://url1'));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.source.getUrls() || [])[0]).toEqual('http://url1');
        rerender(comp('http://url2'));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current?.source.getUrls() || [])[0]).toEqual('http://url2');
        unmount();
    });
    it('should use inline styles', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVectorTile>;
        const comp = (width: number) => (
            <RMap {...common.mapProps}>
                <RLayerVectorTile ref={ref} {...{...props, style: undefined}}>
                    <RStyle zIndex={2}>
                        <RCircle radius={3}>
                            <RStroke color='#000005' width={width} />
                        </RCircle>
                    </RStyle>
                </RLayerVectorTile>
            </RMap>
        );
        const {rerender, container, unmount} = render(comp(1));
        expect(container.innerHTML).toMatchSnapshot();
        expect(
            ((ref.current?.ol.getStyle() as Style).getImage() as CircleStyle).getStroke().getWidth()
        ).toBe(1);
        rerender(comp(2));
        expect(container.innerHTML).toMatchSnapshot();
        expect(
            ((ref.current?.ol.getStyle() as Style).getImage() as CircleStyle).getStroke().getWidth()
        ).toBe(2);
        unmount();
    });
});
