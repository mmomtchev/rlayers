import React from 'react';
import { Map } from 'ol';
import { OSM } from 'ol/source';
import { default as Layer, RLayerProps } from './RLayer';
export interface ROSMProps extends RLayerProps {
}
export default class ROSM extends Layer<ROSMProps> {
    source: OSM;
    constructor(props: Readonly<ROSMProps>, context: React.Context<Map>);
    refresh(): void;
}
//# sourceMappingURL=ROSM.d.ts.map