import React from 'react';
import { MapBrowserEvent } from 'ol';
import { LocationContextType } from './Feature';
import { OverlayBase, OverlayProps } from './Overlay';
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
    constructor(props: Readonly<PopupProps>, context: React.Context<LocationContextType>);
    componentWillUnmount(): void;
    setPosition(): void;
    unregister(): void;
    refresh(): void;
    toggle: (e: MapBrowserEvent) => void;
    show: (e: MapBrowserEvent) => void;
    hide: (e: MapBrowserEvent) => void;
}
//# sourceMappingURL=Popup.d.ts.map