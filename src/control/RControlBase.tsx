import React, {PropsWithChildren} from 'react';
import {Control as Control} from 'ol/control';
import {Options as OLOptions} from 'ol/control/Control';

import {RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

/**
 * @propsfor RControl
 */
export interface RControlProps extends PropsWithChildren<unknown> {
    /**
     * Optional CSS class name
     */
    className?: string;

    /**
     * Destination element if the control is to be rendered outside the main map element
     */
    target?: React.RefObject<HTMLElement>;
}

export interface RControlOptions extends OLOptions {
    className?: string;
}

/**
 * An abstract class serving as base for all controls, not meant to be used directly
 */
export default class RControlBase<P extends RControlProps, S> extends RlayersBase<P, S> {
    ol: Control;

    constructor(props: Readonly<P>, context?: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.map) throw new Error('A control must be part of a map');
    }

    toOLProps(props: P): RControlOptions {
        return {
            className: props.className,
            target: props.target?.current
        };
    }

    protected refresh(prevProps?: P): void {
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
