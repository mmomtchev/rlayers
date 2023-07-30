import React from 'react';
import {OverviewMap} from 'ol/control';
import {Options} from 'ol/control/OverviewMap';

import {RContext, RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

/**
 * @propsfor ROverviewMap
 */
export interface ROverviewProps extends RControlProps {
    /** User-collapsible @default true */
    collapsible?: boolean;
    /** State @default true */
    collapsed?: boolean;
    /** Label when collapsed */
    collapseLabel?: string;
    /** Label */
    label?: string;
    /** Width if not using CSS */
    width?: number;
    /** Height if not using CSS */
    height?: number;
}

/**
 * An overview map component
 *
 * Requires an `RMap` context
 *
 * Provides an 'RMap` context - allowing to nest overview layers in it
 */
export default class ROverviewMap extends RControlBase<ROverviewProps, Record<string, never>> {
    ol: OverviewMap;

    constructor(props: Readonly<ROverviewProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.ol = new OverviewMap(this.toOLProps(props));
    }

    toOLProps(props: ROverviewProps): Options {
        return {
            ...super.toOLProps(props),
            collapsible: props.collapsible,
            collapsed: props.collapsed,
            label: props.label,
            collapseLabel: props.collapseLabel
        };
    }

    refresh(prevProps?: ROverviewProps): void {
        super.refresh(prevProps);
        if (prevProps?.collapsed !== this.props.collapsed)
            this.ol.setCollapsed(this.props.collapsed);
    }

    render(): JSX.Element {
        return (
            <div
                className={this.props.className}
                style={{width: this.props.width, height: this.props.height}}
            >
                <RContext.Provider value={{map: this.ol.getOverviewMap()}}>
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
