/// <reference types="react" />
import { Circle, Fill, Stroke } from 'ol/style';
import RImage, { RImageProps } from './RImage';
export interface RCircleProps extends RImageProps {
    radius: number;
}
export default class RCircle extends RImage<RCircleProps> {
    static classProps: string[];
    ol: Circle;
    stroke: Stroke;
    fill: Fill;
    create(props: RCircleProps): Circle;
    setStroke(s: Stroke): void;
    setFill(f: Fill): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RCircle.d.ts.map