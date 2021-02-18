import React from 'react';
import { ZoomSlider } from 'ol/control';
import { Options } from 'ol/control/ZoomSlider';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RZoomSliderProps extends RControlProps {
    duration?: number;
}
export default class RZoomSlider extends RControlBase<RZoomSliderProps, null> {
    ol: ZoomSlider;
    constructor(props: Readonly<RZoomSliderProps>, context: React.Context<RContextType>);
    toOLProps(props: RZoomSliderProps): Options;
}
//# sourceMappingURL=RZoomSlider.d.ts.map