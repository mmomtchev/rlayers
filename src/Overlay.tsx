import React from 'react';
import {Overlay as OLOverlay} from 'ol';

import {LocationContext, LocationContextType} from './Feature';
import {ReactLayersBase} from './Event';

export interface OverlayProps {
    content?: string | HTMLElement | React.ElementType;
    className?: string;
    autoPan?: boolean;
    autoPanAnimation?: {
        duration: number;
    };
}

export class OverlayBase<P extends OverlayProps> extends ReactLayersBase<P, null> {
    static contextType = LocationContext;
    ol: OLOverlay;
    context: LocationContextType;
    containerRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<P>, context: React.Context<LocationContextType>) {
        super(props, context);
        if (!this.context || !this.context.layer)
            throw new Error('An overlay must be part of a location provider (ie feature)');
        this.ol = new OLOverlay({
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

export default class Overlay extends OverlayBase<OverlayProps> {}
