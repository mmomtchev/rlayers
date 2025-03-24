import LayerImage from 'ol/layer/Image';
import SourceImage from 'ol/source/ImageStatic';
import {ProjectionLike} from 'ol/proj';
import {Extent} from 'ol/extent';
import {Size} from 'ol/size';

import React from 'react';
import {default as RLayer, RLayerProps} from './RLayer';

/**
 * @propsfor RLayerImage
 */
export interface RLayerImageProps extends RLayerProps {
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
export default class RLayerImage extends RLayer<RLayerImageProps> {
    ol: LayerImage<SourceImage>;
    source: SourceImage;

    constructor(props: Readonly<RLayerImageProps>) {
        super(props);
        this.createSource();
        this.ol = new LayerImage({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        const options = {
            url: this.props.url,
            projection: this.props.projection,
            imageExtent: this.props.extent,
            imageSize: this.props.size,
            attributions: this.props.attributions
        };

        this.source = new SourceImage(options);
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerImageProps): void {
        super.refresh(prevProps);
        if (this.props.url && prevProps?.url !== this.props.url) {
            this.createSource();
            this.ol.setSource(this.source);
            this.eventSources = [this.ol, this.source];
            this.attachOldEventHandlers(this.source);
        }
    }
}
