import React from 'react';
import {Image, Fill, Stroke, Style} from 'ol/style';

import {RContext} from '../context';
import RImage, {RImageProps} from './RImage';
import debug from '../debug';

export interface RRegularBaseProps extends RImageProps {
    /** Radius of the polygon */
    radius?: number;
}

/** Abstract class */
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
         * setStroke/setFill on RegularBase-derived classes */
        this.stroke = s;
        this.ol = this.create(this.props);
        super.set(this.ol);
    }

    setFill(f: Fill): void {
        /* This a sneaky way around OpenLayers not supporting
         * setStroke/setFill on RegularBase-derived classes */
        this.fill = f;
        this.ol = this.create(this.props);
        super.set(this.ol);
    }

    render(): JSX.Element {
        return (
            <div>
                <RContext.Provider value={{...this.context, style: (this as unknown) as Style}}>
                    {this.props.children}
                </RContext.Provider>
            </div>
        );
    }
}
