import React from 'react';
import {Image} from 'ol/style';
import {Size} from 'ol/size';

import {default as RBaseStyle, RBaseStyleProps} from './RBaseStyle';
import debug from '../debug';

/**
 * @propsfor RImage
 */
export interface RImageProps extends RBaseStyleProps {
    /** Opacity */
    opacity?: number;
    /** Rotate with view */
    rotateWithView?: boolean;
    /** Rotation */
    rotation?: number;
    /** Scale */
    scale?: number | Size;
    /** Displacement */
    displacement?: number[];
}

/**
 * An abstract class serving as base for all styles that render an image
 */
export default class RImage<P extends RImageProps> extends RBaseStyle<P> {
    static classProps = ['opacity', 'rotateWithView', 'rotation', 'scale', 'displacement'];
    ol: Image;

    /* istanbul ignore next */
    create(props: P): Image {
        throw new Error('RImage is an abstract class');
    }

    set(ol: Image): void {
        if (!this.context.style.setImage)
            throw new Error('Parent element does not support an image');
        this.context.style.setImage(ol);
    }
}
