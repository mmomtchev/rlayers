import React from 'react';
import {Map as Map} from 'ol';
import {Control as Control} from 'ol/control';
import {Options} from 'ol/control/Control';

import {RMapContext} from '../context';
import {ReactLayersBase} from '../REvent';

export interface RControlProps {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}

export default class RControlBase<P extends RControlProps, S> extends ReactLayersBase<P, S> {
    static contextType = RMapContext;
    ol: Control;
    context: Map;

    constructor(props: Readonly<P>, context: React.Context<Map>) {
        super(props, context);
        if (!this.context || !this.context.addControl)
            throw new Error('A control must be part of a map');
    }

    toOLProps(props: P): Options {
        return {
            target: props.target?.current
        };
    }

    refresh(): void {
        super.refresh();
        this.ol.setProperties(this.toOLProps(this.props));
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.addControl(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.removeControl(this.ol);
    }
}
