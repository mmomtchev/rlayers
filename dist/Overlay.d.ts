import React from 'react';
import { Overlay as OLOverlay } from 'ol';
import { LocationContextType } from './Feature';
import { ReactLayersBase } from './Event';
export interface OverlayProps {
    content?: string | HTMLElement | React.ElementType;
    className?: string;
    autoPan?: boolean;
    autoPanAnimation?: {
        duration: number;
    };
}
export declare class OverlayBase<P extends OverlayProps> extends ReactLayersBase<P, null> {
    static contextType: React.Context<any>;
    ol: OLOverlay;
    context: LocationContextType;
    containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<P>, context: React.Context<LocationContextType>);
    setPosition(): void;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default class Overlay extends OverlayBase<OverlayProps> {
}
//# sourceMappingURL=Overlay.d.ts.map