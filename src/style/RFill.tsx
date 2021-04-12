import React from 'react';
import {ColorLike} from 'ol/colorlike';
import {Fill} from 'ol/style';

import RBase, {RBaseProps} from './RBase';
import debug from '../debug';

export interface RFillProps extends RBaseProps {
    /** color */
    color?: ColorLike;
}

/**
 * A component for adding a fill to a style
 *
 * Requires an `RStyle` context
 */
export default class RFill extends RBase<RFillProps> {
    static classProps = ['color'];
    ol: Fill;

    create(props: RFillProps): Fill {
        this.classProps = RFill.classProps;
        return new Fill(props);
    }

    set(ol: Fill): void {
        if (this.context.style.setFill) return this.context.style.setFill(ol);
        /* istanbul ignore next */
        throw new Error('Parent element does not support a fill');
    }
}
