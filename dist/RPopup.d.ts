import React from 'react';
import { MapBrowserEvent } from 'ol';
import { RContextType } from './context';
import { ROverlayBase, ROverlayProps } from './ROverlay';
export interface PopupProps extends ROverlayProps {
    trigger?: 'click' | 'hover';
    delay?: {
        show?: number;
        hide?: number;
    };
}
export default class Popup extends ROverlayBase<PopupProps> {
    visible: boolean;
    showing: number | undefined;
    hiding: number | undefined;
    constructor(props: Readonly<PopupProps>, context: React.Context<RContextType>);
    componentWillUnmount(): void;
    setPosition(): void;
    unregister(): void;
    refresh(): void;
    toggle: (e: MapBrowserEvent) => void;
    show: (e: MapBrowserEvent) => void;
    hide: (e: MapBrowserEvent) => void;
}
//# sourceMappingURL=RPopup.d.ts.map