window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, getByText, queryByText, render} from '@testing-library/react';

import {Point} from 'ol/geom';
import {Map, OSM, Feature, LayerVector, Popup} from 'react-layers';
import * as common from './common';

describe('<Popup>', () => {
    it('should show a popup on click', async () => {
        const map = React.createRef() as React.RefObject<Map>;
        const feature = React.createRef() as React.RefObject<Feature>;
        const popup = React.createRef() as React.RefObject<Popup>;
        const comp = (
            <Map ref={map} {...common.mapProps}>
                <OSM />
                <LayerVector>
                    <Feature
                        ref={feature}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <Popup ref={popup} trigger={'click'} className='test-popup'>
                            <div id='target'>Popup</div>
                        </Popup>
                    </Feature>
                </LayerVector>
            </Map>
        );
        const {container, rerender} = render(comp);
        expect(popup.current.visible).toBeFalsy();
        expect(container.innerHTML).toMatchSnapshot();
        feature.current.ol.dispatchEvent(common.createEvent('click', map.current.ol));
        rerender(comp);
        expect(popup.current.visible).toBeTruthy();
        expect(container.innerHTML).toMatchSnapshot();
        feature.current.ol.dispatchEvent(common.createEvent('click', map.current.ol));
        rerender(comp);
        expect(popup.current.visible).toBeFalsy();
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should show a popup on hover', async () => {
        const map = React.createRef() as React.RefObject<Map>;
        const feature = React.createRef() as React.RefObject<Feature>;
        const popup = React.createRef() as React.RefObject<Popup>;
        const comp = (
            <Map ref={map} {...common.mapProps}>
                <OSM />
                <LayerVector>
                    <Feature
                        ref={feature}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <Popup ref={popup} trigger={'hover'} delay={{show: 50, hide: 50}}>
                            <div id='target'>Popup</div>
                        </Popup>
                    </Feature>
                </LayerVector>
            </Map>
        );
        const {container, rerender} = render(comp);
        expect(popup.current.visible).toBeFalsy();
        expect(container.innerHTML).toMatchSnapshot();
        feature.current.ol.dispatchEvent(common.createEvent('pointerenter', map.current.ol));
        rerender(comp);
        await new Promise((res) => {
            setTimeout(() => {
                expect(popup.current.visible).toBeTruthy();
                expect(container.innerHTML).toMatchSnapshot();
                feature.current.ol.dispatchEvent(
                    common.createEvent('pointerleave', map.current.ol)
                );
                setTimeout(() => {
                    expect(popup.current.visible).toBeFalsy();
                    expect(container.innerHTML).toMatchSnapshot();
                    res({});
                }, 60);
            }, 60);
        });
    });
    it('should throw an error without a Feature', () => {
        jest.spyOn(console, 'error');
        const err = console.error;
        console.error = () => undefined;
        expect(() =>
            render(
                <Map {...common.mapProps}>
                    <OSM />
                    <LayerVector>
                        <Popup trigger={'click'} className='test-popup'>
                            <div>Popup</div>
                        </Popup>
                    </LayerVector>
                </Map>
            )
        ).toThrow('must be part of a');
        console.error = err;
    });
});
