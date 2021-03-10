import React from 'react';
import {Map, View, MapBrowserEvent, MapEvent} from 'ol';
import RenderEvent from 'ol/render/Event';
import BaseEvent from 'ol/events/Event';
import {Extent} from 'ol/extent';

import {Coordinate} from 'ol/coordinate';

import {RContext} from './context';
import {RlayersBase} from './REvent';

export interface RMapProps {
    /** The initial center coordinates, reset only on full component reload */
    center: Coordinate;
    /** The initial zoom level, reset only on full component reload */
    zoom: number;
    /** CSS class */
    className?: string;
    /** Width when not using CSS */
    width?: number | string;
    /** Height when not using CSS */
    height?: number | string;
    /** Do not include any default controls
     * @default false
     */
    noDefaultControls?: boolean;
    /** Do not include any default interactions
     * @default false
     */
    noDefaultInteractions?: boolean;
    /** View projection
     * @default 'ESPG:3857'
     */
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
    /** Called on every change */
    onChange?: (e: BaseEvent) => void;
    /** A set of properties that can be accessed later by .get()/.getProperties() */
    properties?: Record<string, unknown>;
    /** Extent of the map, cannot be dynamically modified
     * @default world
     */
    extent?: Extent;
    /** Minimum resolution, cannot be dynamically modified */
    minResolution?: number;
    /** Maximum resolution, cannot be dynamically modified */
    maxResolution?: number;
    /** Minimum zoom level */
    minZoom?: number;
    /** Maximum zoom level */
    maxZoom?: number;
}

/**
 * Main map component
 *
 * All other components, except `RStyle` should be part of an `RMap`
 */
export default class RMap extends RlayersBase<RMapProps, null> {
    ol: Map;
    target: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<RMapProps>) {
        super(props);
        this.target = React.createRef();
        this.ol = new Map({
            controls: props.noDefaultControls ? [] : undefined,
            interactions: props.noDefaultInteractions ? [] : undefined,
            view: new View({
                projection: props.projection,
                center: props.center,
                zoom: props.zoom,
                extent: props.extent,
                minResolution: props.minResolution,
                maxResolution: props.maxResolution,
                minZoom: props.minZoom,
                maxZoom: props.maxZoom
            })
        });
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.ol.setTarget(this.target.current);
    }

    refresh(prevProps?: RMapProps): void {
        super.refresh(prevProps);
        const view = this.ol.getView();
        for (const p of ['minResolution', 'maxResolution', 'minZoom', 'maxZoom']) {
            const m = p.charAt(0).toUpperCase() + p.substring(1);
            if (
                this.props[p] !== undefined &&
                view['set' + m] &&
                this.props[p] !== view['get' + m]()
            )
                view['set' + m](this.props[p]);
        }
        if (this.props.properties) this.ol.setProperties(this.props.properties);
    }

    render(): JSX.Element {
        return (
            <div
                className={this.props.className}
                style={{width: this.props.width, height: this.props.height}}
                ref={this.target}
            >
                <RContext.Provider value={{map: this.ol}}>{this.props.children}</RContext.Provider>
            </div>
        );
    }
}
