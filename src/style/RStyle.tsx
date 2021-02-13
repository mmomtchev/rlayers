import React from 'react';
import ReactDOM from 'react-dom';
import {Map, Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';
import {Stroke, Fill, Circle} from 'ol/style';

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
export type RStyleLike = RStyleRef | StyleLike;

/** A style, all other style components must be descendants of style */
export default class RStyle extends ReactLayersBase<RStyleProps, null> {
    ol: StyleLike;

    constructor(props: Readonly<RStyleProps>, context: React.Context<Map>) {
        super(props, context);
        if (this.props.render) this.ol = this.style;
        else this.ol = new Style({});
    }

    style = (f: Feature): Style => {
        if (this.ol !== this.style) return this.ol as Style;
        const style = new Style({});
        const render = (
            <div>
                <RStyleContext.Provider value={style}>
                    {this.props.render(f)}
                </RStyleContext.Provider>
            </div>
        );
        ReactDOM.render(render, document.createElement('div'));
        return style;
    };

    refresh(prevProps?: RStyleProps): void {
        super.refresh(prevProps);
    }

    componentDidMount(): void {
        super.componentDidMount();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
    }

    render(): JSX.Element {
        return (
            <div>
                <RStyleContext.Provider value={this.ol}>
                    {this.props.render ? null : this.props.children}
                </RStyleContext.Provider>
            </div>
        );
    }

    static getStyle(style: RStyleLike): StyleLike {
        if (style === null || style === undefined) return style as StyleLike;
        if (!Object.keys(style).includes('current')) return style as StyleLike;
        return (f: Feature) => (style as React.RefObject<RStyle>).current.style(f);
    }
}
