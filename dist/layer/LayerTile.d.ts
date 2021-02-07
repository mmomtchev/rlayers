import React from 'react';
import { Map as OLMap } from 'ol';
import { Tile as OLLayerTile } from 'ol/layer';
import { XYZ } from 'ol/source';
import { Layer, LayerProps } from '..';
export interface LayerTileProps extends LayerProps {
    url?: string;
}
declare class LayerTile extends Layer<LayerTileProps> {
    ol: OLLayerTile;
    source: XYZ;
    constructor(props: Readonly<LayerTileProps>, context: React.Context<OLMap>);
    refresh(): void;
}
export default LayerTile;
//# sourceMappingURL=LayerTile.d.ts.map