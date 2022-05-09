import React from 'react';
import {Icon} from 'ol/style';
import IconOrigin from 'ol/style/IconOrigin';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import {Size} from 'ol/size';
import {Color} from 'ol/color';

import RImage, {RImageProps} from './RImage';
import debug from '../debug';

/**
 * Properties for RIcon
 */
export interface RIconProps extends RImageProps {
    anchor?: number[];
    anchorXUnits?: 'fraction' | 'pixels';
    anchorYUnits?: 'fraction' | 'pixels';
    color?: Color | string;
    crossOrigin?: null | string;
    img?: HTMLImageElement | HTMLCanvasElement;
    offset?: number[];
    offsetOrigin?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    size?: Size;
    imgSize?: Size;
    src?: string;
}

/**
 * An icon
 *
 * Requires an `RStyle` context
 */
export default class RIcon extends RImage<RIconProps> {
    static classProps = RImage.classProps.concat([
        'anchor',
        'anchorXUnits',
        'anchorYUnits',
        'color',
        'crossOrigin',
        'img',
        'offset',
        'offsetOrigin',
        'size',
        'imgSize',
        'src'
    ]);
    ol: Icon;

    create(props: RIconProps): Icon {
        this.classProps = RIcon.classProps;
        return new Icon(props);
    }
}
