import React from 'react';
import {Map, Feature} from 'ol';
import {Heatmap as OLRLayerHeatmap} from 'ol/layer';
import {Vector as OLSourceVector} from 'ol/source';

import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';

export interface RLayerHeatmapProps extends RLayerBaseVectorProps {
    /** Blurring */
    blur?: number;
    /** Radius */
    radius?: number;
    /** Weight function for each RFeature, weight goes from 0 to 1 */
    weight?: (f: Feature) => number;
}

/** A vector layer that renders its RFeatures as a heatmap
 *
 * Compatible with RLayerVector
 *
 * Provides a `RVectorContext` for JSX-declared RFeatures
 */
export default class RLayerHeatmap extends RLayerBaseVector<RLayerHeatmapProps> {
    ol: OLRLayerHeatmap;
    source: OLSourceVector;
    context: Map;

    constructor(props: Readonly<RLayerHeatmapProps>, context: React.Context<Map>) {
        super(props, context);
        this.source = new OLSourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format
        });
        this.ol = new OLRLayerHeatmap({source: this.source, ...props});
        this.eventSources = [this.ol, this.source];
        this.source.on('RFeaturesloadend', this.newFeature);
        this.source.on('addRFeature', this.newFeature);
        this.refresh();
    }

    refresh(prev?: RLayerHeatmapProps): void {
        super.refresh();
        if (!prev || prev.blur !== this.props.blur) this.ol.setBlur(this.props.blur);
        if (!prev || prev.radius !== this.props.radius) this.ol.setRadius(this.props.radius);
    }
}
