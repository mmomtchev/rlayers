import React from 'react';
import ReactDOM from 'react-dom';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RStyleContext} from '../context';
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

/** A style, all other style components must be descendants of `RStyle` */
export default class RStyle extends RlayersBase<RStyleProps, null> {
    ol: StyleLike;
    childRefs: RStyleRef[];

    constructor(props: Readonly<RStyleProps>, context: React.Context<Map>) {
        super(props, context);
        if (props.render) this.ol = this.style;
        else this.ol = new Style({});
    }

    style = (f: Feature): Style | Style[] => {
        if (this.ol !== this.style) return this.ol as Style;
        const style = new Style({});
        const render = (
            <React.Fragment>
                <RStyleContext.Provider value={style}>
                    {this.props.render(f)}
                </RStyleContext.Provider>
            </React.Fragment>
        );
        ReactDOM.render(render, document.createElement('div'));
        return style;
    };

    render(): JSX.Element {
        return (
            <React.Fragment>
                <RStyleContext.Provider value={this.ol}>
                    {this.props.render ? null : this.props.children}
                </RStyleContext.Provider>
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
        return style as Style;
    }
}
