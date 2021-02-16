import React from 'react';
import { OSM } from 'ol/source';
import { RContextType } from '../context';
import { default as LayerRaster, RLayerRasterProps } from './RLayerRaster';
export interface ROSMProps extends RLayerRasterProps {
}
export default class ROSM extends LayerRaster<ROSMProps> {
    source: OSM;
    constructor(props: Readonly<ROSMProps>, context: React.Context<RContextType>);
    refresh(): void;
}
//# sourceMappingURL=ROSM.d.ts.map