import React from 'react';
import {Map} from 'ol';
import {Tile as LayerTile} from 'ol/layer';
import {default as SourceWMTS, optionsFromCapabilities, Options} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import {RContextType} from '../context';
import {default as RLayerRaster, RLayerRasterProps} from './RLayerRaster';
import debug from '../debug';

/**
 * @propsfor RLayerWMTS
 */
export interface RLayerWMTSProps extends RLayerRasterProps {
    /** URL for the WMTS getCapabilites request */
    url: string;
    /** Layer name */
    layer: string;
    /** Called each time the component is rerendered if/after the WMTS capabilities have been acquired */
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
    options: Options;

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
                this.options = optionsFromCapabilities(caps, {
                    layer: this.props.layer
                });
                if (this.props.attributions) this.options.attributions = this.props.attributions;
                this.options.crossOrigin = '';
                if (this.props.projection) this.options.projection = this.props.projection;
                this.options.wrapX = false;
                this.source = new SourceWMTS(this.options);
                this.ol.setSource(this.source);
                this.eventSources = [this.ol, this.source];
                if (this.props.onSourceReady) this.props.onSourceReady.call(this, this.options);
                return this.source;
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                console.error('failed loading WMTS', this.props.url, this.props.layer, e);
                this.source = undefined;
                return null;
            });
    }

    refresh(prevProps?: RLayerWMTSProps): void {
        if (prevProps?.url !== this.props.url || prevProps?.layer !== this.props.layer) {
            this.createSource().then(() => {
                this.ol.setSource(this.source);
                this.attachOldEventHandlers(this.source);
            });
        } else {
            if (this.props.onSourceReady) this.props.onSourceReady.call(this, this.options);
        }
    }
}
