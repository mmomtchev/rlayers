import React from 'react';
import {Collection, Feature, MapBrowserEvent} from 'ol';
import {default as Select, SelectEvent} from 'ol/interaction/Select';
import {StyleLike} from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';
import Layer from 'ol/layer/Layer';
import RenderFeature from 'ol/render/Feature';

import {default as RBaseInteraction} from './RBaseInteraction';

/**
 * @propsfor RSelect
 */
export interface RSelectProps {
    /**
     * An optional OpenLayers condition to allow selection of the feature.
     * Use this if you want to use different events for add and remove instead
     * of toggle.
     * @default never
     */
    addCondition?: (e: MapBrowserEvent<UIEvent>) => boolean;

    /**
     * An optional OpenLayers condition.
     * Clicking on a feature selects that feature and removes any that were in
     * the selection.
     * Clicking outside any feature removes all from the selection.
     * See toggle, add, remove options for adding/removing extra features
     * to/from the selection.
     * @default singleClick
     */
    condition?: (e: MapBrowserEvent<UIEvent>) => boolean;

    /**
     * If placed inside a vector layer, RSelect will only select features
     * from that layer.
     *
     * If placed directly inside a map:
     * Features from this list of layers may be selected.
     * Alternatively, a filter function can be provided.
     * The function will be called for each layer in the map and should
     * return true for layers that you want to be selectable.
     * If the option is absent, all visible layers will be considered
     * selectable.
     */
    layers?: Layer[] | ((f: Layer) => boolean);

    /**
     * Style for rendering while selected, supports only Openlayers styles.
     * Once the interaction is finished, the resulting feature will adopt
     * the style of its layer.
     */
    style?: StyleLike;

    /**
     * An optional OpenLayers condition to allow deselection of the feature.
     * Use this if you want to use different events for add and remove instead
     * of toggle.
     * @default never
     */
    removeCondition?: (e: MapBrowserEvent<UIEvent>) => boolean;

    /**
     * An optional OpenLayers condition to allow toggling the selection.
     * This is in addition to the condition event. See add and remove if
     * you want to use different events instead of a toggle.
     * @default shiftKeyOnly */
    toggleCondition?: (e: MapBrowserEvent<UIEvent>) => boolean;

    /**
     * A boolean that determines if the default behaviour should select
     * only single features or all (overlapping) features at the clicked
     * map position.
     * The default of false means single select.
     * @default false
     */
    multi?: boolean;

    /**
     * Collection where the interaction will place selected features.
     * If not set the interaction will create a collection.
     */
    features?: Collection<Feature<Geometry>> | Feature<Geometry>;

    /**
     * A function that takes a Feature and a Layer and returns true if the
     * feature may be selected or false otherwise.
     */
    filter?: (Feature: Feature<Geometry> | RenderFeature, layer: Layer) => boolean;

    /**
     * Hit-detection tolerance.
     * Pixels inside the radius around the given position will be checked for
     * features.
     * @default 0
     */
    hitTolerance?: number;

    /**
     * Triggered when feature(s) has been (de)selected.
     */
    onSelect?: (this: RSelect, e: SelectEvent) => void;
}

/**
 * Interaction for selecting vector features.
 * When placed in a vector layer, the interaction will only select features
 * from that layer. When placed directly inside a map, features from all
 * visible layers may be selected, unless a filter array/function is provided.
 */
export default class RSelect extends RBaseInteraction<RSelectProps> {
    protected static classProps = [
        'addCondition',
        'condition',
        'layers',
        'style',
        'removeCondition',
        'toggleCondition',
        'multi',
        'features',
        'filter',
        'hitTolerance'
    ];
    ol: Select;

    createOL(props: RSelectProps): Select {
        this.classProps = RSelect.classProps;
        let layers: typeof props.layers;
        if (this.context?.vectorlayer) {
            layers = [this.context.vectorlayer];
        }
        return new Select({
            layers,
            ...Object.keys(props)
                .filter((p) => this.classProps.includes(p))
                .reduce((ac, p) => ({...ac, [p]: props[p]}), {})
        });
    }
}
