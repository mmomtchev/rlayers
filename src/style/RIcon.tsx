import React from 'react';
import {Icon} from 'ol/style';
import {Size} from 'ol/size';
import {Color} from 'ol/color';

import RImage, {RImageProps} from './RImage';
import debug from '../debug';

/**
 * @propsfor RIcon
 */
export interface RIconProps extends RImageProps {
    /**
     * Anchor. Default value is the icon center.
     * @default [0.5,0.5]
     */
    anchor?: number[];
    /**
     * Units in which the anchor x value is specified.
     * A value of 'fraction' indicates the x value is a fraction of the icon.
     * A value of 'pixels' indicates the x value in pixels.
     */
    anchorXUnits?: 'fraction' | 'pixels';
    /**
     * Units in which the anchor y value is specified.
     * A value of 'fraction' indicates the x value is a fraction of the icon.
     * A value of 'pixels' indicates the x value in pixels.
     */
    anchorYUnits?: 'fraction' | 'pixels';
    /** Color to tint the icon. If not specified, the icon will be left as is. */
    color?: Color | string;
    /**
     * The crossOrigin attribute for loaded images.
     * Note that you must provide a crossOrigin value if you want to access pixel data with the Canvas renderer.
     */
    crossOrigin?: null | string;
    /**
     * Image object for the icon.
     * If the src option is not provided then the provided image must already be loaded.
     * And in that case, it is required to provide the size of the image, with the imgSize option.
     */
    img?: HTMLImageElement | HTMLCanvasElement;
    /**
     * Offset, which, together with the size and the offset origin,
     * define the sub-rectangle to use from the original icon image.
     * @default [0,0]
     */
    offset?: number[];
    /** Origin of the offset: `bottom-left`, `bottom-right`, `top-left` or `top-right`. */
    offsetOrigin?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
    /**
     * Icon size in pixel.
     * Can be used together with `offset` to define the sub-rectangle to use from the origin (sprite) icon image.
     */
    size?: Size;
    /**
     * Image size in pixels. Only required if `img` is set and `src` is not, and for SVG images in Internet Explorer 11.
     * The provided `imgSize` needs to match the actual size of the image.
     */
    imgSize?: Size;
    /** Image source URI. */
    src?: string;
}

/**
 * An icon
 *
 * Requires an `RStyle` context
 */
export default class RIcon extends RImage<RIconProps> {
    protected static classProps = RImage.classProps.concat([
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

    protected create(props: RIconProps): Icon {
        this.classProps = RIcon.classProps;
        return new Icon(props);
    }
}
