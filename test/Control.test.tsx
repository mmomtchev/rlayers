window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map as OLMap} from 'ol';

import {Map, MapContext, Control, OSM, LayerStamen} from 'react-layers';
import * as common from './common';

const controlButton = <button>X</button>;

describe('<Control>', () => {
    it('should render all the controls', async () => {
        const comp = (
            <Map {...common.mapProps} noDefaultControls={true}>
                <Control.Layers>
                    <OSM />
                    <LayerStamen layer='toner' properties={{label: 'toner'}} />
                </Control.Layers>
                <Control.ScaleLine />
                <Control.Attribution />
                <Control.Zoom />
                <Control.Custom className='example-control'>
                    <MapContext.Consumer>
                        {(map: OLMap) => {
                            expect(map).toBeInstanceOf(OLMap);
                            return controlButton;
                        }}
                    </MapContext.Consumer>
                </Control.Custom>
                <Control.Rotate />
                <Control.FullScreen />
                <Control.FullScreen
                    className='example-fullscreen'
                    source='fullscreen'
                    label='&#x6269;'
                    labelActive='&#x564f;'
                />
                <Control.OverviewMap className='ol-overviewmap example-overview'>
                    <OSM />
                </Control.OverviewMap>
            </Map>
        );
        const {container, getByText, rerender} = render(comp);
        expect(container.innerHTML).toMatchSnapshot();

        const button = container.querySelector('span>button');
        fireEvent.click(button);
        rerender(comp);

        const radio = getByText('toner') as HTMLInputElement;
        expect(radio.checked).toBeFalsy();
        radio.checked = true;
        rerender(comp);
        expect(container.innerHTML).toMatchSnapshot();
    });
    it('should throw an error without a Map', () => {
        jest.spyOn(console, 'error');
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<Control.Zoom />)).toThrow('control must be part of a map');
        console.error = err;
    });
    it('should render the layers control with a custom element', async () => {
        const {container} = render(
            <Map {...common.mapProps}>
                <Control.Layers element={controlButton}>
                    <OSM />
                </Control.Layers>
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
});
