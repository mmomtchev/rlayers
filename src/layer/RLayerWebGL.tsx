import React from 'react';
import {Map} from 'ol';
import {WebGLTile as LayerTileWebGL} from 'ol/layer';
import {TileImage as SourceTile} from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

export interface RLayerWebGLProps extends RLayerRasterProps {
    /**
     * The internal texture cache size in Kb.
     * This needs to be large enough to render two zoom levels worth of tiles.
     * @default 512
     * Cannot be modified once set.
     */
    cacheSize?: number;
}

/**
 * An abstract layer serving as base to the WebGL layers
 *
 * Requires an `RMap` context
 */
export default class RLayerWebGL<P extends RLayerWebGLProps> extends RLayerRaster<P> {
    ol: LayerTileWebGL;
    source: SourceTile;
}
