import React from 'react';
import { Map, Feature } from 'ol';
import Style, { StyleLike } from 'ol/style/Style';
import { ReactLayersBase } from '../REvent';
export interface RStyleProps {
    render?: (f: Feature) => React.ReactElement;
}
export declare type RStyleRef = React.RefObject<RStyle>;
export declare type RStyleLike = RStyleRef | StyleLike;
export default class RStyle extends ReactLayersBase<RStyleProps, null> {
    ol: StyleLike;
    constructor(props: Readonly<RStyleProps>, context: React.Context<Map>);
    style: (f: Feature) => Style;
    refresh(prevProps?: RStyleProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    static getStyle(style: RStyleLike): StyleLike;
}
//# sourceMappingURL=RStyle.d.ts.map