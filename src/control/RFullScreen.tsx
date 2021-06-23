import React from 'react';
import {FullScreen} from 'ol/control';
import {Options} from 'ol/control/FullScreen';

import {RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

export interface RFullScreenProps extends RControlProps {
    /** A new HTML target for the map after switching to full-screen,
     * can be used for CSS customization
     */
    source?: HTMLElement | string;
    /** The button label */
    label?: string;
    /** The button label when active */
    labelActive?: string;
    /** The mouse-over tip */
    tipLabel?: string;
}

/**
 * A control for switching to full-screen mode
 *
 * Requires an `RMap` context
 * */
export default class RFullScreen extends RControlBase<RFullScreenProps, Record<string, never>> {
    ol: FullScreen;

    constructor(props: Readonly<RFullScreenProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new FullScreen(this.toOLProps(props));
    }

    toOLProps(props: RFullScreenProps): Options {
        return {
            ...super.toOLProps(props),
            source: props.source,
            label: props.label,
            labelActive: props.labelActive,
            tipLabel: props.tipLabel,
            className: props.className
        };
    }
}
