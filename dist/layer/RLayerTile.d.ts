import React from 'react';
import { Map } from 'ol';
import { Tile as OLRLayerTile } from 'ol/layer';
import { XYZ } from 'ol/source';
import TileGrid from 'ol/tilegrid/TileGrid';
import { default as RLayer, RLayerProps } from './RLayer';
export interface RLayerTileProps extends RLayerProps {
    url?: string;
    tileGrid?: TileGrid;
}
export default class RLayerTile extends RLayer<RLayerTileProps> {
    ol: OLRLayerTile;
    source: XYZ;
    constructor(props: Readonly<RLayerTileProps>, context: React.Context<Map>);
    refresh(prevProps?: RLayerTileProps): void;
}
//# sourceMappingURL=RLayerTile.d.ts.map