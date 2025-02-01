import React from 'react';
import {Tile as LayerTile} from 'ol/layer';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {StadiaMaps} from 'ol/source';

import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';

/**
 * @propsfor RLayerStadia
 */
export interface RLayerStadiaProps extends RLayerRasterProps {
    /** Stadia Maps layer name */
    layer: string;
    /** API key */
    apiKey?: string;
    /** Retina screen mode, @default false */
    retina?: boolean;
}

/**
 * A ready to use interface for Stadia Maps's map service
 *
 * Requires OpenLayers 8.0 and must be imported separately
 *
 * `import RLayerStadia from 'rlayers/layer/RLayerStadia';`
 *
 *
 * Requires an `RMap` context
 */
export default class RLayerStadia extends RLayerRaster<RLayerStadiaProps> {
    ol: LayerTile<StadiaMaps>;
    source: StadiaMaps;

    constructor(props: Readonly<RLayerStadiaProps>) {
        super(props);
        this.source = new StadiaMaps({
            layer: this.props.layer,
            apiKey: this.props.apiKey,
            retina: this.props.retina ?? false
        });
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }
}
