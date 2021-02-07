import React from 'react';
import {Map as OLMap} from 'ol';
import {Control as OLControl} from 'ol/control';
import {Options} from 'ol/control/Control';

import {MapContext} from '../Map';
import {ReactLayersBase} from '../Event';

export interface ControlProps {
    className?: string;
    target?: React.RefObject<HTMLElement>;
}

export default class ControlBase<P extends ControlProps, S> extends ReactLayersBase<P, S> {
    static contextType = MapContext;
    ol: OLControl;
    context: OLMap;

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
