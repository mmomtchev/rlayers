import React from 'react';
import { Map as OLMap } from 'ol';
import { FullScreen as OLFullScreen } from 'ol/control';
import { Options } from 'ol/control/FullScreen';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface FullScreenProps extends ControlProps {
    source?: HTMLElement | string;
    label?: string;
    labelActive?: string;
    tipLabel?: string;
}
export default class FullScreen extends ControlBase<FullScreenProps, null> {
    ol: OLFullScreen;
    constructor(props: Readonly<FullScreenProps>, context: React.Context<OLMap>);
    toOLProps(props: FullScreenProps): Options;
}
//# sourceMappingURL=Fullscreen.d.ts.map