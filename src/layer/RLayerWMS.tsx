import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

import React from 'react';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerWMS
 */
export interface RLayerWMSProps extends RLayerRasterProps {
    params?: Record<string, unknown>;
    url: string;
    /**
     * The `crossOrigin` attribute for loaded images.  Note that
     * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
     */
    crossOrigin?: string | null;
}

/**
 * A layer that renders WMS maps as a single image
 */
export default class RLayerWMS extends RLayerRaster<RLayerWMSProps> {
    ol: ImageLayer<ImageWMS>;
    source: ImageWMS;

    constructor(props: Readonly<RLayerWMSProps>) {
        super(props);
        this.createSource();
        this.ol = new ImageLayer({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        const {params, url, crossOrigin, attributions} = this.props;
        const options = {params, url, crossOrigin, attributions};

        this.source = new ImageWMS(options);
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerWMSProps): void {
        super.refresh(prevProps);
        this.createSource();
        this.ol.setSource(this.source);
        this.attachOldEventHandlers(this.source);
    }
}
