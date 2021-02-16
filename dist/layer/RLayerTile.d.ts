import React from 'react';
import { Map } from 'ol';
import { Tile as OLRLayerTile } from 'ol/layer';
import { XYZ } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import { default as RLayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface RLayerTileProps extends RLayerRasterProps {
    url?: string;
    tileGrid?: TileGrid;
}
export default class RLayerTile extends RLayerRaster<RLayerTileProps> {
    ol: OLRLayerTile;
    source: XYZ;
    constructor(props: Readonly<RLayerTileProps>, context: React.Context<Map>);
    createSource(): void;
    refresh(prevProps?: RLayerTileProps): void;
}
//# sourceMappingURL=RLayerTile.d.ts.map