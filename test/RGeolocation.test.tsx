window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {RGeolocation, RMap, ROSM} from 'rlayers';
import * as common from './common';

describe('<RGeolocation>', () => {
    it('should create a Geolocation wrapper', async () => {
        const ref = React.createRef() as React.RefObject<RGeolocation>;
        const handler = jest.fn();
        const {container} = render(
            <RMap {...common.mapProps}>
                <ROSM />
                <RGeolocation ref={ref} onChange={handler} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RGeolocation);
        expect(ref.current.ol.getListeners('change')[0]).toBe(handler);
    });
    it('should throw without a map', async () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RGeolocation />)).toThrow('must be part of');
        console.error = err;
    });
});
