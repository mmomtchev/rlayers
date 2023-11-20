import * as fs from 'fs';
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {Feature} from 'ol';
import {Geometry, Point} from 'ol/geom';
import RenderFeature from 'ol/render/Feature';
import JSONFeature from 'ol/format/JSONFeature';
import SourceVector from 'ol/source/Vector';

import {RFeature, RLayerVector, RContext, RMap, RLayerVectorImage} from 'rlayers';
import * as common from './common';

const parser = new GeoJSON({featureProjection: 'EPSG:3857'});
const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/departements.geo.json', 'utf-8'));
const features = parser.readFeatures(geojsonFeatures) as Feature<Geometry>[];

describe('<RLayerVector>', () => {
    it('should create and remove a vector layer', async () => {
        const refVector = React.createRef() as React.RefObject<RLayerVector>;
        const refMap = React.createRef() as React.RefObject<RMap>;
        const {container, unmount, rerender} = render(
            <RMap ref={refMap} {...common.mapProps}>
                <RLayerVector ref={refVector} renderBuffer={250} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(refVector.current).toBeInstanceOf(RLayerVector);
        expect(refMap.current?.ol.getLayers().getLength()).toBe(1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((refVector.current?.ol as any).renderBuffer_).toBe(250);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((refVector.current?.source as any).wrapX_).toBeTruthy();
        rerender(<RMap ref={refMap} {...common.mapProps}></RMap>);
        expect(refVector.current).toBeNull();
        expect(refMap.current?.ol.getLayers().getLength()).toBe(0);
        expect(refMap.current?.ol);
        unmount();
    });
    it('should support feature typing through generics', async () => {
        type OLFeaturePoint = RenderFeature extends ReturnType<JSONFeature['readFeatures']>[0]
            ? Feature<Point>
            : Point;

        const ref = React.createRef<RLayerVector<OLFeaturePoint>>();

        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector<OLFeaturePoint> ref={ref} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.source).toBeInstanceOf(SourceVector<OLFeaturePoint>);
        unmount();
    });
    it('should throw an error without a Map', () => {
        // eslint-disable-next-line no-console
        const err = console.error;
        // eslint-disable-next-line no-console
        console.error = () => undefined;
        expect(() => render(<RLayerVector />)).toThrow('must be part of');
        // eslint-disable-next-line no-console
        console.error = err;
    });
    it('should load GeoJSON features', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVector>;
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={ref} zIndex={10} features={features} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.source.getFeatures().length).toBe(geojsonFeatures.features.length);
        unmount();
    });
    it('should call the loading features handlers', (done) => {
        const map = React.createRef<RMap>();
        const ref = React.createRef<RLayerVector>();
        const handlerLoadStart = jest.fn(common.handlerCheckContext(RLayerVector, ['map'], [map]));
        const handlerLoadEnd = jest.fn(() => {
            expect(handlerLoadStart).toHaveBeenCalledTimes(1);
            common.handlerCheckContext(RLayerVector, ['map'], [map]);
            done();
        });
        const {container, unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector
                    ref={ref}
                    features={features}
                    loader={(extent, resolution, projection, ok, error) => {
                        if (ok) ok(features);
                    }}
                    onFeaturesLoadStart={handlerLoadStart}
                    onFeaturesLoadEnd={handlerLoadEnd}
                />
            </RMap>
        );
        if (!ref.current) throw new Error('failed rendering');
        ref.current.source.loadFeatures(
            ref.current.source.getExtent(),
            1000,
            ref.current.source.getProjection()!
        );
        unmount();
    });
    it('should call event handlers on features added after creation', async () => {
        const map = React.createRef<RMap>();
        const ref = React.createRef<RLayerVector>();
        const handler = jest.fn(common.handlerCheckContext(RLayerVector, ['map'], [map]));
        const {unmount} = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={ref} zIndex={10} onClick={handler} />
            </RMap>
        );

        const f = new Feature(new Point([0, 0]));
        common.installMapFeaturesInterceptors(map.current!.ol, [
            {pixel: [10, 10], layer: ref.current!.ol, feature: f}
        ]);
        ref.current?.source.addFeature(f);

        map.current?.ol.dispatchEvent(common.createEvent('click', map.current.ol, [10, 10]));
        expect(handler).toHaveBeenCalledTimes(1);
        unmount();
    });
    it('should load trigger addFeature', async () => {
        const addFeature = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector zIndex={10} onAddFeature={addFeature}>
                    <RFeature feature={features[0]}>
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature).toHaveBeenCalledTimes(1);
        unmount();
    });
    it('should load trigger addFeature/w multiple features', async () => {
        const addFeature = jest.fn();
        const vector = React.createRef() as React.RefObject<RLayerVector>;
        const {container, unmount, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={vector} zIndex={10} onAddFeature={addFeature}>
                    {features.map((f, i) => (
                        <RFeature key={i} feature={f}>
                            <RContext.Consumer>
                                {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                            </RContext.Consumer>
                        </RFeature>
                    ))}
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature).toHaveBeenCalledTimes(features.length);
        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector ref={vector} zIndex={9}>
                    {features.map((f, i) => (
                        <RFeature style={common.styles.blueDot} key={i} feature={f}>
                            <RContext.Consumer>
                                {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                            </RContext.Consumer>
                        </RFeature>
                    ))}
                </RLayerVector>
            </RMap>
        );
        expect(addFeature).toHaveBeenCalledTimes(features.length);
        expect(vector.current?.ol.getListeners('addfeature')).toBeUndefined();
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should handle Vector Feature events w/update', async () => {
        const mapEvents = ['Click', 'PointerMove'];
        const handler = jest.fn();
        const map = React.createRef() as React.RefObject<RMap>;
        const layer = React.createRef() as React.RefObject<RLayerVector>;
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const render1 = render(
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={layer} {...handlers} features={features} />
            </RMap>
        );
        common.installMapFeaturesInterceptors(
            map.current!.ol,
            layer
                .current!.ol.getSource()!
                .getFeatures()
                .map((f, i) => ({pixel: [i, i], layer: layer.current!.ol, feature: f}))
        );
        expect(render1.container.innerHTML).toMatchSnapshot();
        for (const evname of mapEvents)
            for (const f in layer.current?.ol.getSource()?.getFeatures() || []) {
                map.current?.ol.dispatchEvent(common.createEvent(evname, map.current.ol, [+f, +f]));
            }
        render1.unmount();
        // unmount -> remount -> should render the same
        const comp = (
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={layer} {...handlers} features={features} />
            </RMap>
        );
        const render2 = render(comp);
        expect(render2.container.innerHTML).toMatchSnapshot();
        common.installMapFeaturesInterceptors(
            map.current!.ol,
            layer
                .current!.ol.getSource()!
                .getFeatures()
                .map((f, i) => ({pixel: [i, i], layer: layer.current!.ol, feature: f}))
        );
        for (const evname of mapEvents)
            for (const i in layer.current?.ol.getSource()?.getFeatures() || []) {
                const f = (layer.current?.ol.getSource()?.getFeatures() || [])[i];
                // do not lose handlers
                map.current?.ol.dispatchEvent(common.createEvent(evname, map.current.ol, [+i, +i]));
            }
        // rerender -> should render the same
        render2.rerender(comp);
        for (const evname of mapEvents)
            for (const i in layer.current?.ol.getSource()?.getFeatures() || []) {
                const f = (layer.current?.ol.getSource()?.getFeatures() || [])[i];
                // do not lose handlers
                map.current?.ol.dispatchEvent(common.createEvent(evname, map.current.ol, [+i, +i]));
            }
        expect(render2.container.innerHTML).toMatchSnapshot();
        expect(handler).toHaveBeenCalledTimes(mapEvents.length * features.length * 3);
    });
    it('should support updating the style', async () => {
        const comp = (style) => (
            <RMap {...common.mapProps}>
                <RLayerVector zIndex={10} style={style}>
                    <RFeature feature={features[0]}>
                        <RContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        const {container, rerender, unmount} = render(comp(common.styles.blueDot));
        expect(container.innerHTML).toMatchSnapshot();
        rerender(comp(common.styles.yellow));
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should update the url', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVector>;
        const comp = (url) => (
            <RMap {...common.mapProps}>
                <RLayerVector ref={ref} format={parser} url={url} />
            </RMap>
        );
        const {rerender, container, unmount} = render(comp('http://url1'));
        if (ref.current === null) throw new Error('failed rendering map');
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current?.source.getUrl()).toEqual('http://url1');
        const handler = jest.fn(ref.current?.source.setUrl);
        ref.current.source.setUrl = handler;
        rerender(comp('http://url2'));
        expect(container.innerHTML).toMatchSnapshot();
        expect(handler.mock.calls[0]).toEqual(['http://url2']);
        unmount();
    });
    it('should support disabling of the AM wrapping', async () => {
        const refVector = React.createRef() as React.RefObject<RLayerVector>;
        const refMap = React.createRef() as React.RefObject<RMap>;
        const {container, unmount} = render(
            <RMap ref={refMap} {...common.mapProps}>
                <RLayerVector ref={refVector} wrapX={false} />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(refVector.current).toBeInstanceOf(RLayerVector);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((refVector.current?.source as any).wrapX_).toBeFalsy();
        unmount();
    });
});

describe('<RLayerVectorImage>', () => {
    it('should create and remove a vector layer', async () => {
        const refVector = React.createRef() as React.RefObject<RLayerVectorImage>;
        const refMap = React.createRef() as React.RefObject<RMap>;
        const {container, unmount, rerender} = render(
            <RMap ref={refMap} {...common.mapProps}>
                <RLayerVectorImage
                    url={'http://url1'}
                    format={parser}
                    ref={refVector}
                    renderBuffer={250}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(refVector.current).toBeInstanceOf(RLayerVectorImage);
        expect(refMap.current?.ol.getLayers().getLength()).toBe(1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((refVector.current?.ol as any).renderBuffer_).toBe(250);
        expect(refVector.current?.source.getUrl()).toBe('http://url1');

        rerender(<RMap ref={refMap} {...common.mapProps}></RMap>);
        expect(refVector.current).toBeNull();
        expect(refMap.current?.ol.getLayers().getLength()).toBe(0);
        expect(refMap.current?.ol);

        rerender(
            <RMap ref={refMap} {...common.mapProps}>
                <RLayerVectorImage
                    url={'http://url2'}
                    format={parser}
                    ref={refVector}
                    renderBuffer={250}
                />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(refVector.current?.source.getUrl()).toBe('http://url2');
        unmount();
    });
});
