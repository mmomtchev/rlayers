import React from 'react';
import {Map as OLMap, MapBrowserEvent} from 'ol';
import {Overlay as OLOverlay} from 'ol';
import Geometry from 'ol/geom/Geometry';
import {Coordinate} from 'ol/coordinate';

import {LocationContext, LocationContextType} from './Feature';
import {OverlayBase, OverlayProps} from './Overlay';
import {ReactLayersBase} from './Event';

export interface PopupProps extends OverlayProps {
    trigger?: 'click' | 'hover';
    delay?: {
        show?: number;
        hide?: number;
    };
}

export default class Popup extends OverlayBase<PopupProps> {
    visible: boolean;
    showing: number | undefined;
    hiding: number | undefined;

    constructor(props: Readonly<PopupProps>, context: React.Context<LocationContextType>) {
        super(props, context);
        this.visible = false;
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.unregister();
    }

    setPosition(): void {
        this.ol.setPosition(this.visible ? this.context.location : undefined);
    }

    unregister(): void {
        this.context.feature.un('click', this.toggle);
        this.context.feature.un('pointerenter', this.show);
        this.context.feature.un('pointerleave', this.hide);
    }

    refresh(): void {
        this.ol.setElement(this.containerRef.current);
        this.unregister();
        switch (this.props.trigger) {
            default:
            case 'click':
                this.context.feature.on('click', this.toggle);
                break;
            case 'hover':
                this.context.feature.on('pointerenter', this.show);
                this.context.feature.on('pointerleave', this.hide);
                break;
        }
        this.setPosition();
    }

    toggle = (e: MapBrowserEvent): void => {
        this.visible = !this.visible;
        this.setPosition();
    };

    show = (e: MapBrowserEvent): void => {
        if (this.showing) return;
        if (this.hiding) window.clearTimeout(this.hiding);
        this.showing = window.setTimeout(() => {
            this.visible = true;
            this.setPosition();
            this.hiding = this.showing = undefined;
        }, this.props.delay?.show ?? 250);
    };

    hide = (e: MapBrowserEvent): void => {
        if (this.hiding) return;
        if (this.showing) window.clearTimeout(this.showing);
        this.hiding = window.setTimeout(() => {
            this.visible = false;
            this.setPosition();
            this.hiding = this.showing = undefined;
        }, this.props.delay?.hide ?? 50);
    };
}
