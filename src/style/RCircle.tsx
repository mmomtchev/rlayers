import React from 'react';
import {Circle} from 'ol/style';

import RRegularBase, {RRegularBaseProps} from './RRegularBase';
import debug from '../debug';

/**
 * @propsfor RCircle
 */
export interface RCircleProps extends RRegularBaseProps {
    /** Radius */
    radius: number;
}

/**
 * A circle
 *
 * Requires an `RStyle` context
 *
 * Provides an `RStyle` context - for `Fill` or `Stroke`
 */
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
