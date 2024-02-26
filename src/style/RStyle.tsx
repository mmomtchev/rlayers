import React, {PropsWithChildren} from 'react';
import ReactDOM from 'react-dom';
import LRU from 'lru-cache';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';

import {RContext, RContextType} from '../context';
import debug from '../debug';

/**
 * @propsfor RStyle
 */
export interface RStyleProps extends PropsWithChildren<unknown> {
    /** render function to be passed the feature and the resolution for dynamic styles
     *
     * a dynamic style cannot become a static style or the inverse
     */
    render?: (feature: Feature<Geometry>, resolution: number) => React.ReactElement;
    /** An optional cache size, valid only for dynamic styles */
    cacheSize?: number;
    /** The cache hashing function, must return a unique string for
     * every unique style computed by the rendering function
     */
    cacheId?: (feature: Feature<Geometry>, resolution: number) => string;
    /** zIndex controls which features are drawn over which features
     * when they overlap
     */
    zIndex?: number;
}

export type RStyleRef = React.RefObject<RStyle>;
export type RStyleLike = RStyleRef | RStyle | StyleLike;
export const useRStyle = (): RStyleRef => React.useRef();
export const createRStyle = (): RStyleRef => React.createRef();

/**
 * A style, all other style components must be descendants of `RStyle`
 *
 * It can be used with a React reference - `RStyleRef` which is a shortcut for
 * `React.RefObject<RStyle>` and a subtype of `RStyleLike`
 *
 * Or it can also be nested inside a vector layer to be
 * automatically assigned as the default style of that layer
 *
 * This is the only component that does not have to be part of an `RMap`
 *
 * It provides the special `RStyle` context
 */
export default class RStyle extends React.PureComponent<RStyleProps, Record<string, never>> {
    static contextType = RContext;
    context: RContextType;
    ol: StyleLike;
    childRefs: RStyleRef[];
    cache: LRU<string, Style>;

    constructor(props: Readonly<RStyleProps>, context?: React.Context<RContextType>) {
        super(props, context);
        if (props.render) this.ol = this.style;
        else this.ol = new Style({zIndex: props.zIndex});
        if (props.render && props.cacheSize && props.cacheId)
            this.cache = new LRU({max: props.cacheSize});
    }

    style = (f: Feature<Geometry>, r: number): Style | Style[] => {
        if (this.ol !== this.style) return this.ol as Style;
        let hash: string;
        if (this.cache) {
            hash = this.props.cacheId(f, r);
            const style = this.cache.get(hash);
            if (style) return style;
        }
        const style = new Style({zIndex: this.props.zIndex});
        const render = (
            <RContext.Provider value={{...this.context, style}}>
                {this.props.render(f, r)}
            </RContext.Provider>
        );
        ReactDOM.render(render, document.createElement('div'));
        if (this.cache) this.cache.set(hash, style);
        return style;
    };

    componentDidMount(): void {
        this.refresh();
    }

    componentDidUpdate(
        prevProps: Readonly<RStyleProps>,
        prev: Readonly<unknown>,
        snap: unknown
    ): void {
        if (this.props !== prevProps) {
            debug('willRefresh', this, prevProps, this.props);
            this.refresh(prevProps);
        }
    }

    refresh(prevProps?: RStyleProps): void {
        if (!prevProps || prevProps?.render !== this.props.render) {
            if (this.context?.styleArray) {
                if (this.ol === this.style)
                    throw new Error('An RStyleArray must contain only static RStyles');
                if (!this.context.styleArray.includes(this.ol as Style))
                    this.context.styleArray.push(this.ol as Style);
            } else if (this.context?.feature?.setStyle) {
                this.context.feature.setStyle(this.ol);
            } else if (this.context?.vectorlayer?.setStyle) {
                this.context.vectorlayer.setStyle(this.ol);
            } else if (this.context?.vectortilelayer?.setStyle) {
                this.context.vectortilelayer.setStyle(this.ol);
            }
            if (this.cache) this.cache.clear();
        }
        if (this.ol instanceof Style && (!prevProps || prevProps.zIndex !== this.props.zIndex))
            (this.ol as Style).setZIndex(this.props.zIndex);
    }

    render(): JSX.Element {
        if (this.props.render) return null;
        return (
            <div className='_rlayers_RStyle'>
                <RContext.Provider value={{...this.context, style: this.ol as Style}}>
                    {this.props.children}
                </RContext.Provider>
            </div>
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
            return (f: Feature<Geometry>, r: number) => (style as RStyle).style(f, r);

        // style is a React.RefObject
        // React.RefObjects are just plain JS objects after JS transpilation */
        if (Object.keys(style).includes('current'))
            return (f: Feature<Geometry>, r: number) => (style as RStyleRef).current.style(f, r);

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
        if (Object.keys(style).includes('current')) {
            asRStyle = (style as unknown as RStyleRef).current;
            if (asRStyle === undefined || asRStyle === null) return undefined;
        }

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
