import * as fs from 'fs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {Polygon, Point} from 'ol/geom';
import {Feature} from 'ol';
import {RFeature, RLayerVector, RMap, RContext, ROverlay} from 'rlayers';
import * as common from './common';
import {act} from 'react-dom/test-utils';

describe('<RFeature>', () => {
    it('should create features', async () => {
        const mapEvents = ['Click', 'PointerDrag', 'PointerMove'];
        const featureEvents = ['Change'];
        const handler = jest.fn();
        const handlers = mapEvents
            .concat(featureEvents)
            .reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const map = React.createRef() as React.RefObject<RMap>;
        const ref = [
            React.createRef() as React.RefObject<RFeature>,
            React.createRef() as React.RefObject<RFeature>
        ];
        const {container, unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector zIndex={10}>
                    <RFeature
                        ref={ref[0]}
                        {...handlers}
                        style={common.styles.blueDot}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                    <RFeature
                        ref={ref[1]}
                        {...handlers}
                        style={common.styles.yellow}
                        geometry={
                            new Polygon([
                                [
                                    common.coords.PlaceDItalie,
                                    common.coords.Bastille,
                                    common.coords.TourEiffel,
                                    common.coords.PlaceDItalie
                                ]
                            ])
                        }
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        act(() => {
            if (map.current === null) throw new Error('map.current is null');
            for (const evname of mapEvents)
                for (const r of ref)
                    r.current?.ol.dispatchEvent(
                        common.createEvent(evname.toLowerCase(), map.current.ol)
                    );
            for (const evname of featureEvents)
                for (const r of ref)
                    r.current?.ol.dispatchEvent(
                        common.createEvent(evname.toLowerCase(), map.current.ol)
                    );
        });
        expect(container.innerHTML).toMatchSnapshot();
        // +1 because there is one implicit change at creation
        expect(handler).toHaveBeenCalledTimes((mapEvents.length + featureEvents.length + 1) * 2);
        unmount();
    });

    it('should support updating feature props', async () => {
        const {container, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        properties={{name: 'Arc de Triomphe'}}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    >
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should support replacing the bound feature object', async () => {
        const ref = React.createRef() as React.RefObject<RFeature>;
        const layer = React.createRef() as React.RefObject<RLayerVector>;
        const f1 = new Feature(new Point(common.coords.ArcDeTriomphe));
        const f2 = new Feature(new Point(common.coords.PlaceDItalie));
        const {rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={layer}>
                    <RFeature ref={ref} feature={f1}></RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(ref.current?.ol).toStrictEqual(f1);
        expect((ref.current?.ol?.getGeometry() as Point).getCoordinates()).toEqual(
            common.coords.ArcDeTriomphe
        );
        expect(layer.current?.source.getFeatures().length).toBe(1);

        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector ref={layer}>
                    <RFeature ref={ref} feature={f2}></RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(ref.current?.ol).toStrictEqual(f2);
        expect((ref.current?.ol?.getGeometry() as Point).getCoordinates()).toEqual(
            common.coords.PlaceDItalie
        );
        expect(layer.current?.source.getFeatures().length).toBe(1);

        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector ref={layer} />
            </RMap>
        );
        expect(layer.current?.source.getFeatures().length).toBe(0);
    });

    it('should support deleting features with nested elements', async () => {
        const {container, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        properties={{name: 'Arc de Triomphe'}}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    >
                        <ROverlay>
                            <div>Test</div>
                        </ROverlay>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector></RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should relay map events to features', () => {
        const map = React.createRef<RMap>();
        const features = [React.createRef<RFeature>(), React.createRef<RFeature>()];
        const layer = React.createRef<RLayerVector>();
        const mapEvents = ['Click', 'SingleClick', 'DblClick', 'PointerDrag', 'PointerMove'];
        const handlers = [
            jest.fn(common.handlerCheckContext(RFeature, ['map'], [map])),
            jest.fn(common.handlerCheckContext(RFeature, ['map'], [map])),
            jest.fn(common.handlerCheckContext(RFeature, ['map'], [map]))
        ];
        const handlerProps = [
            mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handlers[0]}), {}),
            mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handlers[1]}), {}),
            mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handlers[2]}), {})
        ];

        // First pass, test installing new handlers
        const {rerender} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={layer}>
                    <RFeature
                        ref={features[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps[0]}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={features[1]}
                        properties={{name: "Place d'Italie"}}
                        {...handlerProps[1]}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                </RLayerVector>
            </RMap>
        );

        common.installMapFeaturesInterceptors(map.current!.ol, [
            {pixel: [10, 10], layer: layer.current!.ol, feature: features[0].current!.ol},
            {pixel: [20, 20], layer: layer.current!.ol, feature: features[1].current!.ol}
        ]);

        act(() => {
            for (const ev of mapEvents) {
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [10, 10]));
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [20, 20]));
            }
        });
        expect(handlers[0]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[1]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[2]).toHaveBeenCalledTimes(0);

        // Second pass, test replacing handlers
        rerender(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        ref={features[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps[2]}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={features[1]}
                        properties={{name: "Place d'Italie"}}
                        {...handlerProps[2]}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                </RLayerVector>
            </RMap>
        );

        act(() => {
            for (const ev of mapEvents) {
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [10, 10]));
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [20, 20]));
            }
        });
        expect(handlers[0]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[1]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[2]).toHaveBeenCalledTimes(mapEvents.length * 2);

        // Third pass, test removing handlers
        rerender(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector>
                    <RFeature
                        ref={features[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={features[1]}
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                </RLayerVector>
            </RMap>
        );

        act(() => {
            for (const ev of mapEvents) {
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [10, 10]));
                map.current?.ol.dispatchEvent(common.createEvent(ev, map.current.ol, [20, 20]));
            }
        });
        expect(handlers[0]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[1]).toHaveBeenCalledTimes(mapEvents.length);
        expect(handlers[2]).toHaveBeenCalledTimes(mapEvents.length * 2);
    });

    it('should generate pointerenter, pointerleave and pointerdragend', () => {
        const map = React.createRef<RMap>();
        const ref = [0, 1, 2].map(() => React.createRef<RFeature<Point>>());
        const layer = React.createRef<RLayerVector<Feature<Point>>>();
        const mapEvents = ['PointerEnter', 'PointerLeave', 'PointerDragEnd'];
        const handlerProps = mapEvents.reduce(
            (ac, a) => ({
                ...ac,
                ['on' + a]: jest.fn(common.handlerCheckContext(RFeature, ['map'], [map]))
            }),
            {}
        );
        const {container} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector<Feature<Point>> ref={layer}>
                    <RFeature<Point>
                        ref={ref[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature<Point>
                        ref={ref[1]}
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                    <RFeature<Point>
                        ref={ref[2]}
                        properties={{name: "Arc de Triomphe' shadow"}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                </RLayerVector>
            </RMap>
        );

        common.installMapFeaturesInterceptors(map.current!.ol, [
            {pixel: [10, 10], layer: layer.current!.ol, feature: ref[0].current!.ol},
            {pixel: [20, 20], layer: layer.current!.ol, feature: ref[1].current!.ol},
            {pixel: [10, 10], layer: layer.current!.ol, feature: ref[2].current!.ol}
        ]);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(0);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [10, 10])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(0);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [20, 20])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(2);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [10, 10])
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(4);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointerdrag', map.current!.ol, [10, 10], true)
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(4);
        expect(handlerProps['onPointerDragEnd']).toHaveBeenCalledTimes(2);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((RFeature as any).lastFeaturesDragged.length).toBe(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((RFeature as any).lastFeaturesEntered.length).toBe(0);
    });

    it('should stop propagation', () => {
        const map = React.createRef<RMap>();
        const ref = [0, 1, 2].map(() => React.createRef<RFeature>());
        const layer = React.createRef<RLayerVector>();
        const mapEvents = ['PointerEnter', 'PointerLeave', 'PointerDragEnd'];
        const handlerProps = mapEvents.reduce(
            (ac, a) => ({
                ...ac,
                ['on' + a]: jest.fn(() => false)
            }),
            {}
        );
        const {container} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={layer}>
                    <RFeature
                        ref={ref[0]}
                        properties={{name: 'Arc de Triomphe'}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                    <RFeature
                        ref={ref[1]}
                        properties={{name: "Place d'Italie"}}
                        geometry={new Point(common.coords.PlaceDItalie)}
                    />
                    <RFeature
                        ref={ref[2]}
                        properties={{name: "Arc de Triomphe' shadow"}}
                        {...handlerProps}
                        geometry={new Point(common.coords.ArcDeTriomphe)}
                    />
                </RLayerVector>
            </RMap>
        );

        common.installMapFeaturesInterceptors(map.current!.ol, [
            {pixel: [10, 10], layer: layer.current!.ol, feature: ref[0].current!.ol},
            {pixel: [20, 20], layer: layer.current!.ol, feature: ref[1].current!.ol},
            {pixel: [10, 10], layer: layer.current!.ol, feature: ref[2].current!.ol}
        ]);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(0);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [10, 10])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(1);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(0);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [20, 20])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(1);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(1);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [10, 10])
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(2);

        act(() => {
            map.current!.ol.dispatchEvent(
                common.createEvent('pointerdrag', map.current!.ol, [10, 10], true)
            );
            map.current!.ol.dispatchEvent(
                common.createEvent('pointermove', map.current!.ol, [0, 0])
            );
        });
        expect(handlerProps['onPointerEnter']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerLeave']).toHaveBeenCalledTimes(2);
        expect(handlerProps['onPointerDragEnd']).toHaveBeenCalledTimes(1);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((RFeature as any).lastFeaturesDragged.length).toBe(0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((RFeature as any).lastFeaturesEntered.length).toBe(0);
    });

    it('should throw an error without a Layer', () => {
        /* eslint-disable no-console */
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RFeature />)).toThrow('must be part of');
        console.error = err;
    });
});
