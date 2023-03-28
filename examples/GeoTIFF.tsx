import React from 'react';
import {RMap, RContextType} from 'rlayers';
import {default as RLayerRaster, RLayerRasterProps} from 'rlayers/layer/RLayerRaster';

import LayerTile from 'ol/layer/WebGLTile.js';
import {GeoTIFF} from 'ol/source';
import 'ol/ol.css';

import proj4 from 'proj4';
import {register} from 'ol/proj/proj4';

// This projection is used in the example
proj4.defs('EPSG:32636', '+proj=utm +zone=36 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
register(proj4);

/**
 * @propsfor RLayerGeoTIFF
 */
export interface RLayerGeoTIFFProps extends RLayerRasterProps {
    /** URLs of the GeoTIFFs, there must be at least one */
    urls: string[];
}

/**
 * This example shows how to extend RLayers with a component
 * that renders a layer from a COG (Cloud-Optimized GeoTIFF)
 *
 * It implements the Openlayers example from
 * https://openlayers.org/en/latest/examples/cog.html
 *
 * Requires an `RMap` context
 */
class RLayerGeoTIFF extends RLayerRaster<RLayerGeoTIFFProps> {
    ol: LayerTile;
    source: GeoTIFF;

    constructor(props: Readonly<RLayerGeoTIFFProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
        this.ol = new LayerTile({source: this.source});
        this.eventSources = [this.ol, this.source];
    }

    createSource(): void {
        this.source = new GeoTIFF({
            sources: this.props.urls.map((u) => ({url: u}))
        });
        this.eventSources = [this.ol, this.source];
    }

    // This is needed only if you want to automatically import
    // the GeoTIFF metadata into a View
    componentDidMount(): void {
        super.componentDidMount();
        this.context.map.setView(this.source.getView());
    }

    refresh(prevProps?: RLayerGeoTIFFProps): void {
        super.refresh(prevProps);
        if (
            prevProps?.urls?.length === this.props.urls.length &&
            this.props.urls.every((e, i) => e === prevProps?.urls?.[i])
        )
            return;

        this.createSource();
        this.ol.setSource(this.source);
        this.attachOldEventHandlers(this.source);
    }
}

export default function Example(): JSX.Element {
    return (
        <RMap width={'100%'} height={'60vh'} initial={{center: [0, 0], zoom: 1}}>
            <RLayerGeoTIFF
                properties={{label: 'GeoTIFF'}}
                urls={[
                    'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif'
                ]}
            />
        </RMap>
    );
}
