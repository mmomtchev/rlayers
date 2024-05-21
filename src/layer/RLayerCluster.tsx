import React from 'react';
import {Vector as LayerVector} from 'ol/layer';
import {Vector as SourceVector, Cluster as SourceCluster} from 'ol/source';
import BaseObject from 'ol/Object';
import {Feature} from 'ol';
import {Geometry} from 'ol/geom';
import {FeatureLike} from 'ol/Feature';

import {RContext, RContextType} from '../context';
import {default as RLayerBaseVector, RLayerBaseVectorProps} from './RLayerBaseVector';
import {default as RStyle} from '../style/RStyle';

/**
 * @propsfor RLayerCluster
 */
export interface RLayerClusterProps extends RLayerBaseVectorProps<Feature<Geometry>> {
    /** Clustering distance */
    distance?: number;
}

/**
 * A vector layer that clusters its RFeatures
 *
 * Compatible with RLayerVector
 *
 * Requires an `RMap` context
 *
 * Not compatible with a vector layer context for JSX-declared RFeatures
 */
export default class RLayerCluster extends RLayerBaseVector<Feature<Geometry>, RLayerClusterProps> {
    ol: LayerVector<Feature<Geometry>>;
    source: SourceCluster<Feature<Geometry>>;
    cluster: SourceVector<Feature<Geometry>>;

    protected createSource(props: Readonly<RLayerClusterProps>): BaseObject[] {
        this.cluster = new SourceVector<Feature<Geometry>>({
            features: this.props.features,
            url: this.props.url,
            format: this.props.format,
            loader: this.props.loader,
            wrapX: this.props.wrapX,
            strategy: this.props.strategy
        });
        this.source = new SourceCluster<Feature<Geometry>>({
            source: this.cluster,
            distance: this.props.distance
        });
        this.ol = new LayerVector<Feature<Geometry>>({
            ...props,
            source: this.source,
            style: RStyle.getStyle(props.style)
        });
        return [this.ol, this.source, this.cluster];
    }

    protected refresh(prev?: RLayerClusterProps): void {
        super.refresh(prev);
        if (prev?.distance !== this.props.distance) this.source.setDistance(this.props.distance);
        if (prev?.url !== this.props.url) {
            this.cluster.setUrl(this.props.url);
            this.cluster.refresh();
        }
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RLayerCluster'>
                <RContext.Provider
                    value={
                        {
                            ...this.context,
                            layer: this.ol,
                            source: this.cluster,
                            vectorlayer: this.ol,
                            vectorsource: this.cluster,
                            rLayer: this,
                            rLayerVector: this
                        } as RContextType
                    }
                >
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
