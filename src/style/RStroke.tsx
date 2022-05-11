import React from 'react';
import {ColorLike} from 'ol/colorlike';
import {Stroke} from 'ol/style';

import {default as RBaseStyle, RBaseStyleProps} from './RBaseStyle';
import debug from '../debug';

/**
 * @propsfor RStroke
 */
export interface RStrokeProps extends RBaseStyleProps {
    /** color */
    color: ColorLike;
    /** width */
    width: number;
    /** Canvas line cap style: 'butt', 'round' or 'square'
     * @default 'round'
     */
    lineCap?: CanvasLineCap;
    /** Canvas line join style: 'bevel', 'round' or 'miter
     * @default 'round
     */
    lineJoin?: CanvasLineJoin;
}

/**
 * A component for setting the stroke properties of a style
 *
 * Requires an `RStyle` context
 */
export default class RStroke extends RBaseStyle<RStrokeProps> {
    static classProps = ['color', 'width', 'lineCap', 'lineJoin'];
    ol: Stroke;

    create(props: RStrokeProps): Stroke {
        this.classProps = RStroke.classProps;
        return new Stroke(props);
    }

    set(ol: Stroke): void {
        if (this.context.style.setStroke) return this.context.style.setStroke(ol);
        /* istanbul ignore next */
        throw new Error('Parent element does not support a stroke');
    }
}
