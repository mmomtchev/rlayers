import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {default as SourceWMTS, optionsFromCapabilities, Options} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';
import debug from '../debug';

export interface RLayerWMTSProps extends RLayerRasterProps {
    /** URL for the WMTS getCapabilites request */
    url: string;
    /** Layer name */
    layer: string;
    /** Called when the WMTS capabilities have been acquired */
    onSourceReady?: (this: RLayerWMTS, opt: Options) => void;
}

/**
 * A layer for WMTS-compatible raster tile servers
 *
 * Requires an `RMap` context
 */
export default class RLayerWMTS extends RLayerRaster<RLayerWMTSProps> {
    ol: LayerTile<SourceWMTS>;
    source: SourceWMTS;
    parser: WMTSCapabilities;

    constructor(props: Readonly<RLayerWMTSProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new LayerTile({source: this.source});
        this.parser = new WMTSCapabilities();
        this.createSource();
    }

    createSource(): Promise<SourceWMTS> {
        debug('createSource', this);
        return fetch(this.props.url)
            .then((r) => r.text())
            .then((text) => {
                const caps = this.parser.read(text);
                const options = optionsFromCapabilities(caps, {
                    layer: this.props.layer
                });
                if (this.props.attributions) options.attributions = this.props.attributions;
                options.crossOrigin = '';
                if (this.props.projection) options.projection = this.props.projection;
                options.wrapX = false;
                this.source = new SourceWMTS(options);
                this.ol.setSource(this.source);
                this.eventSources = [this.ol, this.source];
                if (this.props.onSourceReady) this.props.onSourceReady.call(this, options);
                return this.source;
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.error('failed loading WMTS capabilities', e);
                this.source = undefined;
                return null;
            });
    }

    refresh(prevProps?: RLayerWMTSProps): void {
        this.createSource().then(() => super.refresh(prevProps));
    }
}
