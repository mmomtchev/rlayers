import React from 'react';
import { Map, Feature } from 'ol';
import Style, { StyleLike } from 'ol/style/Style';
import { ReactLayersBase } from '../REvent';
export interface RStyleProps {
    render?: (f: Feature) => React.ReactElement;
}
export declare type RStyleRef = React.RefObject<RStyle>;
export declare type RStyleLike = RStyleRef | RStyle | StyleLike;
export declare const useRStyle: () => RStyleRef;
export declare const createRStyle: () => RStyleRef;
export default class RStyle extends ReactLayersBase<RStyleProps, null> {
    ol: StyleLike;
    childRefs: RStyleRef[];
    constructor(props: Readonly<RStyleProps>, context: React.Context<Map>);
    style: (f: Feature) => Style | Style[];
    render(): JSX.Element;
    static getStyle(style: RStyleLike): StyleLike;
    static getStyleStatic(style: RStyleLike): Style;
}
//# sourceMappingURL=RStyle.d.ts.map