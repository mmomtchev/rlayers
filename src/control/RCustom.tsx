import React from 'react';
import {Map as Map} from 'ol';
import {Control as Control} from 'ol/control';

import {default as RControlBase, RControlProps} from './RControlBase';

/** A custom control that can contain an HTMLElement
 * All provided children will be rendered as an OpenLayers control
 *
 * [See this for an example](https://mmomtchev.github.io/rlayers/#/controls)
 */
export default class Custom extends RControlBase<RControlProps, null> {
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<RControlProps>, context: React.Context<Map>) {
        super(props, context);
        this.targetRef = React.createRef();
    }

    componentDidMount(): void {
        this.ol = new Control(this.toOLProps(this.props));
        super.componentDidMount();
    }

    toOLProps(props: RControlProps): Record<string, unknown> {
        return {
            ...super.toOLProps(props),
            element: this.targetRef?.current
        };
    }

    render(): JSX.Element {
        return (
            <div className={['ol-control', this.props.className].join(' ')} ref={this.targetRef}>
                {this.props.children}
            </div>
        );
    }
}
