import { Collection, Feature } from 'ol';
import { default as Translate, TranslateEvent } from 'ol/interaction/Translate';
import BaseLayer from 'ol/layer/Base';
import RenderFeature from 'ol/render/Feature';
import { default as RPointer } from './RPointer';
export interface RTranslateProps {
    features?: Collection<Feature> | Feature;
    layers?: BaseLayer[] | ((layer: BaseLayer) => boolean);
    filter?: (Feature: Feature | RenderFeature, layer: BaseLayer) => boolean;
    hitTolerance?: number;
    onTranslateEnd?: (e: TranslateEvent) => void;
    onTranslateStart?: (e: TranslateEvent) => void;
    onTranslating?: (e: TranslateEvent) => void;
}
export default class RTranslate extends RPointer<RTranslateProps> {
    static classProps: string[];
    ol: Translate;
    createOL(props: RTranslateProps): Translate;
}
//# sourceMappingURL=RTranslate.d.ts.map