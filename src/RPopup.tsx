import React from 'react';

import {RContextType} from './context';
import {ROverlayBase, ROverlayProps} from './ROverlay';

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
export default class Popup extends ROverlayBase<RPopupProps> {
    visible: boolean;
    showing: number | undefined;
    hiding: number | undefined;

    constructor(props: Readonly<RPopupProps>, context: React.Context<RContextType>) {
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
        this.context.feature.un('click' as 'change', this.toggle);
        this.context.feature.un('pointerenter' as 'change', this.show);
        this.context.feature.un('pointerleave' as 'change', this.hide);
    }

    refresh(): void {
        this.ol.setElement(this.containerRef.current);
        this.unregister();
        switch (this.props.trigger) {
            default:
            case 'click':
                this.context.feature.on('click' as 'change', this.toggle);
                break;
            case 'hover':
                this.context.feature.on('pointerenter' as 'change', this.show);
                this.context.feature.on('pointerleave' as 'change', this.hide);
                break;
        }
        this.setPosition();
    }

    toggle = (): void => {
        this.visible = !this.visible;
        this.setPosition();
    };

    show = (): void => {
        if (this.showing) return;
        if (this.hiding) window.clearTimeout(this.hiding);
        this.showing = window.setTimeout(() => {
            this.visible = true;
            this.setPosition();
            this.hiding = this.showing = undefined;
        }, this.props.delay?.show ?? 250);
    };

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
