import React from 'react';
import { FullScreen } from 'ol/control';
import { Options } from 'ol/control/FullScreen';
import { RContextType } from '../context';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RFullScreenProps extends RControlProps {
    source?: HTMLElement | string;
    label?: string;
    labelActive?: string;
    tipLabel?: string;
}
export default class RFullScreen extends RControlBase<RFullScreenProps, null> {
    ol: FullScreen;
    constructor(props: Readonly<RFullScreenProps>, context: React.Context<RContextType>);
    toOLProps(props: RFullScreenProps): Options;
}
//# sourceMappingURL=RFullScreen.d.ts.map