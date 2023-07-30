import {default as OLZoomToExtent, Options} from 'ol/control/ZoomToExtent';
import {Extent} from 'ol/extent';

import {RContext, RContextType} from '../context';
import {default as RControlBase, RControlProps} from './RControlBase';

export interface RZoomToExtentProps extends RControlProps {
    extent?: Extent;
    label?: string | HTMLElement;
    tipLabel?: string;
}

export default class RZoomToExtent extends RControlBase<RZoomToExtentProps, Record<string, never>> {
    ol: OLZoomToExtent;

    constructor(props: Readonly<RZoomToExtentProps>, context?: React.Context<RContextType>) {
        super(props, context);
        this.ol = new OLZoomToExtent(this.toOLProps(props));
    }

    toOLProps(props: RZoomToExtentProps): Options {
        return {
            ...super.toOLProps(props),
            extent: props.extent,
            label: props.label,
            tipLabel: props.tipLabel
        };
    }
}
