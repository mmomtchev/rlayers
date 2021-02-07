import React from 'react';
import { Map as OLMap } from 'ol';
import { OSM as OLOSM } from 'ol/source';
import { default as Layer, LayerProps } from './Layer';
export interface OSMProps extends LayerProps {
}
declare class OSM extends Layer<OSMProps> {
    source: OLOSM;
    constructor(props: Readonly<OSMProps>, context: React.Context<OLMap>);
    refresh(): void;
}
export default OSM;
//# sourceMappingURL=OSM.d.ts.map