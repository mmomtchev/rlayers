import React from 'react';
import {fireEvent, getByText, queryByText, render} from '@testing-library/react';

import {Point} from 'ol/geom';
import {RMap, ROSM, RFeature, RLayerVector, RPopup} from 'rlayers';
import * as common from './common';

describe('<RPopup>', () => {
    it('should show a popup on click', async () => {
        const map = React.createRef<RMap>();
        const feature = React.createRef<RFeature>();
        const popup = React.createRef<RPopup>();
        const layer = React.createRef<RLayerVector>();
        const comp = (
            <RMap ref={map} {...common.mapProps}>
                <ROSM />
                <RLayerVector ref={layer}>
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

        common.installMapFeaturesInterceptors(map.current!.ol, [
            {pixel: [10, 10], layer: layer.current!.ol, feature: feature.current!.ol}
        ]);

        expect(popup.current?.visible).toBeFalsy();
        expect(container.innerHTML).toMatchSnapshot();
        map.current!.ol.dispatchEvent(common.createEvent('click', map.current!.ol, [10, 10]));
        rerender(comp);
        expect(popup.current?.visible).toBeTruthy();
        expect(container.innerHTML).toMatchSnapshot();
        map.current!.ol.dispatchEvent(common.createEvent('click', map.current!.ol, [10, 10]));
        rerender(comp);
        expect(popup.current?.visible).toBeFalsy();
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
        if (map.current === null) throw new Error('failed rendering map');
        expect(popup.current?.visible).toBeFalsy();
        expect(container.innerHTML).toMatchSnapshot();
        feature.current?.ol.dispatchEvent(common.createEvent('pointerenter', map.current.ol));
        rerender(comp);
        await new Promise((res) => {
            setTimeout(() => {
                if (map.current === null) throw new Error('failed rendering map');
                expect(popup.current?.visible).toBeTruthy();
                expect(container.innerHTML).toMatchSnapshot();
                feature.current?.ol.dispatchEvent(
                    common.createEvent('pointerleave', map.current.ol)
                );
                setTimeout(() => {
                    expect(popup.current?.visible).toBeFalsy();
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
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.error = err;
    });
});
