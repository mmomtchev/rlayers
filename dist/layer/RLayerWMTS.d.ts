import React from 'react';
import { Tile as OLRLayerTile } from 'ol/layer';
import { default as OLSourceWMTS, Options } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { RContextType } from '../context';
import { default as RLayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface RLayerWMTSProps extends RLayerRasterProps {
    url: string;
    layer: string;
    onSourceReady?: (opt: Options) => void;
}
export default class RLayerWMTS extends RLayerRaster<RLayerWMTSProps> {
    ol: OLRLayerTile;
    source: OLSourceWMTS;
    parser: WMTSCapabilities;
    constructor(props: Readonly<RLayerWMTSProps>, context: React.Context<RContextType>);
    createSource(): Promise<OLSourceWMTS>;
    refresh(prevProps?: RLayerWMTSProps): void;
}
//# sourceMappingURL=RLayerWMTS.d.ts.map