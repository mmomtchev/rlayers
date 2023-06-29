import React from 'react';
import {Map as Map} from 'ol';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector} from 'ol/source';
import Geometry from 'ol/geom/Geometry';

import {RContextType} from '../context';
import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {default as RStyle} from '../style/RStyle';
import BaseObject from 'ol/Object';
import debug from '../debug';

/**
 * A vector layer
 *
 * Supports loading of features from external sources
 *
 * Requires an `RMap` context
 *
 * Provides a vector layer context for JSX-declared `RFeature`s
 */
export default class RLayerVector extends RLayerBaseVector<RLayerBaseVectorProps> {
    ol: LayerVector<SourceVector<Geometry>>;
    source: SourceVector<Geometry>;

    protected createSource(props: Readonly<RLayerBaseVectorProps>): BaseObject[] {
        this.source = new SourceVector({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader,
            wrapX: this.props.wrapX,
            strategy: this.props.strategy
        });
        this.ol = new LayerVector({
            ...props,
            style: RStyle.getStyle(this.props.style),
            source: this.source
        });
        return [this.ol, this.source];
    }

    protected refresh(prevProps?: RLayerBaseVectorProps): void {
        super.refresh(prevProps);
        if (prevProps?.url !== this.props.url) {
            this.source.setUrl(this.props.url);
            this.source.refresh();
        }
    }
}
