import React from 'react';
import { Map as OLMap } from 'ol';
import { Zoom as OLZoom } from 'ol/control';
import { Options } from 'ol/control/Zoom';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface ZoomProps extends ControlProps {
    duration?: number;
    zoomInLabel?: string;
    zoomOutLabel?: string;
    zoomInTipLabel?: string;
    zoomOutTipLabel?: string;
    delta?: number;
}
export default class Zoom extends ControlBase<ZoomProps, null> {
    ol: OLZoom;
    constructor(props: Readonly<ZoomProps>, context: React.Context<OLMap>);
    toOLProps(props: ZoomProps): Options;
}
//# sourceMappingURL=Zoom.d.ts.map