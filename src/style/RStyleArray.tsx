import React from 'react';
import ReactDOM from 'react-dom';
import {Feature} from 'ol';
import Style, {StyleLike} from 'ol/style/Style';

import {RContextType} from '../context';
import {default as RStyle, RStyleProps, RStyleRef} from './RStyle';
import debug from '../debug';

/** An array of RStyle, can be an RStyle of its own
 * - this represents the OpenLayers concept of a style array
 *
 * It replaces the references on its childs, so individual elements
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
    }

    style = (f: Feature, r: number): Style | Style[] => {
        if (this.props.render) {
            const element = this.props.render(f, r);
            const render = (
                <React.Fragment>
                    {React.Children.map(element.props.children as React.ReactNode, (child, i) => {
                        if (!this.childRefs[i]) this.childRefs[i] = React.createRef();
                        // eslint-disable-next-line @typescript-eslint/ban-types
                        if (React.isValidElement(child) && (child.type as Function) === RStyle) {
                            return React.cloneElement(child, {
                                ref: this.childRefs[i]
                            });
                        }
                        throw new TypeError('An RStyleArray should contain only RStyle elements');
                    })}
                </React.Fragment>
            );
            ReactDOM.render(render, document.createElement('div'));
            this.ol = this.childRefs.map((child) => RStyle.getStyleStatic(child));
        }
        return this.ol as Style[];
    };

    refresh(prevProps?: RStyleProps): void {
        super.refresh();
        if (!this.props.render)
            this.ol = this.childRefs.map((child) => RStyle.getStyleStatic(child));
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                {React.Children.map(this.props.children, (child, i) => {
                    // eslint-disable-next-line @typescript-eslint/ban-types
                    if (React.isValidElement(child) && (child.type as Function) === RStyle) {
                        if (!this.childRefs[i]) this.childRefs[i] = React.createRef();
                        return React.cloneElement(child, {ref: this.childRefs[i]});
                    }
                    throw new TypeError('An RStyleArray should contain only RStyle elements');
                })}
            </React.Fragment>
        );
    }
}
