window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {LayerVector, Map, MapBrowserEvent, OSM} from 'react-layers';
import {fromLonLat} from 'ol/proj';

const props = {
    center: fromLonLat([2.364, 48.82]),
    width: 100,
    height: 100,
    zoom: 11
};

function createEvent(evname, map) {
    const event = {clientX: 10, clientY: 10} as unknown;
    return new MapBrowserEvent(evname.toLowerCase(), map, event as UIEvent);
}

describe('<Map>', () => {
    it('should display an OSM map', async () => {
        const {container} = render(
            <Map {...props}>
                <OSM />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should display an OSM map w/className', async () => {
        const {container} = render(
            <Map className='example-map' {...props}>
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
        const handlers = mapEvents
            .map((ev) => 'on' + ev)
            .reduce((ac, a) => ({...ac, [a]: handler}), {});
        expect(
            render(
                <Map ref={map} {...props} {...handlers}>
                    <OSM />
                </Map>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(createEvent(evname, map.current.ol));
        expect(
            render(
                <Map className='newclass' ref={map} {...props} {...handlers}>
                    <OSM />
                </Map>
            ).container.innerHTML
        ).toMatchSnapshot();
        for (const evname of mapEvents)
            map.current.ol.dispatchEvent(createEvent(evname, map.current.ol));
        expect(handler.mock.calls.length).toBe(mapEvents.length * 2);
    });
});
