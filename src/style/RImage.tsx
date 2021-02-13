import React from 'react';
import {Image} from 'ol/style';
import {Size} from 'ol/size';

import {default as RStyleBase, RStyleBaseProps} from './RStyleBase';
import debug from '../debug';

export interface RImageProps extends RStyleBaseProps {
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

export default class RImage<P extends RImageProps> extends RStyleBase<P> {
    static classProps = ['opacity', 'rotateWithView', 'rotation', 'scale', 'displacement'];
    ol: Image;

    /* istanbul ignore next */
    create(props: P): Image {
        throw new Error('RImage is an abstract class');
    }

    set(ol: Image): void {
        if (!this.context.setImage) throw new Error('Parent element does not support an image');
        this.context.setImage(ol);
    }
}
