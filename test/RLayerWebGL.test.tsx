window.URL.createObjectURL = jest.fn();
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {RLayerTileWebGL, RMap, ROSMWebGL} from 'rlayers';
import * as common from './common';

describe('<ROSMWebGL>', () => {
    it('should display an OSM map by WebGL', async () => {
        const osm = React.createRef() as React.RefObject<ROSMWebGL>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <ROSMWebGL ref={osm} cacheSize={1024} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((osm.current?.ol as any).cacheSize_).toBe(1024);
    });
});

describe('<RLayerTileWebGL>', () => {
    it('should display an tile layer by WebGL', async () => {
        const layer = React.createRef() as React.RefObject<RLayerTileWebGL>;
        const {container} = render(
            <RMap {...common.mapProps}>
                <RLayerTileWebGL
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    ref={layer}
                    cacheSize={1024}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((layer.current?.ol as any).cacheSize_).toBe(1024);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((layer.current?.source as any).crossOrigin).toBe('anonymous');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((layer.current?.source as any).interpolate_).toBeTruthy();
    });
});
