import React, {PropsWithChildren} from 'react';
import {Control as Control} from 'ol/control';
import {Options} from 'ol/control/Control';

import {RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

/**
 * Properties for RControl
 */
export interface RControlProps extends PropsWithChildren<unknown> {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}

/**
 * An abstract class serving as base for all controls, not meant to be used directly
 */
export default class RControlBase<P extends RControlProps, S> extends RlayersBase<P, S> {
    ol: Control;

    constructor(props: Readonly<P>, context: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.map) throw new Error('A control must be part of a map');
    }

    toOLProps(props: P): Options {
        return {
            target: props.target?.current
        };
    }

    refresh(prevProps?: P): void {
        super.refresh(prevProps);
        this.ol.setProperties(this.toOLProps(this.props));
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.map.addControl(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.map.removeControl(this.ol);
    }
}
