import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerWMS
 */
export interface RLayerWMSProps extends RLayerRasterProps {
    params?: Record<string, unknown>;
    url: string;
}

/**
 * A layer that renders WMS maps as a single image
 */
export default class RLayerWMS extends RLayerRaster<RLayerWMSProps> {
    ol: ImageLayer<ImageWMS>;
    source: ImageWMS;

    constructor(props: Readonly<RLayerWMSProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new ImageLayer({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        const {params, url} = this.props;
        const options = {params, url};

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
