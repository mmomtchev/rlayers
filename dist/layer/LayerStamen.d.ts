import React from 'react';
import { Map as OLMap } from 'ol';
import { Tile as OLLayerTile } from 'ol/layer';
import { Stamen } from 'ol/source';
import { Layer, LayerProps } from '..';
export interface LayerStamenProps extends LayerProps {
    layer?: string;
}
declare class LayerStamen extends Layer<LayerStamenProps> {
    ol: OLLayerTile;
    source: Stamen;
    constructor(props: Readonly<LayerStamenProps>, context: React.Context<OLMap>);
}
export default LayerStamen;
//# sourceMappingURL=LayerStamen.d.ts.map