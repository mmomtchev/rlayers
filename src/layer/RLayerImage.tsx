import LayerImage from 'ol/layer/Image';
import SourceImage from 'ol/source/ImageStatic';
import {ProjectionLike} from 'ol/proj';
import {Extent} from 'ol/extent';
import {Size} from 'ol/size';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerImage
 */
export interface RLayerImageProps extends RLayerRasterProps {
    /** url of the image */
    url: string;
    /** Extent of the map, cannot be dynamically modified */
    extent: Extent;
    /**
     * Projection for the returned coordinates
     * @default viewProjection
     */
    projection?: ProjectionLike;
    /** image size if the auto-detection fails */
    size?: Size;
}

/**
 * A layer that renders a static image
 */
export default class RLayerImage extends RLayerRaster<RLayerImageProps> {
    ol: LayerImage<SourceImage>;
    source: SourceImage;

    constructor(props: Readonly<RLayerImageProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new LayerImage({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        const options = {
            url: this.props.url,
            projection: this.props.projection,
            imageExtent: this.props.extent,
            imageSize: this.props.size
        };

        this.source = new SourceImage(options);
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerImageProps): void {
        super.refresh(prevProps);
        this.createSource();
    }
}
