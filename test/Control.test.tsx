window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Map as OLMap} from 'ol';

import {Map, MapContext, Control, OSM} from 'react-layers';
import * as common from './common';

const controlButton = <button>X</button>;

describe('<Control>', () => {
    it('should render all the controls', async () => {
        const {container} = render(
            <Map {...common.mapProps} noDefaultControls={true}>
                <Control.Layers>
                    <OSM />
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
                <Control.OverviewMap className='ol-overviewmap example-overview'>
                    <OSM />
                </Control.OverviewMap>
            </Map>
        );
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
