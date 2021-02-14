import React from 'react';
import {Map, Feature} from 'ol';
import {ColorLike} from 'ol/colorlike';
import {Style, Text} from 'ol/style';
import {Size} from 'ol/size';

import {RStyleContext} from '../context';
import RStyle from './RStyle';
import {default as RBase, RBaseProps} from './RBase';
import debug from '../debug';

export interface RTextProps extends RBaseProps {
    /** The text that will be displayed */
    text: string;
    /** Font */
    font?: string;
    /** Horizontal offset */
    offsetx?: number;
    /** Vertical offset */
    offsety?: number;
    /** Overflow */
    overflow?: boolean;
    /** Scale */
    scale?: number | Size;
    /** Rotation */
    rotation?: number;
    /** Text alignment 'left' | 'right' | 'center' | 'start' | 'end' */
    textAlign?: string;
    /** Padding in pixels around the text, [ top, right, bottom, left ] */
    padding?: number[];
}

/** Text element of a style */
export default class RText extends RBase<RTextProps> {
    static classProps = ['color', 'width', 'lineCap', 'lineJoin'];
    ol: Text;

    create(props: RTextProps): Text {
        this.classProps = RText.classProps;
        return new Text(props);
    }

    set(ol: Text): void {
        if (!this.context.setStroke) throw new Error('Parent element does not support a text');
        this.context.setText(ol);
    }

    render(): JSX.Element {
        return (
            <div>
                <RStyleContext.Provider value={this.ol}>
                    {this.props.children}
                </RStyleContext.Provider>
            </div>
        );
    }
}
