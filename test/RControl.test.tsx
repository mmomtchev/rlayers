window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map} from 'ol';

import {RMap, RContext, RControl, ROSM, RLayerStamen} from 'rlayers';
import * as common from './common';

const RControlButton = <button>X</button>;

// Various slight differences between the range of supported OpenLayers versions
const backCompat = (html) =>
    html
        .replace('ol-attribution-collapse', 'ol-attribution-collpase')
        .replace(
            '<button title="Toggle full-screen" type="button" class="ol-full-screen-false">',
            '<button type="button" title="Toggle full-screen">'
        )
        .replace(
            '<button title="Toggle full-screen" type="button" class="example-fullscreen-false">',
            '<button type="button" title="Toggle full-screen">'
        );

describe('<RControl>', () => {
    it('should render all the RControls', async () => {
        const comp = (collapsed) => (
            <RMap {...common.mapProps} noDefaultControls={true}>
                <RControl.RLayers>
                    <ROSM />
                    <RLayerStamen layer='toner' properties={{label: 'toner'}} />
                </RControl.RLayers>
                <RControl.RScaleLine />
                <RControl.RAttribution collapsed={collapsed} />
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
                <RControl.ROverviewMap
                    collapsed={collapsed}
                    className='ol-overviewmap example-overview'
                >
                    <ROSM />
                </RControl.ROverviewMap>
            </RMap>
        );
        const {container, getByLabelText, rerender, unmount} = render(comp(false));
        expect(backCompat(container.innerHTML)).toMatchSnapshot();

        const button = container.querySelector('span>button');
        if (button === null) throw new Error('no button');
        fireEvent.click(button);
        rerender(comp(true));

        const radio = getByLabelText('toner') as HTMLInputElement;
        fireEvent.click(radio);
        expect(backCompat(container.innerHTML)).toMatchSnapshot();
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
