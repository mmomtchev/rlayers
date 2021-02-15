window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, getByText, queryByText, render} from '@testing-library/react';

import {Point} from 'ol/geom';
import {RMap, ROSM, RFeature, RLayerVector, RPopup} from 'reactlayers';
import * as common from './common';

describe('<RPopup>', () => {
    it('should show a popup on click', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const feature = React.createRef() as React.RefObject<RFeature>;
        const popup = React.createRef() as React.RefObject<RPopup>;
        const comp = (
            <RMap ref={map} {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        ref={feature}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RPopup ref={popup} trigger={'click'} className='test-popup'>
                            <div id='target'>Popup</div>
                        </RPopup>
                    </RFeature>
                </RLayerVector>
            </RMap>
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
        const map = React.createRef() as React.RefObject<RMap>;
        const feature = React.createRef() as React.RefObject<RFeature>;
        const popup = React.createRef() as React.RefObject<RPopup>;
        const comp = (
            <RMap ref={map} {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        ref={feature}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RPopup ref={popup} trigger={'hover'} delay={{show: 50, hide: 50}}>
                            <div id='target'>Popup</div>
                        </RPopup>
                    </RFeature>
                </RLayerVector>
            </RMap>
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
    it('should support updating the props', async () => {
        const comp = (trigger, text) => (
            <RMap {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RPopup trigger={trigger} delay={{show: 50, hide: 50}}>
                            <div id='target'>{text}</div>
                        </RPopup>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        const {getByText, rerender, container, unmount} = render(comp('click', 'text1'));
        expect(getByText('text1')).toBeInstanceOf(HTMLDivElement);
        expect(container.innerHTML).toMatchSnapshot();
        rerender(comp('trigger', 'text2'));
        expect(getByText('text2')).toBeInstanceOf(HTMLDivElement);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should throw an error without a Feature', () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <ROSM />
                    <RLayerVector>
                        <RPopup trigger={'click'} className='test-popup'>
                            <div>Popup</div>
                        </RPopup>
                    </RLayerVector>
                </RMap>
            )
        ).toThrow('must be part of a');
        console.error = err;
    });
});
