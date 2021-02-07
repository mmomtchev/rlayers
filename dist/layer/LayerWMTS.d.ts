import React from 'react';
import { Map as OLMap } from 'ol';
import { Tile as OLLayerTile } from 'ol/layer';
import { default as OLSourceWMTS } from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';
import { Layer, LayerProps } from '..';
export interface LayerWMTSProps extends LayerProps {
    url: string;
    layer: string;
}
declare class LayerWMTS extends Layer<LayerWMTSProps> {
    ol: OLLayerTile;
    source: OLSourceWMTS;
    parser: WMTSCapabilities;
    constructor(props: Readonly<LayerWMTSProps>, context: React.Context<OLMap>);
    createSource(): Promise<OLSourceWMTS>;
    refresh(): void;
}
export default LayerWMTS;
//# sourceMappingURL=LayerWMTS.d.ts.map