import React from 'react';
import { Overlay } from 'ol';
import { RContextType } from './context';
import { RlayersBase } from './REvent';
export interface ROverlayProps {
    content?: string | HTMLElement | React.ElementType;
    className?: string;
    autoPan?: boolean;
    autoPanAnimation?: {
        duration: number;
    };
    autoPosition?: boolean;
}
export declare class ROverlayBase<P extends ROverlayProps> extends RlayersBase<P, null> {
    ol: Overlay;
    containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Readonly<P>, context: React.Context<RContextType>);
    setPosition(): void;
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export default class ROverlay extends ROverlayBase<ROverlayProps> {
}
//# sourceMappingURL=ROverlay.d.ts.map