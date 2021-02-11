window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {RFeature, RLayerVector, RLocationContext, RMap} from 'react-layers';
import * as common from './common';

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/departements.geo.json', 'utf-8'));
const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geojsonFeatures);

describe('<RLayerVector>', () => {
    it('should create a vector layer', async () => {
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector />
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should throw an error without a Map', () => {
        jest.spyOn(console, 'error');
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<RLayerVector />)).toThrow('must be part of');
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
        expect(ref.current.source.getFeatures().length).toBe(geojsonFeatures.features.length);
        unmount();
    });
    it('should load trigger addFeature', async () => {
        const addFeature = jest.fn();
        const {container, unmount} = render(
            <RMap {...common.mapProps}>
                <RLayerVector zIndex={10} onAddFeature={addFeature}>
                    <RFeature feature={features[0]}>
                        <RLocationContext.Consumer>
                            {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                        </RLocationContext.Consumer>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature.mock.calls.length).toBe(1);
        unmount();
    });
    it('should load trigger addFeature/w multiple', async () => {
        const addFeature = jest.fn();
        const vector = React.createRef() as React.RefObject<RLayerVector>;
        const {container, unmount, rerender} = render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={vector} zIndex={10} onAddFeature={addFeature}>
                    {features.map((f, i) => (
                        <RFeature key={i} feature={f}>
                            <RLocationContext.Consumer>
                                {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                            </RLocationContext.Consumer>
                        </RFeature>
                    ))}
                </RLayerVector>
            </RMap>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature.mock.calls.length).toBe(features.length);
        rerender(
            <RMap {...common.mapProps}>
                <RLayerVector ref={vector} zIndex={9}>
                    {features.map((f, i) => (
                        <RFeature style={common.styles.blueDot} key={i} feature={f}>
                            <RLocationContext.Consumer>
                                {(c) => <div>marker {JSON.stringify(c, common.safeStringify)}</div>}
                            </RLocationContext.Consumer>
                        </RFeature>
                    ))}
                </RLayerVector>
            </RMap>
        );
        expect(addFeature.mock.calls.length).toBe(features.length);
        expect(vector.current.ol.getListeners('addfeature')).toBeUndefined();
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
        expect(render1.container.innerHTML).toMatchSnapshot();
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures())
                f.dispatchEvent(common.createEvent(evname, map.current.ol));
        render1.unmount();
        // unmount -> remount -> should render the same
        const comp = (
            <RMap ref={map} {...common.mapProps}>
                <RLayerVector ref={layer} {...handlers} features={features} />
            </RMap>
        );
        const render2 = render(comp);
        expect(render2.container.innerHTML).toMatchSnapshot();
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures()) {
                // do not lose handlers
                f.dispatchEvent(common.createEvent(evname, map.current.ol));
                // do not leak handlers
                expect(f.getListeners(evname.toLowerCase()).length).toBe(1);
            }
        // rerender -> should render the same
        render2.rerender(comp);
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures()) {
                // do not lose handlers
                f.dispatchEvent(common.createEvent(evname, map.current.ol));
                // do not leak handlers
                expect(f.getListeners(evname.toLowerCase()).length).toBe(1);
            }
        expect(render2.container.innerHTML).toMatchSnapshot();
        expect(handler.mock.calls.length).toBe(mapEvents.length * features.length * 3);
    });
});
