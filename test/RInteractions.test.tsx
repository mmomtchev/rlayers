window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {RMap, RInteraction} from 'rlayers';
import * as common from './common';

describe('<RDragBox>', () => {
    it('should create a DragBox interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RDragBox>;
        const handler = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RInteraction.RDragBox ref={ref} onBoxEnd={handler} onBoxStart={handler} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RDragBox);
        expect(ref.current.ol.getListeners('boxend')[0]).toBe(handler);
        expect(ref.current.ol.getListeners('boxstart')[0]).toBe(handler);
        unmount();
    });
    it('should throw an error without a Map', () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RInteraction.RDragBox />)).toThrow('must be part of a');
        console.error = err;
    });
    it('should update DragBox handlers', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RDragBox>;
        const handler = jest.fn();
        const {rerender} = render(
            <RMap {...common.mapProps}>
                <RInteraction.RDragBox ref={ref} minArea={2} onBoxEnd={handler} />
            </RMap>
        );
        expect(ref.current).toBeInstanceOf(RInteraction.RDragBox);
        expect(ref.current.ol.getListeners('boxend')[0]).toBe(handler);
        expect(ref.current.ol.getListeners('boxstart')).toBeUndefined();
        const first = ref.current.ol;
        rerender(
            <RMap {...common.mapProps}>
                <RInteraction.RDragBox ref={ref} minArea={1} onBoxStart={handler} />
            </RMap>
        );
        expect(ref.current).toBeInstanceOf(RInteraction.RDragBox);
        expect(ref.current.ol.getListeners('boxend')).toBeUndefined();
        expect(ref.current.ol.getListeners('boxstart')[0]).toBe(handler);
        expect(ref.current.ol !== first).toBeTruthy();
    });
});

describe('<RTranslate>', () => {
    it('should create a Translate interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RTranslate>;
        const handler = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RInteraction.RTranslate
                    hitTolerance={5}
                    ref={ref}
                    onTranslateEnd={handler}
                    onTranslateStart={handler}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RTranslate);
        expect(ref.current.ol.getHitTolerance()).toBe(5);
        expect(ref.current.ol.getListeners('translateend')[0]).toBe(handler);
        expect(ref.current.ol.getListeners('translatestart')[0]).toBe(handler);
        unmount();
    });
});
