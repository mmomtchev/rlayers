import React from 'react';
import {Map} from 'ol';
import {Tile as OLRLayerTile} from 'ol/layer';
import {default as OLSourceWMTS, optionsFromCapabilities, Options} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';
import debug from '../debug';

export interface RLayerWMTSProps extends RLayerRasterProps {
    /** URL for the WMTS getCapabilites request */
    url: string;
    /** Layer name */
    layer: string;
    /** Called when the WMTS capabilities have been acquired */
    onSourceReady?: (opt: Options) => void;
}

/** A layer for WMTS-compatible raster tile servers */
export default class RLayerWMTS extends RLayerRaster<RLayerWMTSProps> {
    ol: OLRLayerTile;
    source: OLSourceWMTS;
    parser: WMTSCapabilities;

    constructor(props: Readonly<RLayerWMTSProps>, context: React.Context<Map>) {
        super(props, context);
        this.ol = new OLRLayerTile({source: this.source});
        this.parser = new WMTSCapabilities();
        this.createSource();
    }

    createSource(): Promise<OLSourceWMTS> {
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
                this.source = new OLSourceWMTS(options);
                this.ol.setSource(this.source);
                this.eventSources = [this.ol, this.source];
                if (this.props.onSourceReady) this.props.onSourceReady(options);
                return this.source;
            })
            .catch((e) => {
                console.error('failed loading WMTS capabilites', e);
                this.source = undefined;
                return null;
            });
    }

    refresh(): void {
        this.createSource();
        super.refresh();
    }
}
