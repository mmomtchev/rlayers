import {default as OLMousePosition, Options} from 'ol/control/MousePosition';
import {Coordinate} from 'ol/coordinate';
import {ProjectionLike} from 'ol/proj';

import {RContextType} from '../context';
import RControlBase, {RControlProps} from './RControlBase';

export interface RMousePositionProps extends RControlProps {
    /**
     * Optional function to change coordinate formatting
     */
    coordinateFormat?: (coordinate: Coordinate) => string;
    /**
     * View projection
     * @default Map View's projection
     */
    projection?: ProjectionLike;
    /**
     * Markup to show when the mouse position is unavailable.
     * Set to false to retain the last position when the mouse leaves the viewport.
     * @default &nbsp;
     */
    placeholder?: string | false;
}

export default class RMousePosition extends RControlBase<
    RMousePositionProps,
    Record<string, never>
> {
    ol: OLMousePosition;

    constructor(props: Readonly<RMousePositionProps>, context: React.Context<RContextType>) {
        super(props, context);
        this.ol = new OLMousePosition(this.toOLProps(props));
    }

    toOLProps(props: RMousePositionProps): Options {
        return {
            ...super.toOLProps(props),
            coordinateFormat: props.coordinateFormat,
            projection: props.projection,
            placeholder: props.placeholder
        };
    }
}
