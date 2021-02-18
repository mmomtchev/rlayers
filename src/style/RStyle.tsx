import React from 'react';
import ReactDOM from 'react-dom';
import LRU from 'lru-cache';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RContext, RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

export interface RStyleProps {
    /** render function to be passed the feature and the resolution for dynamic styles
     *
     * a dynamic style cannot become a static style or the inverse
     */
    render?: (feature: Feature, resolution: number) => React.ReactElement;
    /** An optional cache size, valid only for dynamic styles */
    cacheSize?: number;
    /** The cache hashing function, must return a unique string for
     * every unique style computed by the rendering funciton
     */
    cacheId?: (feature: Feature, resolution: number) => string;
}

export type RStyleRef = React.RefObject<RStyle>;
export type RStyleLike = RStyleRef | RStyle | StyleLike;
export const useRStyle = (): RStyleRef => React.useRef();
export const createRStyle = (): RStyleRef => React.createRef();

/** A style, all other style components must be descendants of `RStyle`
 *
 * It can be used with a React reference - `RStyleRef` which is a shortcut for
 * `React.RefObject<RStyle>` and a subtype of `RStyleLike`
 *
 * Or it can also be nested inside a vector layer to be
 * automatically assigned as the default style of that layer
 */
export default class RStyle extends RlayersBase<RStyleProps, null> {
    ol: StyleLike;
    childRefs: RStyleRef[];
    cache: LRU;

    constructor(props: Readonly<RStyleProps>, context: React.Context<RContextType>) {
        super(props, context);
        if (props.render) this.ol = this.style;
        else this.ol = new Style({});
        if (props.render && props.cacheSize && props.cacheId)
            this.cache = new LRU({max: props.cacheSize});
    }

    style = (f: Feature, r: number): Style | Style[] => {
        if (this.ol !== this.style) return this.ol as Style;
        let hash;
        if (this.cache) {
            hash = this.props.cacheId(f, r);
            const style = this.cache.get(hash);
            if (style) return style;
        }
        const style = new Style({});
        const render = (
            <React.Fragment>
                <RContext.Provider value={{...this.context, style}}>
                    {this.props.render(f, r)}
                </RContext.Provider>
            </React.Fragment>
        );
        ReactDOM.render(render, document.createElement('div'));
        if (this.cache) this.cache.set(hash, style);
        return style;
    };

    componentDidMount(): void {
        super.componentDidMount();
        this.refresh();
    }

    refresh(prevProps?: RStyleProps): void {
        super.refresh();
        if (!prevProps || prevProps?.render !== this.props.render) {
            if (this.context?.feature?.setStyle) this.context.feature.setStyle(this.ol);
            else if (this.context?.vectorlayer?.setStyle)
                this.context.vectorlayer.setStyle(this.ol);
            if (this.cache) this.cache.reset();
        }
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                {this.props.render ? null : (
                    <RContext.Provider value={{...this.context, style: this.ol as Style}}>
                        {this.props.children}
                    </RContext.Provider>
                )}
            </React.Fragment>
        );
    }

    /** This is a static function that will return an
     * OpenLayers-compatible `StyleLike` from an `RStyleLike`.
     *
     * @param {RStyleLike} style
     * @public
     */
    static getStyle(style: RStyleLike): StyleLike {
        // style is undefined or null
        if (style === null || style === undefined) return style as StyleLike;

        // style is RStyle or RStyleArray
        if (typeof (style as RStyle).style === 'function')
            return (f: Feature, r: number) => (style as RStyle).style(f, r);

        // style is a React.RefObject
        // React.RefObjects are just plain JS objects after JS transpilation */
        if (Object.keys(style).includes('current'))
            return (f: Feature, r: number) => (style as RStyleRef).current.style(f, r);

        // style is an OpenLayers StyleLike
        return style as StyleLike;
    }

    /** This is a static function that will return an
     * OpenLayers-compatible `Style` from a static `RStyleLike`.
     * This discards the reference and the returned style won't
     * be updated if the referenced `<RStyle>` is updated.
     *
     * It throws if the reference is a dynamic style.
     *
     * @param {RStyleLike} style
     * @public
     */
    static getStyleStatic(style: RStyleLike): Style {
        // style is undefined or null
        if (style === null || style === undefined) return style as Style;

        let asRStyle;

        // style is RStyle or RStyleArray
        if (typeof (style as RStyle).style === 'function') asRStyle = style as RStyle;

        // style is a React.RefObject
        // React.RefObjects are just plain JS objects after JS transpilation
        if (Object.keys(style).includes('current'))
            asRStyle = ((style as unknown) as RStyleRef).current;

        if (asRStyle) {
            // style is a static RStyle or RStyleArray or reference
            if (asRStyle.ol !== undefined && typeof asRStyle.ol !== 'function')
                return asRStyle.ol as Style;

            // style is a dynamic RStyle or RStyleArray or reference
            throw new TypeError('RStyle is dynamic and cannot be converted to Style');
        }

        // style is an OpenLayers StyleLike
        if (typeof style === 'function')
            throw new TypeError('StyleLike is dynamic and cannot be converted to Style');
        return style as Style;
    }
}
