window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map, OSM} from 'react-layers';
import * as common from './common';

describe('<Map>', () => {
    it('should display an OSM map', async () => {
        const {container} = render(
            <Map {...common.mapProps}>
                <OSM />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should display an OSM map w/className', async () => {
        const {container} = render(
            <Map className='example-map' {...common.mapProps}>
                <OSM />
            </Map>
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
        const map = React.createRef() as React.RefObject<Map>;
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        expect(
            render(
                <Map ref={map} {...common.mapProps} {...handlers}>
                    <OSM />
                </Map>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(
            render(
                <Map className='newclass' ref={map} {...common.mapProps} {...handlers}>
                    <OSM />
                </Map>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(common.createEvent(evname, map.current.ol));
        expect(handler.mock.calls.length).toBe(mapEvents.length * 2);
    });
});
