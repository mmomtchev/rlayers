import React from 'react';
import { Map } from 'ol';
import { Tile as OLRLayerTile } from 'ol/layer';
import { TileJSON } from 'ol/source';
import { default as RLayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface RLayerTileJSONProps extends RLayerRasterProps {
    url?: string;
    projection?: never;
}
export default class RLayerTileJSON extends RLayerRaster<RLayerTileJSONProps> {
    ol: OLRLayerTile;
    source: TileJSON;
    constructor(props: Readonly<RLayerTileJSONProps>, context: React.Context<Map>);
    refresh(prevProps?: RLayerTileJSONProps): void;
}
//# sourceMappingURL=RLayerTileJSON.d.ts.map