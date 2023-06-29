import React, {PropsWithChildren} from 'react';

import {RContext, RContextType} from '../context';
import debug from '../debug';

/**
 * @propsfor RBaseStyle
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RBaseStyleProps extends PropsWithChildren<unknown> {}

/**
 * An abstract class used as base for all Style components, not meant to be used directly
 */
export default class RBaseStyle<P extends RBaseStyleProps> extends React.PureComponent<
    P,
    Record<string, never>
> {
    static contextType = RContext;
    protected static classProps: string[] = [];
    classProps: string[];
    ol: unknown;
    context: RContextType;

    constructor(props: Readonly<P>, context?: React.Context<RContextType>) {
        super(props, context);
        if (!this.context) throw new Error('A style property must be part of a style');
        this.ol = this.create(props);
    }

    /* istanbul ignore next */
    protected create(props: P): unknown {
        throw new Error('RBaseStyle is an abstract class');
    }

    protected refresh(prevProps?: P): void {
        debug('refreshStyle', this);
        if (!prevProps) return;
        for (const p of this.classProps) {
            const m = p.charAt(0).toUpperCase() + p.substring(1);
            if ((prevProps && prevProps[p]) !== this.props[p]) {
                if (this.ol['set' + m]) {
                    this.ol['set' + m](this.props[p]);
                } else {
                    // eslint-disable-next-line no-console
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
    protected set(ol: unknown): void {
        return;
    }

    componentDidMount(): void {
        this.set(this.ol);
    }

    componentDidUpdate(
        prevProps: Readonly<P>,
        prevState: Readonly<unknown>,
        snapshot: unknown
    ): void {
        if (prevProps !== this.props) this.refresh(prevProps);
    }

    componentWillUnmount(): void {
        this.set(null);
    }

    render(): JSX.Element {
        return null;
    }
}
