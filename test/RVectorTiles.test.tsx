window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {MVT} from 'ol/format';
import {Pixel} from 'ol/pixel';
import {RLayerVectorTile, RMap} from 'reactlayers';
import * as common from './common';

const props = {
    url: 'https://reactlayers.meteo.guru/tiles/admin/{z}/{x}/{y}',
    style: common.styles.yellow,
    format: new MVT()
};

describe('<RLayerVectorTiles>', () => {
    it('should create a vector layer', async () => {
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
        expect(handler.mock.calls.length).toBe(mapEvents.length);
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

        expect(handlers.onPointerEnter.mock.calls.length).toBe(0);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(0);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(1);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(0);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 20));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(2);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(1);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(2);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(2);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 10));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(3);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(2);

        map.current.ol.dispatchEvent(common.createEvent('pointermove', map.current.ol, 0));
        expect(handlers.onPointerEnter.mock.calls.length).toBe(3);
        expect(handlers.onPointerLeave.mock.calls.length).toBe(3);

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
});
