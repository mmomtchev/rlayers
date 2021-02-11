import React from 'react';
import {Map} from 'ol';
import {OverviewMap} from 'ol/control';
import {Options} from 'ol/control/OverviewMap';

import {default as RControlBase, RControlProps} from './RControlBase';
import {RMapContext} from '../context';

export interface OverviewProps extends RControlProps {
    /** User-collapsible */
    collapsible?: boolean;
    /** Initial state */
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

/** An overview map component
 * It acts as an RMapContext provider, allowing to nest layers in it
 */
export default class ROverviewMap extends RControlBase<OverviewProps, null> {
    ol: OverviewMap;

    constructor(props: Readonly<OverviewProps>, context: React.Context<Map>) {
        super(props, context);
        this.ol = new OverviewMap(this.toOLProps(props));
    }

    toOLProps(props: OverviewProps): Options {
        return {
            ...super.toOLProps(props),
            className: props.className,
            collapsible: props.collapsible,
            collapsed: props.collapsed,
            label: props.label,
            collapseLabel: props.collapseLabel
        };
    }

    render(): JSX.Element {
        return (
            <div
                className={this.props.className}
                style={{width: this.props.width, height: this.props.height}}
            >
                <RMapContext.Provider value={this.ol.getOverviewMap()}>
                    {this.props.children}
                </RMapContext.Provider>
            </div>
        );
    }
}
