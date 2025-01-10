import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {Style, Stroke} from 'ol/style';
import {RMap, RInteraction, RLayerVector} from 'rlayers';
import {RBaseInteraction} from 'rlayers/interaction';
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
        const end = ref.current?.ol.getListeners('boxend');
        const start = ref.current?.ol.getListeners('boxstart');
        if (end === undefined || start === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);
        unmount();
    });
    it('should throw an error without a Map', () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() => render(<RInteraction.RDragBox />)).toThrow('must be part of a');
        // eslint-disable-next-line no-console
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
        const end = ref.current?.ol.getListeners('boxend');
        if (end === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(end[0], handler);
        expect(ref.current?.ol.getListeners('boxstart')).toBeUndefined();
        const first = ref.current?.ol;

        rerender(
            <RMap {...common.mapProps}>
                <RInteraction.RDragBox ref={ref} minArea={1} onBoxStart={handler} />
            </RMap>
        );
        expect(ref.current).toBeInstanceOf(RInteraction.RDragBox);
        expect(ref.current?.ol.getListeners('boxend')).toBeUndefined();
        const start = ref.current?.ol.getListeners('boxstart');
        if (start === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(start[0], handler);
        expect(ref.current?.ol !== first).toBeTruthy();
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
        expect(ref.current?.ol.getHitTolerance()).toBe(5);
        const end = ref.current?.ol.getListeners('translateend');
        const start = ref.current?.ol.getListeners('translatestart');
        if (end === undefined || start === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);
        unmount();
    });

    it('should support filtering', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RTranslate>;
        const handler = jest.fn();
        const filter = jest.fn(() => true);
        const component = (
            <RMap {...common.mapProps}>
                <RInteraction.RTranslate
                    hitTolerance={5}
                    ref={ref}
                    filter={filter}
                    onTranslateEnd={handler}
                    onTranslateStart={handler}
                />
            </RMap>
        );
        const {rerender} = render(component);

        const end = ref.current?.ol.getListeners('translateend');
        const start = ref.current?.ol.getListeners('translatestart');
        if (end === undefined || start === undefined) throw new Error('listeners not installed');

        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        common.expectToCall((ref.current?.ol as any).filter_, filter);

        rerender(component);
        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        common.expectToCall((ref.current?.ol as any).filter_, filter);
    });

    it('should not lose event handlers on update', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RTranslate>;
        const handler = jest.fn();
        const {rerender} = render(
            <RMap {...common.mapProps}>
                <RInteraction.RTranslate
                    hitTolerance={5}
                    ref={ref}
                    onTranslateEnd={handler}
                    onTranslateStart={handler}
                />
            </RMap>
        );

        let end = ref.current?.ol.getListeners('translateend');
        let start = ref.current?.ol.getListeners('translatestart');
        if (end === undefined || start === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);

        rerender(
            <RMap {...common.mapProps}>
                <RInteraction.RTranslate
                    hitTolerance={5}
                    filter={() => true}
                    ref={ref}
                    onTranslateEnd={handler}
                    onTranslateStart={handler}
                />
            </RMap>
        );
        end = ref.current?.ol.getListeners('translateend');
        start = ref.current?.ol.getListeners('translatestart');
        if (end === undefined || start === undefined) throw new Error('listeners not installed');
        common.expectToCallListener(end[0], handler);
        common.expectToCallListener(start[0], handler);
    });
});

describe('<RDraw>', () => {
    it('should create a Draw interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RDraw>;
        const handler = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RDraw type={'Circle'} ref={ref} condition={handler} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RDraw);
        unmount();
    });
    it('should support styles', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RDraw>;
        const style = new Style({
            stroke: new Stroke({
                color: 'red',
                width: 3
            })
        });
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RDraw type={'Circle'} ref={ref} style={style} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RDraw);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const styleResult = (ref.current?.ol as any).overlay_.style_ as Style;
        expect(styleResult.getStroke()?.getWidth?.()).toBe(3);
        unmount();
    });
    it('should throw without LayerVector', async () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <RInteraction.RDraw type={'Circle'} />
                </RMap>
            )
        ).toThrow('part of');
        // eslint-disable-next-line no-console
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
    it('should support styles', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RModify>;
        const style = new Style({
            stroke: new Stroke({
                color: 'red',
                width: 8
            })
        });
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RModify ref={ref} style={style} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RModify);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const styleResult = (ref.current?.ol as any).overlay_.style_ as Style;
        expect(styleResult.getStroke()?.getWidth?.()).toBe(8);
        unmount();
    });
    it('should throw without LayerVector', async () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <RInteraction.RModify />
                </RMap>
            )
        ).toThrow('part of');
        // eslint-disable-next-line no-console
        console.error = err;
    });
});

describe('<RSelect>', () => {
    it('should create a Select interaction', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RSelect>;
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RSelect ref={ref} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RSelect);
        unmount();
    });
    it('should support styles', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RSelect>;
        const style = new Style({
            stroke: new Stroke({
                color: 'red',
                width: 3
            })
        });
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RInteraction.RSelect ref={ref} style={style} />
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RSelect);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const styleResult = (ref.current?.ol as any).style_ as Style;
        expect(styleResult.getStroke()?.getWidth?.()).toBe(3);
        unmount();
    });
    it('can be used directly inside a map', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RSelect>;
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RInteraction.RSelect ref={ref} />
                <RLayerVector/>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RSelect);
        // Should have no layer filter
        expect((ref.current?.ol as any).layerFilter_?.()).toBe(true);
        unmount();
    });
    it('can be used inside a layer', async () => {
        const ref = React.createRef() as React.RefObject<RInteraction.RSelect>;
        const layerRef = React.createRef() as React.RefObject<RLayerVector>;
        const otherLayerRef = React.createRef() as React.RefObject<RLayerVector>;
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={layerRef}>
                    <RInteraction.RSelect ref={ref} />
                </RLayerVector>
                <RLayerVector ref={otherLayerRef} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current).toBeInstanceOf(RInteraction.RSelect);
        // Should include a filter for the containing layer
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((ref.current?.ol as any).layerFilter_?.(layerRef.current?.ol)).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((ref.current?.ol as any).layerFilter_?.(otherLayerRef.current?.ol)).toBe(false);
        unmount();
    });
});

describe('<RBaseInteraction>', () => {
    it('should throw', async () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() =>
            render(
                <RMap {...common.mapProps}>
                    <RBaseInteraction />
                </RMap>
            )
        ).toThrow('RBaseInteraction should not be directly instantiated');
        // eslint-disable-next-line no-console
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
