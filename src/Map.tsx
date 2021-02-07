import React from 'react';
import {Map as OLMap, View, MapBrowserEvent} from 'ol';
import {Coordinate} from 'ol/coordinate';
import {fromLonLat} from 'ol/proj';

import {ReactLayersBase} from './Event';

export interface MapProps {
    center: Coordinate;
    zoom: number;
    className?: string;
    width?: number;
    height?: number;
    noDefaultControls?: boolean;
    projection?: string;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onMoveStart?: (e: MapBrowserEvent) => boolean | void;
    onMoveEnd?: (e: MapBrowserEvent) => boolean | void;
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
}

export const MapContext = React.createContext(null);

export default class Map extends ReactLayersBase<MapProps, null> {
    ol: OLMap;
    target: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<MapProps>) {
        super(props);
        this.target = React.createRef();
        this.ol = new OLMap({
            controls: props.noDefaultControls ? [] : undefined,
            view: new View({
                projection: props.projection,
                center: props.center,
                zoom: props.zoom
            })
        });
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.ol.setTarget(this.target.current);
    }

    render(): JSX.Element {
        return (
            <div
                className={this.props.className}
                style={{width: this.props.width, height: this.props.height}}
                ref={this.target}
            >
                <MapContext.Provider value={this.ol}>{this.props.children}</MapContext.Provider>
            </div>
        );
    }
}
