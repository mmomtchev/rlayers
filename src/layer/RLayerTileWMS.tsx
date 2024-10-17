import TileLayer from 'ol/layer/Tile';
import TileWMS, {Options} from 'ol/source/TileWMS';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

// TileWMS options from https://openlayers.org/en/latest/apidoc/module-ol_source_TileWMS-TileWMS.html
/**
 * @propsfor RLayerTileWMS
 */
export interface RLayerTileWMSProps extends RLayerRasterProps, Options {}

/**
 * Tiled layer using WMS
 */
export default class RLayerTileWMS extends RLayerRaster<RLayerTileWMSProps> {
    ol: TileLayer<TileWMS>;
    source: TileWMS;

    constructor(props: Readonly<RLayerTileWMSProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new TileLayer({source: this.source, cacheSize: this.props.cacheSize});
        this.eventSources = [this.ol, this.source];
    }

    protected createSource(): void {
        const options = {
            attributions: this.props.attributions,
            attributionsCollapsible: this.props.attributionsCollapsible,
            crossOrigin: this.props.crossOrigin,
            interpolate: this.props.interpolate,
            params: this.props.params,
            gutter: this.props.gutter,
            hidpi: this.props.hidpi,
            projection: this.props.projection,
            reprojectionErrorThreshold: this.props.reprojectionErrorThreshold,
            tileClass: this.props.tileClass,
            tileGrid: this.props.tileGrid,
            serverType: this.props.serverType,
            tileLoadFunction: this.props.tileLoadFunction,
            url: this.props.url,
            urls: this.props.urls,
            wrapX: this.props.wrapX,
            transition: this.props.transition,
            zDirection: this.props.zDirection
        };

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
