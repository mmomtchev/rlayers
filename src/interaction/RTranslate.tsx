import React from 'react';
import {Collection, Feature} from 'ol';
import {default as Translate, TranslateEvent} from 'ol/interaction/Translate';
import Geometry from 'ol/geom/Geometry';
import BaseLayer from 'ol/layer/Base';
import RenderFeature from 'ol/render/Feature';

import {default as RPointer} from './RPointer';
import debug from '../debug';

/**
 * @propsfor RTranslate
 */
export interface RTranslateProps {
    /** Translatable features
     * @default all */
    features?: Collection<Feature<Geometry>> | Feature<Geometry>;
    /** Translatable layers
     * @default all */
    layers?: BaseLayer[] | ((layer: BaseLayer) => boolean);
    /** Filter translatable features
     * @default all */
    filter?: (Feature: Feature<Geometry> | RenderFeature, layer: BaseLayer) => boolean;
    /** Hit-detection tolerance in pixels
     * @default 0 */
    hitTolerance?: number;
    /** Called when the translation is released */
    onTranslateEnd?: (this: RTranslate, e: TranslateEvent) => void;
    /** Called when the translation is started */
    onTranslateStart?: (this: RTranslate, e: TranslateEvent) => void;
    /** Called on every pointer move while the translation is active */
    onTranslating?: (this: RTranslate, e: TranslateEvent) => void;
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
