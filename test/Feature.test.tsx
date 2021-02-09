window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {fromLonLat} from 'ol/proj';
import {Polygon, Point} from 'ol/geom';
import {Feature, LayerVector, Map} from 'react-layers';
import * as common from './common';

describe('<Feature>', () => {
    it('should create features', async () => {
        const mapEvents = ['Click', 'PointerDrag', 'PointerMove'];
        const handler = jest.fn();
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const map = React.createRef() as React.RefObject<Map>;
        const ref = [
            React.createRef() as React.RefObject<Feature>,
            React.createRef() as React.RefObject<Feature>
        ];
        const {container, unmount} = render(
            <Map ref={map} {...common.mapProps}>
                <LayerVector zIndex={10}>
                    <Feature
                        ref={ref[0]}
                        {...handlers}
                        style={common.styles.blueDot}
                        geometry={new Point(fromLonLat(common.coords.ArcDeTriomphe))}
                    ></Feature>
                    <Feature
                        ref={ref[1]}
                        {...handlers}
                        style={common.styles.yellow}
                        geometry={
                            new Polygon([
                                [
                                    fromLonLat(common.coords.PlaceDItalie),
                                    fromLonLat(common.coords.Bastille),
                                    fromLonLat(common.coords.TourEiffel),
                                    fromLonLat(common.coords.PlaceDItalie)
                                ]
                            ])
                        }
                    ></Feature>
                </LayerVector>
            </Map>
        );
        for (const evname of mapEvents)
            for (const r of ref)
                r.current.ol.dispatchEvent(
                    common.createEvent(evname.toLowerCase(), map.current.ol)
                );
        expect(container.innerHTML).toMatchSnapshot();
        expect(handler.mock.calls.length).toBe(mapEvents.length * 2);
        unmount();
    });
    it('should throw an error without a Layer', () => {
        jest.spyOn(console, 'error');
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<Feature />)).toThrow('must be part of a');
        console.error = err;
    });
});
