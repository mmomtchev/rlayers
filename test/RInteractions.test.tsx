window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import GeometryType from 'ol/geom/GeometryType';
import {RMap, RInteraction, RLayerVector} from 'rlayers';
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

describe('<RDraw>', () => {
    it('should create a Draw interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RDraw>;
        const handler = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RDraw
                        type={'Circle' as GeometryType}
                        ref={ref}
                        condition={handler}
                    />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RDraw);
        unmount();
    });
    it('should throw without LayerVector', async () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <RInteraction.RDraw type={'Circle' as GeometryType} />
                </RMap>
            )
        ).toThrowError('part of');
        console.error = err;
    });
});

describe('<RModify>', () => {
    it('should create a Modify interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RModify>;
        const handler = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RModify ref={ref} condition={handler} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RModify);
        unmount();
    });
    it('should throw without LayerVector', async () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <RInteraction.RModify />
                </RMap>
            )
        ).toThrowError('part of');
        console.error = err;
    });
});

describe('Default interactions', () => {
    it('should support manually adding all the default interactions', () => {
        const {container} = render(
            <RMap {...common.mapProps} noDefaultInteractions={true}>
                <RInteraction.RDragRotate duration={100} />
                <RInteraction.RDoubleClickZoom duration={100} />
                <RInteraction.RDragPan kinetic={{decay: 40, delay: 20, minVelocity: 10}} />
                <RInteraction.RPinchRotate duration={100} />
                <RInteraction.RPinchZoom duration={100} />
                <RInteraction.RKeyboardPan duration={100} />
                <RInteraction.RKeyboardZoom duration={100} />
                <RInteraction.RMouseWheelZoom duration={100} />
                <RInteraction.RDragZoom duration={100} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });
});
