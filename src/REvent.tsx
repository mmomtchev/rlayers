import React from 'react';
import {RContext, RContextType} from './context';
import debug from './debug';

export class RlayersBase<P, S> extends React.PureComponent<P, S> {
    static contextType = RContext;
    context: RContextType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ol: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventSources: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handlers: Record<string, (e: any) => boolean | void>;

    olEventName(ev: string): string {
        return ev.substring(2).toLowerCase();
    }

    refresh(prevProps?: P): void {
        const eventSources = this.eventSources ?? [this.ol];
        const newEvents = Object.keys(this.props).filter((p) => p.startsWith('on'));
        const eventsToCheck = newEvents.concat(
            Object.keys(this.handlers ?? {}).filter((ev) => !newEvents.includes(ev))
        );
        for (const p of eventsToCheck) {
            if (this.handlers === undefined) this.handlers = {};
            if (this.handlers[p] !== undefined && this.handlers[p] !== this.props[p]) {
                debug(
                    'removing previously installed handler',
                    this,
                    p,
                    this.handlers[p],
                    this.props[p]
                );
                for (const source of eventSources) source.un(this.olEventName(p), this.handlers[p]);
                this.handlers[p] = undefined;
            }
            if (this.handlers[p] === undefined) {
                debug('installing handler', this, p, this.props[p]);
                for (const source of eventSources) source.on(this.olEventName(p), this.props[p]);
                this.handlers[p] = this.props[p];
            }
        }
    }

    componentDidMount(): void {
        debug('didMount', this);
        this.refresh();
    }

    /* istanbul ignore next */
    propsDiff(prev: P): boolean {
        if (this.props === null || prev === null) {
            if (this.props !== prev) {
                debug('null props differ', this.props, prev);
                return true;
            }
            return false;
        }
        for (const k of Object.keys(this.props))
            if (this.props[k] !== prev[k]) {
                debug('because of', k, this.props[k], prev[k]);
                return true;
            }
        return false;
    }

    componentDidUpdate(prevProps: P, prev: null, snap: unknown): void {
        if (this.props !== prevProps) {
            debug('willRefresh', this, prevProps, this.props);
            this.refresh(prevProps);
        }
    }

    componentWillUnmount(): void {
        debug('willUnmount', this, this.handlers);
        const eventSources = this.eventSources ?? [this.ol];
        for (const h of Object.keys(this.handlers ?? {})) {
            debug('cleaning up handler', this, h, this.handlers[h]);
            if (this.handlers[h])
                for (const source of eventSources) source.un(this.olEventName(h), this.handlers[h]);
        }
    }

    render(): JSX.Element {
        return null;
    }
}
