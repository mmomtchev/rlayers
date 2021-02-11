import React from 'react';
import { Map as Map } from 'ol';
import { FullScreen } from 'ol/control';
import { Options } from 'ol/control/FullScreen';
import { default as RControlBase, RControlProps } from './RControlBase';
export interface RFullScreenProps extends RControlProps {
    source?: HTMLElement | string;
    label?: string;
    labelActive?: string;
    tipLabel?: string;
}
export default class RFullScreen extends RControlBase<RFullScreenProps, null> {
    ol: FullScreen;
    constructor(props: Readonly<RFullScreenProps>, context: React.Context<Map>);
    toOLProps(props: RFullScreenProps): Options;
}
//# sourceMappingURL=RFullScreen.d.ts.map