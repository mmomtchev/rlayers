import React from 'react';
import {Map as Map} from 'ol';
import {Attribution} from 'ol/control';
import {Options} from 'ol/control/Attribution';

import {default as RControlBase, RControlProps} from './RControlBase';

export interface RAttributionProps extends RControlProps {
    /** Is it user-collapsible (some licenses do not allow it) */
    collapsible?: boolean;
    /** Initial state */
    collapsed?: boolean;
}

/**
 * An attributions control (the small **i** in the bottom right corner)
 */
export default class RAtrribution extends RControlBase<RAttributionProps, null> {
    ol: Attribution;

    constructor(props: Readonly<RAttributionProps>, context: React.Context<Map>) {
        super(props, context);
        this.ol = new Attribution(this.toOLProps(props));
    }

    toOLProps(props: RAttributionProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            collapsible: props.collapsible ?? true,
            collapsed: props.collapsed
        };
    }
}
