import React from 'react';
import {Map} from 'ol';
import {WebGLTile as LayerTileWebGL} from 'ol/layer';
import {OSM} from 'ol/source';

import {RContextType} from '../context';
import {default as RLayerWebGL, RLayerWebGLProps} from './RLayerWebGL';

/**
 * Properties for ROSMWebGL
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ROSMWebGLProps extends RLayerWebGLProps {}

/**
 * An OpenStreetMap layer rendered by WebGL
 *
 * Requires an `RMap` context
 */
export default class ROSMWebGL extends RLayerWebGL<ROSMWebGLProps> {
    source: OSM;

    constructor(props: Readonly<ROSMWebGLProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.source = new OSM();
        this.ol = new LayerTileWebGL({source: this.source, cacheSize: props.cacheSize});
        this.eventSources = [this.ol, this.source];
    }

    refresh(prevProps?: ROSMWebGLProps): void {
        super.refresh(prevProps);
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}
