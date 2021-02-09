window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {GeoJSON} from 'ol/format';
import {Feature, LayerVector, Map} from 'react-layers';
import * as common from './common';

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/departements.geo.json', 'utf-8'));
const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geojsonFeatures);

describe('<LayerVector>', () => {
    it('should create a vector layer', async () => {
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerVector />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        unmount();
    });
    it('should throw an error without a Map', () => {
        jest.spyOn(console, 'error');
        const err = console.error;
        console.error = () => undefined;
        expect(() => render(<LayerVector />)).toThrow('layer must be part of a map');
        console.error = err;
    });
    it('should load GeoJSON features', async () => {
        const ref = React.createRef() as React.RefObject<LayerVector>;
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerVector ref={ref} zIndex={10} features={features} />
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(ref.current.source.getFeatures().length).toBe(geojsonFeatures.features.length);
        unmount();
    });
    it('should load trigger addFeature', async () => {
        const addFeature = jest.fn();
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerVector zIndex={10} onAddFeature={addFeature}>
                    <Feature feature={features[0]} />
                </LayerVector>
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature.mock.calls.length).toBe(1);
        unmount();
    });
    it('should load trigger addFeature/w multiple', async () => {
        const addFeature = jest.fn();
        const {container, unmount} = render(
            <Map {...common.mapProps}>
                <LayerVector zIndex={10} onAddFeature={addFeature}>
                    {features.map((f, i) => (
                        <Feature key={i} feature={f} />
                    ))}
                </LayerVector>
            </Map>
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(addFeature.mock.calls.length).toBe(features.length);
        unmount();
    });
    it('should handle Vector Feature events w/update', async () => {
        const mapEvents = ['Click', 'PointerMove'];
        const handler = jest.fn();
        const map = React.createRef() as React.RefObject<Map>;
        const layer = React.createRef() as React.RefObject<LayerVector>;
        const handlers = mapEvents.reduce((ac, a) => ({...ac, ['on' + a]: handler}), {});
        const render1 = render(
            <Map ref={map} {...common.mapProps}>
                <LayerVector ref={layer} {...handlers} features={features} />
            </Map>
        );
        expect(render1.container.innerHTML).toMatchSnapshot();
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures())
                f.dispatchEvent(common.createEvent(evname, map.current.ol));
        render1.unmount();
        // unmount -> remount -> should render the same
        const render2 = render(
            <Map ref={map} {...common.mapProps}>
                <LayerVector ref={layer} {...handlers} features={features} />
            </Map>
        );
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures()) {
                // do not lose handlers
                f.dispatchEvent(common.createEvent(evname, map.current.ol));
                // do not leak handlers
                expect(f.getListeners(evname.toLowerCase()).length).toBe(1);
            }
        render2.unmount();
        expect(handler.mock.calls.length).toBe(mapEvents.length * features.length * 2);
    });
});
