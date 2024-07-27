import React from 'react';
import {ColorLike} from 'ol/colorlike';
import {Fill} from 'ol/style';

import {default as RBaseStyle, RBaseStyleProps} from './RBaseStyle';
import debug from '../debug';

/**
 * @propsfor RFill
 */
export interface RFillProps extends RBaseStyleProps {
    /** color */
    color?: ColorLike;
}

/**
 * A component for adding a fill to a style
 *
 * Requires an `RStyle` context
 */
export default class RFill extends RBaseStyle<RFillProps> {
    protected static classProps = ['color'];
    ol: Fill;

    protected create(props: RFillProps): Fill {
        this.classProps = RFill.classProps;
        return new Fill(props);
    }

    protected set(ol: Fill): void {
        console.log('set', this.ol);
        if (this.context.style.setFill) return this.context.style.setFill(ol);
        /* istanbul ignore next */
        throw new Error('Parent element does not support a fill');
    }
}
