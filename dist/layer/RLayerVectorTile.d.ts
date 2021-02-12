import React from 'react';
import { Map, MapBrowserEvent } from 'ol';
import { VectorTile as LayerVectorTile } from 'ol/layer';
import { VectorTile as SourceVectorTile } from 'ol/source';
import { StyleLike } from 'ol/style/Style';
import FeatureFormat from 'ol/format/Feature';
import { default as RLayer, RLayerProps } from './RLayer';
export interface RLayerVectorTileProps extends RLayerProps {
    url: string;
    style: StyleLike;
    format: FeatureFormat;
    onClick?: (e: MapBrowserEvent) => boolean | void;
    onPointerMove?: (e: MapBrowserEvent) => boolean | void;
    onPointerEnter?: (e: MapBrowserEvent) => boolean | void;
}
export default class RLayerVectorTile extends RLayer<RLayerVectorTileProps> {
    ol: LayerVectorTile;
    source: SourceVectorTile;
    context: Map;
    constructor(props: Readonly<RLayerVectorTileProps>, context: React.Context<Map>);
    refresh(prevProps?: RLayerVectorTileProps): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RLayerVectorTile.d.ts.map