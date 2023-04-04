import React from 'react';
import {Tile as LayerTile} from 'ol/layer';
import BaseEvent from 'ol/events/Event';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerRasterMBTiles
 */
export interface RLayerRasterMBTilesProps extends RLayerRasterProps {
    /** An URL for a remote MBTiles file */
    url: string;
    /**
     * Use multiple SQLite workers, refer to the ol-mbtiles for more information
     * @default 1
     */
    workers?: number;
    /**
     * Use a specific HTTP backend, refer to the ol-mbtiles for more information
     * @default 'sync'
     */
    backend?: 'sync' | 'shared';
    /** Called after each metadata change to signal that the metadata has been loaded */
    onSourceReady?: (this: RLayerRasterMBTiles, e: BaseEvent) => void;
}

/**
 * A layer from a remote MBTiles raster source
 *
 * WARNING: Using this module requires manually installing `ol-mbtiles`
 *
 * `npm install ol-mbtiles`
 *
 * Be sure to read its own documentation for tips on how to improve
 * its performance (COOP/COEP, WASM compression, preloading...)
 *
 * Requires an `RMap` context
 */
export default class RLayerRasterMBTiles extends RLayerRaster<RLayerRasterMBTilesProps> {
    addon: Promise<typeof import('ol-mbtiles')>;
    metadata: Promise<import('ol-mbtiles').MBTilesRasterOptions & import('ol-mbtiles').SQLOptions>;
    ol: LayerTile<import('ol-mbtiles').MBTilesRasterSource>;
    source: import('ol-mbtiles').MBTilesRasterSource;
    ready: Promise<void>;

    constructor(props: Readonly<RLayerRasterMBTilesProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.addon = import('ol-mbtiles');
        this.ol = new LayerTile();
        this.createSource();
    }

    createSource(): void {
        this.metadata = this.addon.then((mod) =>
            mod.importMBTiles({
                url: this.props.url,
                sqlWorkers: this.props.workers ?? 1,
                backendType: this.props.backend ?? 'sync'
            })
        );
        this.ready = Promise.all([this.addon, this.metadata]).then(([addon, md]) => {
            this.source = new addon.MBTilesRasterSource(md);
            this.eventSources = [this.ol, this.source];
            this.ol.setSource(this.source);
            this.attachOldEventHandlers(this.source);
        });
    }

    refresh(prevProps?: RLayerRasterMBTilesProps): void {
        super.refresh(prevProps);
        if (prevProps?.url !== this.props.url) {
            this.createSource();
        }
    }
}
