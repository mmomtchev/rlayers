import React from 'react';
import ReactDOM from 'react-dom';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RStyleContext} from '../context';
import {ReactLayersBase} from '../REvent';
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
export default class RStyle extends ReactLayersBase<RStyleProps, null> {
    ol: StyleLike;

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

    refresh(prevProps?: RStyleProps): void {
        super.refresh(prevProps);
    }

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
        if (style === null || style === undefined) return style as StyleLike;
        if (style.constructor.name === 'RStyle') return (f: Feature) => (style as RStyle).style(f);
        /* React.RefObjects are just plain JS objects after JS transpilation */
        if (Object.keys(style).includes('current'))
            return (f: Feature) => (style as RStyleRef).current.style(f);
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
        if (style === null || style === undefined) return style as Style;

        let asRStyle;
        if (style.constructor.name === 'RStyle') asRStyle = (style as unknown) as RStyle;
        /* React.RefObjects are just plain JS objects after JS transpilation */
        if (Object.keys(style).includes('current'))
            asRStyle = ((style as unknown) as RStyleRef).current;
        if (asRStyle) {
            if (asRStyle.ol !== undefined && typeof asRStyle.ol !== 'function')
                return asRStyle.ol as Style;
            throw new TypeError('RStyle is dynamic and cannot be converted to Style');
        }
        return style as Style;
    }
}
