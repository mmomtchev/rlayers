import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import {default as Modify} from 'ol/interaction/Modify';

import {default as RPointer} from './RPointer';
import {RStyleLike} from '../style/RStyle';
import debug from '../debug';

export interface RModifyProps {
    /** An optionnal condition for triggering the interaction
     * @default primaryAction */
    condition?: (e: MapBrowserEvent) => boolean;
    /** An optional OpenLayers condition to allow removal of the feature
     * @default (altKeyOnly+singleClick) */
    deleteCondition?: (e: MapBrowserEvent) => boolean;
    /** An optional OpenLayers condition to allow adding of a vertex
     * @default true */
    insertVertexCondition?: (e: MapBrowserEvent) => boolean;
    /** Style for rendering the features */
    style?: RStyleLike;
    /** Snap tolerance in pixels
     * @default 10 */
    pixelTolerance?: number;
    /** True hit detection based on feature shape
     * @default false */
    hitDetection?: number;
}

/** Pointer interaction for modifying existing features */
export default class RModify extends RPointer<RModifyProps> {
    static classProps = [
        'condition',
        'deleteCondition',
        'insertVertexCondition',
        'style',
        'pixelTolerance',
        'hitDetection'
    ];
    ol: Modify;

    createOL(props: RModifyProps): Modify {
        if (!this?.context?.vectorsource)
            throw new Error('A Modify interaction must be part of a vector layer');
        this.classProps = RModify.classProps;
        return new Modify({
            source: this.context.vectorsource,
            ...Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        });
    }
}
