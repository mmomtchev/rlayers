import LayerGraticule from 'ol/layer/Graticule';
import {Extent} from 'ol/extent';

import React from 'react';
import {RContextType} from '../context';
import {default as RLayer, RLayerProps} from './RLayer';
import {RStyle, RStyleLike} from 'rlayers/style';
import debug from 'rlayers/debug';

export type Formatter = (value: number) => string;

/**
 * @propsfor RLayerGraticule
 */
export interface RLayerGraticuleProps extends RLayerProps {
    /** CSS class */
    className?: string;
    /** Extent of the map, cannot be dynamically modified */
    extent?: Extent;
    /**
     * Maximum number of meridians / parallels
     * @default 100
     */
    maxLines?: number;
    /**
     * Target size of the graticule cells
     * @default 100
     */
    targetSize?: number;
    /**
     * Stroke style for the lines
     */
    strokeStyle?: RStyleLike;
    /**
     * Show labels
     * @default false
     */
    showLabels?: boolean;
    /**
     * Formatter for the longitude labels
     */
    lonLabelFormatter?: Formatter;
    /**
     * Formatter for the latitude labels
     */
    latLabelFormatter?: Formatter;
    /**
     * Longitude labels style
     */
    lonLabelStyle?: RStyleLike;
    /**
     * Latitude labels style
     */
    latLabelStyle?: RStyleLike;
    /**
     * Intervals (in degrees) for the graticule
     * @default [90, 45, 30, 20, 10, 5, 2, 1, 30/60, 20/60, 10/60, 5/60, 2/60, 1/60, 30/3600, 20/3600, 10/3600, 5/3600, 2/3600, 1/3600]
     */
    intervals?: number[];
    /**
     * Wrap around the antimeridian
     * @default true
     */
    wrap?: boolean;
}

/**
 * A layer that renders a static image
 */
export default class RLayerGraticule extends RLayer<RLayerGraticuleProps> {
    ol: LayerGraticule;

    constructor(props: Readonly<RLayerGraticuleProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.createSource();
    }

    createSource(): void {
        const stroke = RStyle.getStyleStatic(this.props.strokeStyle)?.getStroke?.();
        const lonText = RStyle.getStyleStatic(this.props.lonLabelStyle)?.getText?.();
        const latText = RStyle.getStyleStatic(this.props.latLabelStyle)?.getText?.();
        this.ol = new LayerGraticule({
            ...this.props,
            strokeStyle: stroke,
            lonLabelStyle: lonText,
            latLabelStyle: latText
        });
        this.eventSources = [this.ol];
        return;
    }

    refresh(prevProps?: RLayerGraticuleProps): void {
        super.refresh(prevProps);
        const old = this.context.map.removeLayer(this.ol);
        this.createSource();
        this.attachOldEventHandlers(this.ol);
        if (old) this.context.map.addLayer(this.ol);
    }
}
