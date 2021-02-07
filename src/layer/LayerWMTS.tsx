import React from 'react';
import {Map as OLMap} from 'ol';
import {Tile as OLLayerTile} from 'ol/layer';
import {default as OLSourceWMTS, optionsFromCapabilities} from 'ol/source/WMTS';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';

import {Map, Layer, LayerProps} from '..';
import debug from '../debug';

export interface LayerWMTSProps extends LayerProps {
    url: string;
    layer: string;
}

class LayerWMTS extends Layer<LayerWMTSProps> {
    ol: OLLayerTile;
    source: OLSourceWMTS;
    parser: WMTSCapabilities;

    constructor(props: Readonly<LayerWMTSProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLLayerTile({source: this.source});
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
                options.attributions = this.props.attributions;
                options.crossOrigin = '';
                options.projection = this.props.projection;
                options.wrapX = false;
                this.source = new OLSourceWMTS(options);
                this.ol.setSource(this.source);
                return this.source;
            });
    }

    refresh(): void {
        this.createSource();
        super.refresh();
    }
}

export default LayerWMTS;
