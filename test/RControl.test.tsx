window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map} from 'ol';

import {RMap, RContext, RControl, ROSM, RLayerStamen} from 'rlayers';
import * as common from './common';

const RControlButton = <button>X</button>;

describe('<RControl>', () => {
    it('should render all the RControls', async () => {
        const comp = (
            <RMap {...common.mapProps} noDefaultControls={true}>
                <RControl.RLayers>
                    <ROSM />
                    <RLayerStamen layer='toner' properties={{label: 'toner'}} />
                </RControl.RLayers>
                <RControl.RScaleLine />
                <RControl.RAttribution />
                <RControl.RZoom />
                <RControl.RZoomSlider />
                <RControl.RCustom className='example-RControl'>
                    <RContext.Consumer>
                        {({map}) => {
                            expect(map).toBeInstanceOf(Map);
                            return RControlButton;
                        }}
                    </RContext.Consumer>
                </RControl.RCustom>
                <RControl.RRotate />
                <RControl.RFullScreen />
                <RControl.RFullScreen
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                <RControl.ROverviewMap className='ol-overviewmap example-overview'>
                    <ROSM />
                </RControl.ROverviewMap>
            </RMap>
        );
        const {container, getByLabelText, rerender, unmount} = render(comp);
        expect(container.innerHTML).toMatchSnapshot();

        const button = container.querySelector('span>button');
        fireEvent.click(button);
        rerender(comp);

        const radio = getByLabelText('toner') as HTMLInputElement;
        fireEvent.click(radio);
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should throw an error without a Map', () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RControl.RZoom />)).toThrow('must be part of');
        console.error = err;
    });
    it('should render the layers RControl with a custom element', async () => {
        const {container} = render(
            <RMap {...common.mapProps}>
                <RControl.RLayers element={RControlButton}>
                    <ROSM />
                </RControl.RLayers>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
});
