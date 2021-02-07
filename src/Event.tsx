import React from 'react';
import debug from './debug';

export class ReactLayersBase<P, S> extends React.PureComponent<P, S> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlers: Record<string, (e: any) => boolean | void>;

    olEventName(ev: string): string {
        return ev.substring(2).toLowerCase();
    }

    refresh(): void {
        for (const p of Object.keys(this.props))
            if (p.startsWith('on')) {
                if (this.handlers === undefined) this.handlers = {};
                if (this.handlers[p] !== undefined && this.handlers[p] !== this.props[p]) {
                    debug(
                        'removing previously installed handler',
                        this,
                        p,
                        this.handlers[p],
                        this.props[p]
                    );
                    this.ol.un(this.olEventName(p), this.handlers[p]);
                    this.handlers[p] = undefined;
                }
                if (this.handlers[p] === undefined) {
                    debug('installing handler', this, p, this.props[p]);
                    this.ol.on(this.olEventName(p), this.props[p]);
                    this.handlers[p] = this.props[p];
                }
            }
    }

    componentDidMount(): void {
        this.refresh();
    }

    componentDidUpdate(prevProps: P, prev: null, snap: unknown): void {
        if (this.props !== prevProps) {
            debug('willRefresh', this, prevProps, this.props);
            this.refresh();
        } else debug('skipRefresh', this, this.props);
    }

    componentWillUnmount(): void {
        debug('willUnmount', this, this.handlers);
        for (const h of Object.keys(this.handlers ?? {})) {
            debug('cleaning up handler', this, h, this.handlers[h]);
            if (this.handlers[h]) this.ol.un(this.olEventName(h), this.handlers[h]);
        }
    }

    render(): JSX.Element {
        return null;
    }
}
