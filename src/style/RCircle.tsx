import React from 'react';
import {Circle, Fill, Stroke} from 'ol/style';

import {RStyleContext} from '../context';
import RRegularBase, {RRegularBaseProps} from './RRegularBase';
import debug from '../debug';

export interface RCircleProps extends RRegularBaseProps {
    /** Radius */
    radius: number;
}

/** A circle */
export default class RCircle extends RRegularBase<RCircleProps> {
    static classProps = RRegularBase.classProps.concat(['radius']);
    ol: Circle;

    create(props: RCircleProps): Circle {
        this.classProps = RCircle.classProps;
        return new Circle({
            ...props,
            stroke: this.stroke,
            fill: this.fill
        });
    }
}
