import React from 'react';
import { Map as Map } from 'ol';
import { Tile as OLRLayerTile } from 'ol/layer';
import { Stamen } from 'ol/source';
import { default as RLayer, RLayerProps } from './RLayer';
export interface RLayerStamenProps extends RLayerProps {
    layer?: string;
}
export default class RLayerStamen extends RLayer<RLayerStamenProps> {
    ol: OLRLayerTile;
    source: Stamen;
    constructor(props: Readonly<RLayerStamenProps>, context: React.Context<Map>);
}
//# sourceMappingURL=RLayerStamen.d.ts.map