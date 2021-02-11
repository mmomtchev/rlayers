import React from 'react';
import { Overlay } from 'ol';
import { RLocationContextType } from './context';
import { ReactLayersBase } from './REvent';
export interface ROverlayProps {
    content?: string | HTMLElement | React.ElementType;
    className?: string;
    autoPan?: boolean;
    autoPanAnimation?: {
        duration: number;
    };
}
export declare class ROverlayBase<P extends ROverlayProps> extends ReactLayersBase<P, null> {
    static contextType: React.Context<any>;
    ol: Overlay;
    context: RLocationContextType;
    containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<P>, context: React.Context<RLocationContextType>);
    setPosition(): void;
    refresh(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default class ROverlay extends ROverlayBase<ROverlayProps> {
}
//# sourceMappingURL=ROverlay.d.ts.map