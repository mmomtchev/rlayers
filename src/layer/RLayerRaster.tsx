import React from 'react';
import {Map} from 'ol';
import {Layer} from 'ol/layer';
import {Source} from 'ol/source';
import {TileSourceEvent} from 'ol/source/Tile';

import {default as RLayer, RLayerProps} from './RLayer';

export interface RLayerRasterProps extends RLayerProps {
    /** Triggered when all currently visible tiles have finished loading */
    onTileLoadEnd?: (e: TileSourceEvent) => void;
    /** Called when a tile starts loading */
    onTileLoadStart?: (e: TileSourceEvent) => void;
    /** Called when tile loading results in an error */
    onTileLoadError?: (e: TileSourceEvent) => void;
}

/** The common base of all raster layers, not meant to be used directly */
export default class RLayerRaster<P extends RLayerRasterProps> extends RLayer<P> {
    ol: Layer;
    source: Source;
}
