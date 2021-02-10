import {PluggableMap} from 'ol';
import {fromLonLat} from 'ol/proj';
import {Coordinate} from 'ol/coordinate';
import {Style, Stroke, Circle, Fill} from 'ol/style';

import {MapBrowserEvent} from 'react-layers';

export const mapProps = {
    center: fromLonLat([2.364, 48.82]),
    width: 100,
    height: 100,
    zoom: 11
};

export function createEvent(evname: string, map: PluggableMap): MapBrowserEvent {
    const event = {clientX: 10, clientY: 10} as unknown;
    return new MapBrowserEvent(evname.toLowerCase(), map, event as UIEvent);
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
        image: new Circle({
            radius: 5,
            fill: new Fill({color: '#0000ff'})
        })
    })
};
