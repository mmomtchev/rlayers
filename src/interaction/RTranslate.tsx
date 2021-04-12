import React from 'react';
import {Collection, Feature, Map, MapBrowserEvent} from 'ol';
import Translate, {TranslateEvent} from 'ol/interaction/Translate';
import BaseLayer from 'ol/layer/Base';
import RenderFeature from 'ol/render/Feature';

import RPointer from './RPointer';
import debug from '../debug';

export interface RTranslateProps {
    /** Translatable features
     * @default all */
    features?: Collection<Feature> | Feature;
    /** Translatable layers
     * @default all */
    layers?: BaseLayer[] | ((layer: BaseLayer) => boolean);
    /** Filter translatable features
     * @default all */
    filter?: (Feature: Feature | RenderFeature, layer: BaseLayer) => boolean;
    /** Hit-detection tolerance in pixels
     * @default 0 */
    hitTolerance?: number;
    /** Called when the translation is released */
    onTranslateEnd?: (e: TranslateEvent) => void;
    /** Called when the translation is started */
    onTranslateStart?: (e: TranslateEvent) => void;
    /** Called on every pointer move while the translation is active */
    onTranslating?: (e: TranslateEvent) => void;
}

/**
 * A feature translation interaction
 */
export default class RTranslate extends RPointer<RTranslateProps> {
    static classProps = ['features', 'layers', 'filter', 'hitTolerance'];
    ol: Translate;

    createOL(props: RTranslateProps): Translate {
        this.classProps = RTranslate.classProps;
        return new Translate(
            Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        );
    }
}
