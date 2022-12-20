import React from 'react';
import {Text, Style, Fill, Stroke} from 'ol/style';

import {RContext} from '../context';
import {default as RBaseStyle, RBaseStyleProps} from './RBaseStyle';
import debug from '../debug';

/**
 * @propsfor RBackground
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RBackgroundProps extends RBaseStyleProps {}

type Background = {
    setFill: (f: Fill) => void;
    setStroke: (s: Stroke) => void;
};

/**
 * Background element of a text
 *
 * Requires an `RText` context
 *
 * Provides an `RStyle` context - for `Fill` or `Stroke`
 */
export default class RBackground extends RBaseStyle<RBackgroundProps> {
    static classProps = [];
    ol: Background;

    create(props: RBackgroundProps): Background {
        this.classProps = RBackground.classProps;
        const parent = this.context.style as unknown as Text;
        if (!parent.setBackgroundFill || !parent.setBackgroundStroke)
            /* istanbul ignore next */
            throw new Error('Parent element does not support a background');
        return {
            setFill: parent.setBackgroundFill.bind(parent),
            setStroke: parent.setBackgroundStroke.bind(parent)
        };
    }

    render(): JSX.Element {
        return (
            <div className='_rlayers_RStyle_RBackground'>
                <RContext.Provider value={{...this.context, style: this.ol as unknown as Style}}>
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
