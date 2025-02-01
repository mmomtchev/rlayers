import React from 'react';

import {ROverlayBase, ROverlayProps} from './ROverlay';
import {OLEvent} from './REvent';

/**
 * @propsfor RPopup
 */
export interface RPopupProps extends ROverlayProps {
    /**
     * Trigger action, 'click' or 'hover'
     * @default 'click'
     */
    trigger?: 'click' | 'hover';
    /**
     * Delay in 'hover' mode
     * @default {show: 250, hide: 50}
     */
    delay?: {
        show?: number;
        hide?: number;
    };
}

/**
 * Popup component
 *
 * `Popup` extends `Overlay` and implements an automatic popup
 *
 * Requires a location context
 *
 * (ie it must be descendant of a `RFeature`)
 */
export default class RPopup extends ROverlayBase<RPopupProps> {
    visible: boolean;
    showing: number | undefined;
    hiding: number | undefined;

    constructor(props: Readonly<RPopupProps>) {
        super(props);
        this.visible = false;
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.unregister();
    }

    protected setPosition(): void {
        this.ol.setPosition(this.visible ? this.context.location : undefined);
    }

    private unregister(prevProps?: RPopupProps): void {
        if (!prevProps) return;
        switch (prevProps.trigger) {
            default:
            case 'click':
                this.context.rFeature.un('click' as OLEvent, this.toggle);
                break;
            case 'hover':
                this.context.rFeature.un('pointerenter' as OLEvent, this.show);
                this.context.rFeature.un('pointerhide' as OLEvent, this.hide);
                break;
        }
    }

    protected refresh(prevProps?: RPopupProps): void {
        this.ol.setElement(this.containerRef.current);
        if (prevProps?.trigger !== this.props.trigger) {
            this.unregister(prevProps);
            switch (this.props.trigger) {
                default:
                case 'click':
                    if (prevProps?.trigger === 'hover') {
                        this.context.rFeature.un('pointerenter' as OLEvent, this.show);
                        this.context.rFeature.un('pointerhide' as OLEvent, this.hide);
                    }
                    this.context.rFeature.on('click' as OLEvent, this.toggle);
                    break;
                case 'hover':
                    if (prevProps?.trigger === 'click') {
                        this.context.rFeature.un('click' as OLEvent, this.toggle);
                    }
                    this.context.rFeature.on('pointerenter' as OLEvent, this.show);
                    this.context.rFeature.on('pointerleave' as OLEvent, this.hide);
                    break;
            }
        }
        this.setPosition();
    }

    /**
     * Toggle the state
     */
    toggle = (): void => {
        this.visible = !this.visible;
        this.setPosition();
    };

    /**
     * Show the popup
     */
    show = (): void => {
        if (this.showing) return;
        if (this.hiding) window.clearTimeout(this.hiding);
        this.showing = window.setTimeout(() => {
            this.visible = true;
            this.setPosition();
            this.hiding = this.showing = undefined;
        }, this.props.delay?.show ?? 250);
    };

    /**
     * Hide the popup
     */
    hide = (): void => {
        if (this.hiding) return;
        if (this.showing) window.clearTimeout(this.showing);
        this.hiding = window.setTimeout(() => {
            this.visible = false;
            this.setPosition();
            this.hiding = this.showing = undefined;
        }, this.props.delay?.hide ?? 50);
    };
}
