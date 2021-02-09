window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map, MapBrowserEvent, OSM} from 'react-layers';
//import Event from 'ol/events/Event';
import {fromLonLat} from 'ol/proj';

const props = {
    center: fromLonLat([2.364, 48.82]),
    zoom: 11
};

describe('<Map>', () => {
    it('should display an OSM map', async () => {
        const {container} = render(
            <Map className='example-map' {...props}>
                <OSM />
            </Map>
        );
        const tree = container.innerHTML;
        expect(tree).toMatchSnapshot();
    });
    it('should display an OSM map w/width&height', async () => {
        const {container} = render(
            <Map width={100} height={100} {...props}>
                <OSM />
            </Map>
        );
        const tree = container.innerHTML;
        expect(tree).toMatchSnapshot();
    });
    it('should handle Map events', async () => {
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
        const {container} = render(
            <Map
                ref={map}
                width={100}
                height={100}
                {...mapEvents.map((ev) => 'on' + ev).reduce((ac, a) => ({...ac, [a]: handler}), {})}
                {...props}
            >
                <OSM />
            </Map>
        );
        for (const evname of mapEvents) {
            const event = {clientX: 10, clientY: 10} as unknown;
            const clickEvent = new MapBrowserEvent(
                evname.toLowerCase(),
                map.current.ol,
                event as UIEvent
            );
            map.current.ol.dispatchEvent(clickEvent);
        }
        const tree = container.innerHTML;
        expect(tree).toMatchSnapshot();
        expect(handler.mock.calls.length).toBe(mapEvents.length);
    });
});
