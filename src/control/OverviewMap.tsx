import React from 'react';
import {Map as OLMap} from 'ol';
import {OverviewMap as OLOverviewMap} from 'ol/control';
import {Options} from 'ol/control/OverviewMap';

import {default as ControlBase, ControlProps} from './ControlBase';
import Layer from '../layer/Layer';
import {MapContext} from '../Map';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';

export interface OverviewProps extends ControlProps {
    collapsible?: boolean;
    collapsed?: boolean;
    collapseLabel?: string;
    label?: string;
    layer?: Layer<unknown>;
    width?: number;
    height?: number;
}

export default class OverviewMap extends ControlBase<OverviewProps, null> {
    ol: OLOverviewMap;
    layer?: Layer<unknown>;

    constructor(props: Readonly<OverviewProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.ol = new OLOverviewMap({
            ...this.toOLProps(props),
            layers: [new TileLayer({source: new OSM()})]
        });
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
                <MapContext.Provider value={this.ol.getOverviewMap()}>
                    {this.props.children}
                </MapContext.Provider>
            </div>
        );
    }
}
