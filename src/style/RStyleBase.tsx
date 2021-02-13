import React from 'react';
import {Style} from 'ol/style';

import {RStyleContext} from '../context';
import debug from '../debug';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RStyleBaseProps {}

export default class RStyleBase<P extends RStyleBaseProps> extends React.PureComponent<P, null> {
    static contextType = RStyleContext;
    static classProps: string[] = [];
    classProps: string[];
    ol: unknown;
    context: Style;

    constructor(props: Readonly<P>, context: React.Context<Style>) {
        super(props, context);
        if (!this.context) throw new Error('A style property must be part of a style');
        this.ol = this.create(props);
    }

    /* istanbul ignore next */
    create(props: P): unknown {
        throw new Error('RStyleBase is an abstract class');
    }

    refresh(prevProps?: P): void {
        debug('refreshStyle', this);
        for (const p of this.classProps) {
            const m = p.charAt(0).toUpperCase() + p.substring(1);
            if ((prevProps && prevProps[p]) !== this.props[p]) {
                if (this.ol['set' + m]) {
                    this.ol['set' + m](this.props[p]);
                } else {
                    /* istanbul ignore next */
                    throw new Error(
                        'Underlying OpenLayers object does not support updating of ' + p
                    );
                }
            }
        }
    }

    /* istanbul ignore next */
    set(ol: unknown): void {
        return;
    }

    componentDidMount(): void {
        this.set(this.ol);
    }

    componentDidUpdate(prevProps: P, prevState: null, snapshot: unknown): void {
        if (prevProps !== this.props) this.refresh(prevProps);
    }

    componentWillUnmount(): void {
        this.set(null);
    }

    render(): JSX.Element {
        return null;
    }
}
