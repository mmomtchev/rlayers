import React from 'react';
import { Zoom } from 'ol/control';
import { Options } from 'ol/control/Zoom';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RZoomProps extends RControlProps {
    duration?: number;
    zoomInLabel?: string;
    zoomOutLabel?: string;
    zoomInTipLabel?: string;
    zoomOutTipLabel?: string;
    delta?: number;
}
export default class RZoom extends RControlBase<RZoomProps, null> {
    ol: Zoom;
    constructor(props: Readonly<RZoomProps>, context: React.Context<RContextType>);
    toOLProps(props: RZoomProps): Options;
}
//# sourceMappingURL=RZoom.d.ts.map