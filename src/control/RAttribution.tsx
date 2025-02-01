import React from 'react';
import {Attribution} from 'ol/control';
import {Options} from 'ol/control/Attribution';

import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor RAttribution
 */
export interface RAttributionProps extends RControlProps {
    /** Is it user-collapsible (some licenses do not allow it) @default true */
    collapsible?: boolean;
    /** Initial state @default true */
    collapsed?: boolean;
}

/**
 * An attributions control (the small **i** in the bottom right corner)
 *
 * Requires an `RMap` context
 */
export default class RAttribution extends RControlBase<RAttributionProps, Record<string, never>> {
    ol: Attribution;

    constructor(props: Readonly<RAttributionProps>) {
        super(props);
        this.ol = new Attribution(this.toOLProps(props));
    }

    protected refresh(prevProps?: RAttributionProps): void {
        super.refresh(prevProps);
        if (prevProps?.collapsed !== this.props.collapsed)
            this.ol.setCollapsed(this.props.collapsed);
    }

    toOLProps(props: RAttributionProps): Options {
        return {
            ...super.toOLProps(props),
            collapsible: props.collapsible ?? true,
            collapsed: props.collapsed
        };
    }
}
