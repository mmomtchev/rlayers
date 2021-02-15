window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, getByText, queryByText, render} from '@testing-library/react';

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
});
