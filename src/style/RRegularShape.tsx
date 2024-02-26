import React from 'react';
import {RegularShape} from 'ol/style';

import RRegularBase, {RRegularBaseProps} from './RRegularBase';
import debug from '../debug';

/**
 * @propsfor RRegularShape
 */
export interface RRegularShapeProps extends RRegularBaseProps {
    /** Outer radius */
    radius: number;
    /** Inner radius */
    radius2?: number;
    /** Number of points/edges */
    points: number;
    /** Rotation angle in radians, 0 is up */
    angle?: number;
}

/**
 * A star or a regular polygon
 *
 * Requires an `RStyle` context
 *
 * Provides an `RStyle` context - for `Fill` or `Stroke`
 */
export default class RRegularShape extends RRegularBase<RRegularShapeProps> {
    protected static classProps = RRegularBase.classProps.concat([
        'radius1',
        'radius2',
        'points',
        'angle'
    ]);
    ol: RegularShape;

    protected create(props: RRegularShapeProps): RegularShape {
        this.classProps = RRegularShape.classProps;
        return new RegularShape({
            ...props,
            stroke: this.stroke,
            fill: this.fill
        });
    }
}
