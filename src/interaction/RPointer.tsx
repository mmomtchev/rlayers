import React from 'react';
import {Map, MapBrowserEvent} from 'ol';
import Pointer from 'ol/interaction/Pointer';

import {RContextType} from '../context';
import {RlayersBase} from '../REvent';
import debug from '../debug';

export interface RPointerProps {
    /** Called on down event (click or touch)
     * if it returns true, a drag sequence is started
     */
    handleDownEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every move event while dragging */
    handleDragEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every event, use with care */
    handleEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on every pointer move, use with care */
    handleMoveEvent?: (e: MapBrowserEvent) => boolean;
    /** Called on up event (end of click or touch) */
    handleUpEvent?: (e: MapBrowserEvent) => boolean;
}

/** A basic pointer interaction component
 * It is meant to be be extended by more specific interactions
 */
export default class RPointer<P> extends RlayersBase<P, null> {
    static classProps = ['handleDownEvent', 'handleDragEvent', 'handleMoveEvent', 'handleUpEvent'];
    classProps: string[];
    ol: Pointer;

    constructor(props: P, context: React.Context<RContextType>) {
        super(props, context);
        if (!this.context?.map?.addInteraction)
            throw new Error('An interaction must be part of a map');
        this.ol = this.createOL(props);
    }

    createOL(props: P): Pointer {
        this.classProps = RPointer.classProps;
        return new Pointer(props);
    }

    refresh(prevProps?: P): void {
        for (const p of this.classProps)
            if (prevProps && prevProps[p] !== this.props[p]) {
                debug('Replacing interaction', this, prevProps);
                this.context.map.removeInteraction(this.ol);
                this.ol = this.createOL(this.props);
                this.context.map.addInteraction(this.ol);
                break;
            }
        super.refresh();
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
