import React from 'react';
import {Map, View, MapBrowserEvent, MapEvent} from 'ol';
import RenderEvent from 'ol/render/Event';
import {Coordinate} from 'ol/coordinate';

import {RMapContext} from './context';
import {ReactLayersBase} from './REvent';

/** Main map component *
 *
 * All other components should be part of a `Map`
 */
export interface RMapProps {
    /** The initial center coordinates, mandatory */
    center: Coordinate;
    /** The initial zoom level, mandatory */
    zoom: number;
    /** CSS class */
    className?: string;
    /** Width when not using CSS */
    width?: number;
    /** Height when not using CSS */
    height?: number;
    /** Do not include any default controls */
    noDefaultControls?: boolean;
    /** View projection, defaults to Web Mercator ESPG:3857 */
    projection?: string;
    /** Called immediately on click */
    onClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called on single click when the double click timer has expired */
    onSingleClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called on double click */
    onDblClick?: (e: MapBrowserEvent) => boolean | void;
    /** Called when the user starts panning the map */
    onMoveStart?: (e: MapBrowserEvent) => boolean | void;
    /** Called when the user stops panning the map */
    onMoveEnd?: (e: MapBrowserEvent) => boolean | void;
    /** Called on every pointer move when dragging, `e.preventDefault()`
     * can be used to stop OpenLayers from also panning the map */
    onPointerDrag?: (e: MapBrowserEvent) => boolean | void;
    /** Called on every pointer movement, use with care */
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPostRender?: (e: MapEvent) => boolean | void;
    onPreCompose?: (e: RenderEvent) => boolean | void;
    onPostCompose?: (e: RenderEvent) => boolean | void;
    onRenderComplete?: (e: RenderEvent) => boolean | void;
}

export default class RMap extends ReactLayersBase<RMapProps, null> {
    ol: Map;
    target: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<RMapProps>) {
        super(props);
        this.target = React.createRef();
        this.ol = new Map({
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
                <RMapContext.Provider value={this.ol}>{this.props.children}</RMapContext.Provider>
            </div>
        );
    }
}
