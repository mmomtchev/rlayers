import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

import React from 'react';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

// TileWMS options from https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
/**
 * @propsfor RLayerTileWMS
 */
export interface RLayerTileWMSProps extends RLayerRasterProps {
    params?: Record<string, unknown>;
    url: string;
}

/**
 * Tiled layer using WMS
 */
export default class RLayerTileWMS extends RLayerRaster<RLayerTileWMSProps> {
    ol: TileLayer<TileWMS>;
    source: TileWMS;

    constructor(props: Readonly<RLayerTileWMSProps>) {
        super(props);
        this.createSource();
        this.ol = new TileLayer({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        const {params, url, projection} = this.props;
        const options = {params, url, projection};

        this.source = new TileWMS(options);
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerTileWMSProps): void {
        super.refresh(prevProps);
        this.createSource();
        this.ol.setSource(this.source);
        this.attachOldEventHandlers(this.source);
    }
}
