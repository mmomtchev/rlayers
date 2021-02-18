import React from 'react';

import {RContext, RContextType} from '../context';
import debug from '../debug';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RBaseProps {}

export default class RBase<P extends RBaseProps> extends React.PureComponent<P, null> {
    static contextType = RContext;
    static classProps: string[] = [];
    classProps: string[];
    ol: unknown;
    context: RContextType;

    constructor(props: Readonly<P>, context: React.Context<RContextType>) {
        super(props, context);
        if (!this.context) throw new Error('A style property must be part of a style');
        this.ol = this.create(props);
    }

    /* istanbul ignore next */
    create(props: P): unknown {
        throw new Error('RBase is an abstract class');
    }

    refresh(prevProps?: P): void {
        debug('refreshStyle', this);
        if (!prevProps) return;
        for (const p of this.classProps) {
            const m = p.charAt(0).toUpperCase() + p.substring(1);
            if ((prevProps && prevProps[p]) !== this.props[p]) {
                if (this.ol['set' + m]) {
                    this.ol['set' + m](this.props[p]);
                } else {
                    console.error(
                        `Underlying OpenLayers object does not support updating of ${p} after object creation. ` +
                            'If you are using an anonymous constant array or object, ' +
                            'consider assigning its value to a constant and then passing the constant or ' +
                            'use React.useMemo() to avoid this warning and improve performance.'
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
