window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {MVT} from 'ol/format';
import {Pixel} from 'ol/pixel';
import {Style} from 'ol/style';
import {RLayerVectorTile, RMap} from 'rlayers';
import * as common from './common';

const props = {
    url: 'https://rlayers.meteo.guru/tiles/admin/{z}/{x}/{y}',
    style: common.styles.yellow,
    format: new MVT()
};

describe('<RLayerVectorTiles>', () => {
    it('should create a vector tile layer', async () => {
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVectorTile {...props} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should throw an error without a Map', () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RLayerVectorTile {...props} />)).toThrow('must be part of');
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
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (pixel[0] === 10) return cb.call(this, {id: 0}, layer.current.ol);
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
        map.current.ol.forEachFeatureAtPixel = jest.fn((pixel: Pixel, cb) => {
            if (pixel[0] === 10) return cb.call(this, {id: 0}, layer.current.ol);
            if (pixel[0] === 20) return cb.call(this, {id: 1}, layer.current.ol);
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
    it('should update the style', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVectorTile>;
        const comp = (style) => (
            <RMap {...common.mapProps}>
                <RLayerVectorTile ref={ref} {...{...props, style}} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp(common.styles.yellow));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current.ol.getStyle() as Style).getStroke().getWidth()).toBe(4);
        rerender(comp(common.styles.blueDot));
        expect(container.innerHTML).toMatchSnapshot();
        expect((ref.current.ol.getStyle() as Style).getStroke().getWidth()).toBe(2);
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
        expect(ref.current.source.getUrls()[0]).toEqual('http://url1');
        rerender(comp('http://url2'));
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current.source.getUrls()[0]).toEqual('http://url2');
        unmount();
    });
});
