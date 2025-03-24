import React from 'react';
import {Feature, Map as Map} from 'ol';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import {FeatureLike} from 'ol/Feature';

import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {default as RStyle} from '../style/RStyle';
import BaseObject from 'ol/Object';
import debug from '../debug';
import {Geometry} from 'ol/geom';

/**
 * A vector layer
 *
 * Supports loading of features from external sources.
 *
 * Requires an `RMap` context.
 *
 * Provides a vector layer context for JSX-declared `RFeature`s.
 *
 * @example
 * <RLayerVector>
 *   <RFeature geometry={geom1} />
 *   <RFeature geometry={geom2} />
 * </RLayerVector>
 *
 * Features can also be typed when using TSX:
 *
 * @example
 * <RLayerVector<Feature<Point>>
 *   <RFeature geometry={point1} />
 *   <RFeature geometry={point1} />
 * </RLayerVector>
 *
 * In this case, all callbacks will be automatically typed.
 *
 * Since 3.0, RLayerVector also supports OpenLayers light-weight RenderFeatures.
 * Currently these light-weight feature cannot be created using TSX/JSX and must
 * be read from a file.
 *
 * @example
 * <RLayerVector<RenderFeature> format={new GeoJSON({featureProjection: 'EPSG:3857'})} />
 */
export default class RLayerVector<
    F extends FeatureLike = Feature<Geometry>
> extends RLayerBaseVector<F, RLayerBaseVectorProps<F>> {
    ol: LayerVector<SourceVector<F>, F>;
    source: SourceVector<F>;

    protected createSource(props: Readonly<RLayerBaseVectorProps<F>>): BaseObject[] {
        this.source = new SourceVector<F>({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader,
            wrapX: this.props.wrapX,
            strategy: this.props.strategy,
            attributions: this.props.attributions
        });
        this.ol = new LayerVector<SourceVector<F>, F>({
            ...props,
            style: RStyle.getStyle(this.props.style),
            source: this.source
        });
        return [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerBaseVectorProps<F>): void {
        super.refresh(prevProps);
        if (prevProps?.url !== this.props.url) {
            this.source.setUrl(this.props.url);
            this.source.refresh();
        }
    }
}
