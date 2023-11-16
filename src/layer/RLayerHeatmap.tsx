import React from 'react';
import {Feature} from 'ol';
import {Heatmap as LayerHeatmap} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import BaseObject from 'ol/Object';
import {Point} from 'ol/geom';

import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {OLFeatureClass} from 'rlayers/context';

/**
 * @propsfor RLayerHeatmap
 */
export interface RLayerHeatmapProps extends RLayerBaseVectorProps {
    /** Blurring */
    blur?: number;
    /** Radius */
    radius?: number;
    /** Weight function for each RFeature, weight goes from 0 to 1 */
    weight?: (f: Feature<Point>) => number;
    /**
     * OpenLayers features that will be loaded
     *
     * this property currently does not support dynamic updates
     */
    features?: Feature<Point>[];
}

/** A vector layer that renders its RFeatures as a heatmap
 *
 * Compatible with RLayerVector
 *
 * Requires an `RMap` context
 *
 * Provides a vector layer for JSX-declared RFeatures
 */
export default class RLayerHeatmap extends RLayerBaseVector<RLayerHeatmapProps> {
    ol: LayerHeatmap;
    source: SourceVector<OLFeatureClass>;

    protected createSource(props: Readonly<RLayerHeatmapProps>): BaseObject[] {
        this.source = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader,
            wrapX: this.props.wrapX,
            strategy: this.props.strategy
        });
        this.ol = new LayerHeatmap({...props, source: this.source});
        return [this.ol, this.source];
    }

    protected refresh(prev?: RLayerHeatmapProps): void {
        super.refresh(prev);
        if (prev?.blur !== this.props.blur) this.ol.setBlur(this.props.blur);
        if (prev?.radius !== this.props.radius) this.ol.setRadius(this.props.radius);
    }
}
