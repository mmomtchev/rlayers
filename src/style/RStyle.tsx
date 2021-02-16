import React from 'react';
import ReactDOM from 'react-dom';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RContext, RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

export interface RStyleProps {
    /** render function to be passed the feature for dynamic styles
     *
     * a dynamic style cannot become a static style or the inverse
     */
    render?: (f: Feature) => React.ReactElement;
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

    constructor(props: Readonly<RStyleProps>, context: React.Context<RContextType>) {
        super(props, context);
        if (props.render) this.ol = this.style;
        else this.ol = new Style({});
    }

    style = (f: Feature): Style | Style[] => {
        if (this.ol !== this.style) return this.ol as Style;
        const style = new Style({});
        const render = (
            <React.Fragment>
                <RContext.Provider value={{...this.context, style}}>
                    {this.props.render(f)}
                </RContext.Provider>
            </React.Fragment>
        );
        ReactDOM.render(render, document.createElement('div'));
        return style;
    };

    refresh(prevProps?: RStyleProps): void {
        super.refresh(prevProps);
        if (this.context?.vectorlayer?.setStyle) this.context?.vectorlayer?.setStyle(this.ol);
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
            return (f: Feature) => (style as RStyle).style(f);

        // style is a React.RefObject
        // React.RefObjects are just plain JS objects after JS transpilation */
        if (Object.keys(style).includes('current'))
            return (f: Feature) => (style as RStyleRef).current.style(f);

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
