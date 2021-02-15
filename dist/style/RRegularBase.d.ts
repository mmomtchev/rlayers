/// <reference types="react" />
import { Image, Fill, Stroke } from 'ol/style';
import RImage, { RImageProps } from './RImage';
export interface RRegularBaseProps extends RImageProps {
    radius?: number;
}
export default class RRegularBase<P extends RRegularBaseProps> extends RImage<P> {
    static classProps: string[];
    ol: Image;
    stroke: Stroke;
    fill: Fill;
    create(props: P): Image;
    setStroke(s: Stroke): void;
    setFill(f: Fill): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RRegularBase.d.ts.map