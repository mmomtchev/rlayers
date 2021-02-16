import React from 'react';
import { Feature } from 'ol';
import Style from 'ol/style/Style';
import { RContextType } from '../context';
import { default as RStyle, RStyleProps } from './RStyle';
export default class RStyleArray extends RStyle {
    constructor(props: Readonly<RStyleProps>, context: React.Context<RContextType>);
    style: (f: Feature, r: number) => Style | Style[];
    refresh(prevProps?: RStyleProps): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RStyleArray.d.ts.map