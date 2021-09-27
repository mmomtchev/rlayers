import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

export interface RLayerWMSProps extends RLayerRasterProps {
    params?: Record<string, unknown>;
    url: string;
}

export default class RLayerWMS extends RLayerRaster<RLayerWMSProps> {
    ol: ImageLayer<ImageWMS>;
    source: ImageWMS;

    constructor(props: Readonly<RLayerWMSProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new ImageLayer({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        const {params, url} = this.props;
        const options = {params, url};

        this.source = new ImageWMS(options);
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerWMSProps): void {
        super.refresh(prevProps);
        this.createSource();
    }
}
