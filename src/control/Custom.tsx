import React from 'react';
import {Map as OLMap} from 'ol';
import {Control as OLControl} from 'ol/control';

import {default as ControlBase, ControlProps} from './ControlBase';

export default class Custom extends ControlBase<ControlProps, null> {
    ol: OLControl;
    targetRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<ControlProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.targetRef = React.createRef();
    }

    componentDidMount(): void {
        this.ol = new OLControl(this.toOLProps(this.props));
        super.componentDidMount();
    }

    toOLProps(props: ControlProps): Record<string, unknown> {
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
