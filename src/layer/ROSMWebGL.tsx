import React from 'react';
import {ImageTile, Map} from 'ol';
import DataTile from 'ol/DataTile';
import {WebGLTile as LayerTileWebGL} from 'ol/layer';
import {OSM} from 'ol/source';
import {DataTile as SourceDataTile, ImageTile as SourceImageTile} from 'ol/source';

import {default as RLayerWebGL, RLayerWebGLProps} from './RLayerWebGL';

/**
 * @propsfor ROSMWebGL
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ROSMWebGLProps extends RLayerWebGLProps {}

/**
 * An OpenStreetMap layer rendered by WebGL
 *
 * Requires an `RMap` context
 */
export default class ROSMWebGL extends RLayerWebGL<ROSMWebGLProps, ImageTile> {
    source: SourceDataTile<ImageTile>;

    constructor(props: Readonly<ROSMWebGLProps>) {
        super(props);
        this.source = new OSM() as unknown as SourceDataTile<ImageTile>;
        this.ol = new LayerTileWebGL({
            source: this.source as unknown as SourceDataTile<DataTile>,
            cacheSize: props.cacheSize
        });
        this.eventSources = [this.ol, this.source];
    }

    protected refresh(prevProps?: ROSMWebGLProps): void {
        super.refresh(prevProps);
        this.ol.setProperties({label: 'OpenStreetMap'});
    }
}
