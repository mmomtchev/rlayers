import React from 'react';
import {Map as OLMap, Feature as OLFeature} from 'ol';
import {Heatmap as OLLayerHeatmap} from 'ol/layer';
import {Vector as OLSourceVector} from 'ol/source';

import {default as LayerBaseVector, LayerBaseVectorProps} from './LayerBaseVector';

export interface LayerHeatmapProps extends LayerBaseVectorProps {
    blur?: number;
    radius?: number;
    weight?: (f: OLFeature) => number;
}

class LayerHeatmap extends LayerBaseVector<LayerHeatmapProps> {
    ol: OLLayerHeatmap;
    source: OLSourceVector;
    context: OLMap;

    constructor(props: Readonly<LayerHeatmapProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLLayerHeatmap({source: this.source, ...props});
        this.eventSources = [this.ol, this.source];
        this.ol.on('change', this.onchange);
        this.refresh();
    }

    refresh(prev?: LayerHeatmapProps): void {
        if (!prev || prev.blur !== this.props.blur) this.ol.setBlur(this.props.blur);
        if (!prev || prev.radius !== this.props.radius) this.ol.setRadius(this.props.radius);
    }
}

export default LayerHeatmap;
