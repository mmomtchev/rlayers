import React from 'react';
import {Icon} from 'ol/style';
import IconOrigin from 'ol/style/IconOrigin';
import {Size} from 'ol/size';
import {Color} from 'ol/color';

import RImage, {RImageProps} from './RImage';
import debug from '../debug';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

export interface RIconProps extends RImageProps {
    anchor?: number[];
    anchorXUnits?: IconAnchorUnits;
    anchorYUnits?: IconAnchorUnits;
    color?: Color | string;
    crossOrigin?: null | string;
    img?: HTMLImageElement | HTMLCanvasElement;
    offset?: number[];
    offsetOrigin?: IconOrigin;
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
