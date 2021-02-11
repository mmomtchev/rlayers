window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {RMap, ROSM} from 'react-layers';
import * as common from './common';

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
            'RenderComplete'
        ];
        const handler = jest.fn();
        const map = React.createRef() as React.RefObject<RMap>;
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        expect(
            render(
                <RMap ref={map} {...common.mapProps} {...handlers}>
                    <ROSM />
                </RMap>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(
            render(
                <RMap className='newclass' ref={map} {...common.mapProps} {...handlers}>
                    <ROSM />
                </RMap>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(handler.mock.calls.length).toBe(mapEvents.length * 2);
    });
});
