import React from 'react';
import { Map } from 'ol';
import { OSM } from 'ol/source';
import { default as LayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface ROSMProps extends RLayerRasterProps {
}
export default class ROSM extends LayerRaster<ROSMProps> {
    source: OSM;
    constructor(props: Readonly<ROSMProps>, context: React.Context<Map>);
    refresh(): void;
}
//# sourceMappingURL=ROSM.d.ts.map