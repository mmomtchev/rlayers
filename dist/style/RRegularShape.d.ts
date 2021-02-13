/// <reference types="react" />
import { RegularShape } from 'ol/style';
import RImage, { RImageProps } from './RImage';
export interface RRegularShapeProps extends RImageProps {
    radius1: number;
    radius2: number;
    points: number;
}
export default class RRegularShape extends RImage<RRegularShapeProps> {
    static classProps: string[];
    ol: RegularShape;
    create(props: RRegularShapeProps): RegularShape;
    render(): JSX.Element;
}
//# sourceMappingURL=RRegularShape.d.ts.map