import React from 'react';
import {Overlay} from 'ol';

import {RContextType} from './context';
import {RlayersBase} from './REvent';

export interface ROverlayProps {
    /** Content to be displayed */
    content?: string | HTMLElement | React.ElementType;
    /** CSS class */
    className?: string;
    /** Automatically pan the map when the element is rendered */
    autoPan?: boolean;
    /** Pan animation */
    autoPanAnimation?: {
        duration: number;
    };
}

/**
 * A basic overlay
 *
 * Requires a location context `RContext`
 *
 * (ie it must be descendant of a `RFeature`)
 *
 * @visibleName Overlay
 */
export class ROverlayBase<P extends ROverlayProps> extends RlayersBase<P, null> {
    ol: Overlay;
    containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<P>, context: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.location)
            throw new Error('An overlay must be part of a location provider (ie RFeature)');
        this.ol = new Overlay({
            autoPan: props.autoPan ?? true,
            autoPanAnimation: props.autoPanAnimation
        });
        this.containerRef = React.createRef();
    }

    setPosition(): void {
        this.ol.setPosition(this.context.location);
    }

    refresh(): void {
        super.refresh();
        this.ol.setElement(this.containerRef.current);
        this.setPosition();
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.map.addOverlay(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.map.removeOverlay(this.ol);
    }

    render(): JSX.Element {
        this.setPosition();
        return (
            <div ref={this.containerRef} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

export default class ROverlay extends ROverlayBase<ROverlayProps> {}
