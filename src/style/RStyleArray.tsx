import React from 'react';
import ReactDOM from 'react-dom';
import {Feature} from 'ol';
import Style from 'ol/style/Style';
import Geometry from 'ol/geom/Geometry';

import {RContext, RContextType} from '../context';
import {default as RStyle, RStyleProps} from './RStyle';
import debug from '../debug';

/** An array of RStyle, can be an RStyle of its own
 * - this represents the OpenLayers concept of a style array
 *
 * It replaces the references on its children, so individual elements
 * in the array cannot be referenced
 *
 * It doesn't support caching yet
 *
 * Every style in the array must be a static style and not a function
 *
 * Arrays of style functions are not supported by OpenLayers and won't
 * be supported rlayers either
 */
export default class RStyleArray extends RStyle {
    constructor(props: Readonly<RStyleProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.childRefs = [];
        if (props.render) this.ol = this.style;
        else this.ol = [];
    }

    style = (f: Feature<Geometry>, r: number): Style | Style[] => {
        if (this.props.render) {
            const element = this.props.render(f, r);
            React.Children.map(element.props.children, (child) => {
                // eslint-disable-next-line @typescript-eslint/ban-types
                if (React.isValidElement(child) && (child.type as Function) !== RStyle)
                    throw new TypeError('An RStyleArray should contain only RStyle elements');
            });
            const styleArray = [];
            const render = (
                <RContext.Provider value={{...this.context, styleArray}}>
                    {element.props.children}
                </RContext.Provider>
            );
            ReactDOM.render(render, document.createElement('div'));
            return styleArray as Style[];
        }
        return this.ol as Style[];
    };

    refresh(prevProps?: RStyleProps): void {
        super.refresh(prevProps);
    }

    render(): JSX.Element {
        React.Children.map(this.props.children, (child) => {
            // eslint-disable-next-line @typescript-eslint/ban-types
            if (React.isValidElement(child) && (child.type as Function) !== RStyle)
                throw new TypeError('An RStyleArray should contain only RStyle elements');
        });
        if (!this.props.render)
            return (
                <RContext.Provider value={{...this.context, styleArray: this.ol as Style[]}}>
                    {this.props.children}
                </RContext.Provider>
            );
        return <React.Fragment />;
    }
}
