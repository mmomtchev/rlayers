import React from 'react';
import {Control as Control} from 'ol/control';

import {RContextType} from '../context';
import {default as RControlBase, RControlOptions, RControlProps} from './RControlBase';

/** A custom control that can contain an HTMLElement
 *
 * All provided children will be rendered as an OpenLayers control
 *
 * Requires an `RMap` context
 *
 * [See this for an example](https://mmomtchev.github.io/rlayers/#/controls)
 */
export default class RCustom extends RControlBase<RControlProps, Record<string, never>> {
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<RControlProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.targetRef = React.createRef();
    }

    componentDidMount(): void {
        this.ol = new Control(this.toOLProps(this.props));
        super.componentDidMount();
    }

    toOLProps(props: RControlProps): RControlOptions {
        return {
            ...super.toOLProps(props),
            element: this.targetRef?.current
        };
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RCustomControl'>
                <div
                    className={['ol-control', this.props.className].join(' ')}
                    ref={this.targetRef}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}
