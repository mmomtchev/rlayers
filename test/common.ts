/* istanbul ignore file */
import {Map} from 'ol';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Style, Stroke, Circle, Fill} from 'ol/style';

import {MapBrowserEvent} from 'rlayers';

export const mapProps = {
    center: fromLonLat([2.364, 48.82]),
    width: 500,
    height: 500,
    zoom: 11
};

export function createEvent(
    evname: string,
    map: Map,
    coords?: number,
    dragging?: boolean
): MapBrowserEvent {
    const event = {clientX: coords ?? 10, clientY: coords ?? 10} as unknown;
    return new MapBrowserEvent(evname.toLowerCase(), map, event as UIEvent, dragging);
}

export const _coords: Record<string, Coordinate> = {
    origin: [2.364, 48.82],
    ArcDeTriomphe: [2.295, 48.8737],
    PlaceDItalie: [2.355, 48.831],
    Bastille: [2.369, 48.853],
    TourEiffel: [2.294, 48.858],
    Montmartre: [2.342, 48.887]
};
export const coords = Object.keys(_coords).reduce(
    (ac, p) => ({...ac, [p]: _coords[p]}),
    {}
) as Record<string, Coordinate>;

export const styles: Record<string, Style> = {
    yellow: new Style({
        stroke: new Stroke({color: '#ffff00', width: 4}),
        fill: new Fill({color: 'rgba(0, 0, 0, 0)'})
    }),
    blueDot: new Style({
        stroke: new Stroke({color: '#0000ff', width: 2}),
        image: new Circle({
            radius: 5,
            fill: new Fill({color: '#0000ff'})
        })
    })
};

export function safeStringify(value: unknown): string {
    const seen = new Set();
    return JSON.stringify(value, (k, v) => {
        if (seen.has(v)) {
            return '...';
        }
        if (typeof v === 'object') {
            seen.add(v);
        }
        return v;
    });
}
