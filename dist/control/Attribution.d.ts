import React from 'react';
import { Map as OLMap } from 'ol';
import { Attribution as OLAttribution } from 'ol/control';
import { Options } from 'ol/control/Attribution';
import { default as ControlBase, ControlProps } from './ControlBase';
export interface AttributionProps extends ControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
}
export default class Attribution extends ControlBase<AttributionProps, null> {
    ol: OLAttribution;
    constructor(props: Readonly<AttributionProps>, context: React.Context<OLMap>);
    toOLProps(props: AttributionProps): Options;
}
//# sourceMappingURL=Attribution.d.ts.map