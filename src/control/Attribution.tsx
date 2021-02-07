import React from 'react';
import {Map as OLMap} from 'ol';
import {Attribution as OLAttribution} from 'ol/control';
import {Options} from 'ol/control/Attribution';

import {default as ControlBase, ControlProps} from './ControlBase';

export interface AttributionProps extends ControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
}

export default class Attribution extends ControlBase<AttributionProps, null> {
    ol: OLAttribution;

    constructor(props: Readonly<AttributionProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLAttribution(this.toOLProps(props));
    }

    toOLProps(props: AttributionProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            collapsible: props.collapsible ?? true,
            collapsed: props.collapsed
        };
    }
}
