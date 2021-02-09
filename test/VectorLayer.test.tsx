window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Feature, LayerVector, Map, MapBrowserEvent, OSM} from 'react-layers';
import {fromLonLat} from 'ol/proj';
import {GeoJSON} from 'ol/format';

const props = {
    center: fromLonLat([2.364, 48.82]),
    width: 100,
    height: 100,
    zoom: 11
};

function createEvent(evname, map) {
    const event = {clientX: 0, clientY: 0} as unknown;
    return new MapBrowserEvent(evname.toLowerCase(), map, event as UIEvent);
}

const geojsonFeatures = JSON.parse(fs.readFileSync('examples/data/departements.geo.json', 'utf-8'));
const features = new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(geojsonFeatures);

describe('<LayerVector>', () => {
    it('should create a vector layer', async () => {
        const {container, unmount} = render(
            <Map {...props}>
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
            <Map {...props}>
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
            <Map {...props}>
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
            <Map {...props}>
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
        const handlers = mapEvents
            .map((ev) => 'on' + ev)
            .reduce((ac, a) => ({...ac, [a]: handler}), {});
        const render1 = render(
            <Map ref={map} {...props}>
                <LayerVector ref={layer} {...handlers} features={features} />
            </Map>
        );
        expect(render1.container.innerHTML).toMatchSnapshot();
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures())
                f.dispatchEvent(createEvent(evname, map.current.ol));
        render1.unmount();
        // unmount -> remount -> should render the same
        const render2 = render(
            <Map ref={map} {...props}>
                <LayerVector ref={layer} {...handlers} features={features} />
            </Map>
        );
        for (const evname of mapEvents)
            for (const f of layer.current.ol.getSource().getFeatures()) {
                // do not lose handlers
                f.dispatchEvent(createEvent(evname, map.current.ol));
                // do not leak handlers
                expect(f.getListeners(evname.toLowerCase()).length).toBe(1);
            }
        render2.unmount();
        expect(handler.mock.calls.length).toBe(mapEvents.length * features.length * 2);
    });
});
