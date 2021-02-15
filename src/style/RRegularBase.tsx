import React from 'react';
import {Image, Fill, Stroke} from 'ol/style';

import {RStyleContext} from '../context';
import RImage, {RImageProps} from './RImage';
import debug from '../debug';

export interface RRegularBaseProps extends RImageProps {
    /** Radius of the polygon */
    radius?: number;
}

/** A star or a regular polygon */
export default class RRegularBase<P extends RRegularBaseProps> extends RImage<P> {
    static classProps = RImage.classProps.concat(['radius']);
    ol: Image;
    stroke: Stroke;
    fill: Fill;

    /* istanbul ignore next */
    create(props: P): Image {
        throw new Error('RImage is an abstract class');
    }

    setStroke(s: Stroke): void {
        /* This a sneaky way around OpenLayers not supporting
         * setStroke/setFill on RegularBase-dervied classes */
        this.stroke = s;
        this.ol = this.create(this.props);
        super.set(this.ol);
    }

    setFill(f: Fill): void {
        /* This a sneaky way around OpenLayers not supporting
         * setStroke/setFill on RegularBase-dervied classes */
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
