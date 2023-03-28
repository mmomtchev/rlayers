import React from 'react';
import {fireEvent, getByText, queryByText, render} from '@testing-library/react';

import {Point} from 'ol/geom';
import {RMap, ROSM, RFeature, RLayerVector, ROverlay} from 'rlayers';
import * as common from './common';

describe('<ROverlay>', () => {
    it('should support updating the props', async () => {
        const comp = (trigger, text) => (
            <RMap {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <ROverlay>
                            <div id='target'>{text}</div>
                        </ROverlay>
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

    it('should support removing the layer', async () => {
        const {container, rerender, unmount} = render(
            <RMap {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <ROverlay>
                            <div id='target'>text</div>
                        </ROverlay>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        rerender(
            <RMap {...common.mapProps}>
                <ROSM />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });

    it('should support autoplacement', async () => {
        const map = React.createRef() as React.RefObject<RMap>;
        const comp = (auto) => (
            <RMap ref={map} {...common.mapProps}>
                <ROSM />
                <RLayerVector>
                    <RFeature
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <ROverlay autoPosition={auto}>
                            <div id='target'>text14</div>
                        </ROverlay>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        const {getByText, container, rerender} = render(comp(false));
        if (map.current === null) throw new Error('failed retrieving component');
        map.current.ol.getSize = () => [15, 15];

        map.current.ol.getPixelFromCoordinate = () => [5, 5];
        rerender(comp(true));
        expect(getByText('text14')).toBeInstanceOf(HTMLDivElement);
        let style = getByText('text14')?.parentElement?.style;
        if (style == null) throw new Error('failed retrieving style');
        expect(style.left).toBe('0px');
        expect(style.top).toBe('0px');
        expect(style.right).toBe('');
        expect(style.bottom).toBe('');
        expect(container.innerHTML).toMatchSnapshot();

        map.current.ol.getPixelFromCoordinate = () => [10, 10];
        rerender(comp(true));
        style = getByText('text14')?.parentElement?.style;
        if (style == null) throw new Error('failed retrieving style');
        expect(container.innerHTML).toMatchSnapshot();
        expect(style.left).toBe('');
        expect(style.top).toBe('');
        expect(style.right).toBe('0px');
        expect(style.bottom).toBe('0px');
    });
});
