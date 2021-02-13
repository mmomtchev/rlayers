import React from 'react';
import {Circle, Fill, Stroke} from 'ol/style';

import {RStyleContext} from '../context';
import RImage, {RImageProps} from './RImage';
import debug from '../debug';

export interface RCircleProps extends RImageProps {
    /** Radius */
    radius: number;
}

/** A circle */
export default class RCircle extends RImage<RCircleProps> {
    static classProps = ['radius'];
    ol: Circle;
    stroke: Stroke;
    fill: Fill;

    create(props: RCircleProps): Circle {
        this.classProps = RCircle.classProps.concat(RImage.classProps);
        return new Circle({
            ...props,
            stroke: this.stroke,
            fill: this.fill
        });
    }

    setStroke(s: Stroke): void {
        /* This a sneaky way around OpenLayers not supporting
         * setStroke/setFill on RegularShape-dervied classes */
        this.stroke = s;
        this.ol = this.create(this.props);
        super.set(this.ol);
    }

    setFill(f: Fill): void {
        /* This a sneaky way around OpenLayers not supporting
         * setStroke/setFill on RegularShape-dervied classes */
        this.fill = f;
        this.ol = this.create(this.props);
        super.set(this.ol);
    }

    render(): JSX.Element {
        return (
            <div>
                <RStyleContext.Provider value={this}>{this.props.children}</RStyleContext.Provider>
            </div>
        );
    }
}
