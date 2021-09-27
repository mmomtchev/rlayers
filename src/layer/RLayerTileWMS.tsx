import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

// TileWMS options from https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
export interface RLayerTileWMSProps extends RLayerRasterProps {
    params?: Record<string, unknown>;
    url: string;
}

export default class RLayerTileWMS extends RLayerRaster<RLayerTileWMSProps> {
    ol: TileLayer<TileWMS>;
    source: TileWMS;

    constructor(props: Readonly<RLayerTileWMSProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new TileLayer({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        const {params, url} = this.props;
        const options = {params, url};

        this.source = new TileWMS(options);
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: RLayerTileWMSProps): void {
        super.refresh(prevProps);
        this.createSource();
    }
}
