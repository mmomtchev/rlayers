import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {default as Draw} from 'ol/interaction/Draw';
import {StyleLike} from 'ol/style/Style';

import {default as RPointer} from './RPointer';
import RStyle from '../style/RStyle';
import debug from '../debug';

/**
 * @propsfor RDraw
 */
export interface RDrawProps {
    /** Type of the geometry */
    type:
        | 'Point'
        | 'LineString'
        | 'LinearRing'
        | 'Polygon'
        | 'MultiPoint'
        | 'MultiLineString'
        | 'MultiPolygon'
        | 'GeometryCollection'
        | 'Circle';
    /** An optionnal condition for triggering the interaction
     * @default noModifierKeys */
    condition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /** An optional OpenLayers condition to allow the interaction to finish */
    finishCondition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /** An optional OpenLayers condition to activate freehand drawing
     * @default shiftKeyOnly */
    freehandCondition?: (e: MapBrowserEvent<UIEvent>) => boolean;
    /**
     * Style for rendering while drawing, supports only Openlayers styles.
     * Once the interaction is finished, the resulting feature will adopt
     * the style of its layer.
     */
    style?: StyleLike;
    /** Do not trigger pointer events while the interaction is active */
    stopClick?: boolean;
    /** Maximum number of points allowed per feature
     * @default Infinity */
    maxPoints?: number;
    /** Minimum number of points allowed per feature
     * @default 2-3 */
    minPoints?: number;
    /** Snap tolerance in pixels
     * @default 12 */
    snapTolerance?: number;
}

/** Pointer interaction for drawing features */
export default class RDraw extends RPointer<RDrawProps> {
    static classProps = [
        'condition',
        'finishCondition',
        'freehandCondition',
        'style',
        'stopClick',
        'maxPoints',
        'minPoints',
        'snapTolerance'
    ];
    ol: Draw;

    createOL(props: RDrawProps): Draw {
        if (!this?.context?.vectorsource)
            throw new Error('A Draw interaction must be part of a vector layer');
        this.classProps = RDraw.classProps;
        return new Draw({
            type: props.type,
            source: this.context.vectorsource,
            ...Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        });
    }
}
