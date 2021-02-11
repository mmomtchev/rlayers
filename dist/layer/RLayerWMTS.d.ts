import React from 'react';
import { Map } from 'ol';
import { Tile as OLRLayerTile } from 'ol/layer';
import { default as OLSourceWMTS } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { default as RLayer, RLayerProps } from './RLayer';
export interface RLayerWMTSProps extends RLayerProps {
    url: string;
    layer: string;
}
export default class RLayerWMTS extends RLayer<RLayerWMTSProps> {
    ol: OLRLayerTile;
    source: OLSourceWMTS;
    parser: WMTSCapabilities;
    constructor(props: Readonly<RLayerWMTSProps>, context: React.Context<Map>);
    createSource(): Promise<OLSourceWMTS>;
    refresh(): void;
}
//# sourceMappingURL=RLayerWMTS.d.ts.map