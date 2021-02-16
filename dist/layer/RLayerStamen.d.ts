import React from 'react';
import { Tile as OLRLayerTile } from 'ol/layer';
import { Stamen } from 'ol/source';
import { RContextType } from '../context';
import { default as RLayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface RLayerStamenProps extends RLayerRasterProps {
    layer?: string;
}
export default class RLayerStamen extends RLayerRaster<RLayerStamenProps> {
    ol: OLRLayerTile;
    source: Stamen;
    constructor(props: Readonly<RLayerStamenProps>, context: React.Context<RContextType>);
}
//# sourceMappingURL=RLayerStamen.d.ts.map