import React from 'react';
import {Interaction} from 'ol/interaction';

import {RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

/**
 * A basic Base interaction component
 *
 * It is meant to be be extended by more specific interactions
 */
export default class RBase<P> extends RlayersBase<P, Record<string, never>> {
    static classProps: string[] = [];
    classProps: string[];
    ol: Interaction;

    constructor(props: P, context: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.map?.addInteraction)
            throw new Error('An interaction must be part of a map');
        this.ol = this.createOL(props);
    }

    createOL(props: P): Interaction {
        throw new Error('RBase should not be directly instantiated');
    }

    refresh(prevProps?: P): void {
        for (const p of this.classProps)
            if (prevProps && prevProps[p] !== this.props[p]) {
                debug('Replacing interaction', this, prevProps);
                this.componentWillUnmount();
                this.ol = this.createOL(this.props);
                this.componentDidMount();
                break;
            }
        super.refresh(prevProps);
    }

    componentDidMount(): void {
        super.componentDidMount();
        this.context.map.addInteraction(this.ol);
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.map.removeInteraction(this.ol);
    }
}
