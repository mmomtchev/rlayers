import React from 'react';
import { Feature } from 'ol';
import Style, { StyleLike } from 'ol/style/Style';
import { RVectorContextType } from '../context';
import { default as RStyle, RStyleProps, RStyleRef } from './RStyle';
export default class RStyleArray extends RStyle {
    ol: StyleLike;
    childRefs: RStyleRef[];
    constructor(props: Readonly<RStyleProps>, context: React.Context<RVectorContextType>);
    style: (f: Feature) => Style | Style[];
    refresh(prevProps?: RStyleProps): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RStyleArray.d.ts.map