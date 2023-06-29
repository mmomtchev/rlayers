import BaseObject from 'ol/Object';
import React from 'react';
import {RContext, RContextType} from './context';
import debug from './debug';

export const handlersSymbol = '_rlayers_handlers';
export type OLEvent = 'change';
export type Handler = (e: unknown) => boolean | void;
export type Handlers = Record<OLEvent, Handler>;

export class RlayersBase<P, S> extends React.PureComponent<P, S> {
    static contextType = RContext;
    context: RContextType;
    ol: BaseObject;
    eventSources: BaseObject[];

    protected static getOLObject<T>(prop: string, ol: BaseObject) {
        let handlers = ol.get(prop);
        if (handlers === undefined) {
            handlers = {};
            ol.set(prop, handlers);
        }
        return handlers as T;
    }

    protected get handlers() {
        return RlayersBase.getOLObject<Handlers>(handlersSymbol, this.ol);
    }

    /**
     * Get the lowercase names of the currently installed handlers
     */
    protected getCurrentEvents() {
        return Object.keys(this.props)
            .filter((p) => p.startsWith('on'))
            .map((ev) => ({event: ev.toLowerCase().slice(2), prop: ev}))
            .reduce((a, x) => ({...a, [x.event]: this.props[x.prop]}), {}) as Handlers;
    }

    /**
     * Get the uppercase name of this event
     */
    protected getHandlerProp(event: OLEvent): string | void {
        for (const p of Object.keys(this.props)) if (p.toLowerCase() === 'on' + event) return p;
    }

    protected incrementHandlers(ev: OLEvent): void {
        return;
    }
    protected decrementHandlers(ev: OLEvent): void {
        return;
    }

    private attachEventHandlers(): void {
        const handlers = this.handlers;
        const handlersList = Object.keys(handlers ?? {});
        const eventSources = this.eventSources ?? [this.ol];
        const newEvents = this.getCurrentEvents();
        const newEventsList = Object.keys(newEvents);
        const eventsToCheck = newEventsList.concat(
            handlersList.filter((ev) => !newEventsList.includes(ev))
        ) as OLEvent[];
        for (const p of eventsToCheck) {
            if (handlers[p] !== undefined && newEvents[p] === undefined) {
                debug('removing previously installed handler', this, p, handlers[p]);
                for (const source of eventSources) source.un(p, handlers[p]);
                handlers[p] = undefined;
                this.decrementHandlers(p);
            }
            if (handlers[p] === undefined && newEvents[p] !== undefined) {
                debug('installing handler', this, p, newEvents[p]);
                const prop = this.getHandlerProp(p);
                if (!prop) throw new Error('Internal error');
                handlers[p] = (e: unknown) => this.props[prop].call(this, e);
                for (const source of eventSources) source.on(p as OLEvent, handlers[p]);
                this.incrementHandlers(p);
            }
        }
    }

    // Used when replacing a source
    protected attachOldEventHandlers(newSource: BaseObject): void {
        const handlers = this.handlers;
        const events = this.getCurrentEvents();
        for (const e of Object.keys(events)) {
            if (events[e]) {
                debug('reinstalling existing handler', this, e, events[e]);
                newSource.on(e as OLEvent, handlers[e]);
            }
        }
    }

    protected refresh(prevProps?: P): void {
        this.attachEventHandlers();
    }

    on(ev: OLEvent, cb: Handler): void {
        this.ol.on(ev, cb);
        this.incrementHandlers(ev);
    }

    un(ev: OLEvent, cb: Handler): void {
        this.decrementHandlers(ev);
        this.ol.un(ev, cb);
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

    componentDidUpdate(prevProps: Readonly<P>, prev: Readonly<unknown>, snap: unknown): void {
        if (this.props !== prevProps) {
            debug('willRefresh', this, prevProps, this.props);
            this.refresh(prevProps);
        }
    }

    componentWillUnmount(): void {
        const handlers = this.handlers;
        debug('willUnmount', this, handlers);
        const eventSources = this.eventSources ?? [this.ol];
        for (const h of Object.keys(handlers ?? {}) as OLEvent[]) {
            debug('cleaning up handler', this, h, handlers[h]);
            if (handlers[h]) {
                for (const source of eventSources) source.un(h, handlers[h]);
                handlers[h] = undefined;
                this.decrementHandlers(h);
            }
        }
    }

    render(): JSX.Element {
        return null;
    }
}
