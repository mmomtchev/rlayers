window.URL.createObjectURL = jest.fn();
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {RMap, ROSM} from 'rlayers';
import * as common from './common';
import {RView} from 'rlayers/RMap';

describe('<RMap>', () => {
    it('should display an OSM map', async () => {
        const {container} = render(
            <RMap {...common.mapProps}>
                <ROSM />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should display an OSM map w/className', async () => {
        const {container} = render(
            <RMap className='example-map' {...common.mapProps}>
                <ROSM />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should display an OSM map w/zoom', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const {container} = render(
            <RMap {...common.mapProps} ref={map} minZoom={1} maxZoom={10}>
                <ROSM />
            </RMap>
        );
        expect(map.current?.ol.getView().getMinZoom()).toBe(1);
        expect(map.current?.ol.getView().getMaxZoom()).toBe(10);
    });
    it('should display an OSM map w/resolution', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        render(
            <RMap {...common.mapProps} ref={map} minResolution={1250} maxResolution={10000}>
                <ROSM />
            </RMap>
        );
        expect(map.current?.ol.getView().getMinResolution()).toBe(1250);
        expect(map.current?.ol.getView().getMaxResolution()).toBe(10000);
    });
    it('should honor resolution when both zoom and resolution are specified', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        render(
            <RMap initial={{...common.mapProps.initial, resolution: 2000}} ref={map}>
                <ROSM />
            </RMap>
        );
        expect(map.current?.ol.getView().getResolution()).toBe(2000);
        expect(map.current?.ol.getView().getZoom()).not.toBe(11);
    });
    it('should handle Map events w/update', async () => {
        const mapEvents = [
            'Click',
            'SingleClick',
            'DblClick',
            'MoveStart',
            'MoveEnd',
            'PointerDrag',
            'PointerMove',
            'PostRender',
            'PreCompose',
            'PostCompose',
            'RenderComplete',
            'Change'
        ];
        const map = React.createRef() as React.RefObject<RMap>;
        const handler = jest.fn(common.handlerCheckContext(RMap, [], []));
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        expect(
            render(
                <RMap ref={map} {...common.mapProps} {...handlers}>
                    <ROSM />
                </RMap>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current?.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(
            render(
                <RMap className='newclass' ref={map} {...common.mapProps} {...handlers}>
                    <ROSM />
                </RMap>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current?.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(handler).toHaveBeenCalledTimes(mapEvents.length * 2);
    });
    it('should support an external view state', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        let view: RView = {center: [0, 0], zoom: 0};
        const mockSetView = jest.fn((r) => (view = r));

        const {rerender} = render(
            <RMap {...common.mapProps} ref={map}>
                <ROSM />
            </RMap>
        );
        rerender(
            <RMap {...common.mapProps} ref={map} view={[common.mapProps.initial, mockSetView]}>
                <ROSM />
            </RMap>
        );
        map.current?.ol.dispatchEvent(common.createEvent('moveend', map.current.ol));
        expect(mockSetView).toHaveBeenCalledTimes(1);
        expect(view.center).toEqual(expect.arrayContaining(common.mapProps.initial.center));
        expect(view.zoom).toBe(common.mapProps.initial.zoom);
        expect(view.resolution).toBeGreaterThan(0);

        view.resolution = 2000;
        rerender(
            <RMap {...common.mapProps} ref={map} view={[view, mockSetView]}>
                <ROSM />
            </RMap>
        );
        expect(map.current?.ol.getView().getResolution()).toBe(2000);
        expect(map.current?.ol.getView().getZoom()).not.toBe(11);

        rerender(
            <RMap {...common.mapProps} ref={map}>
                <ROSM />
            </RMap>
        );
        map.current?.ol.dispatchEvent(common.createEvent('moveend', map.current.ol));
        expect(mockSetView).toHaveBeenCalledTimes(1);
    });
});
