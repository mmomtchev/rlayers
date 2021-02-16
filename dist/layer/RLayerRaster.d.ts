import { Layer } from 'ol/layer';
import { Source } from 'ol/source';
import { TileSourceEvent } from 'ol/source/Tile';
import { default as RLayer, RLayerProps } from './RLayer';
export interface RLayerRasterProps extends RLayerProps {
    onTileLoadEnd?: (e: TileSourceEvent) => void;
    onTileLoadStart?: (e: TileSourceEvent) => void;
    onTileLoadError?: (e: TileSourceEvent) => void;
}
export default class RLayerRaster<P extends RLayerRasterProps> extends RLayer<P> {
    ol: Layer;
    source: Source;
}
//# sourceMappingURL=RLayerRaster.d.ts.map