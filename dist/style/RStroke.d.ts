import { ColorLike } from 'ol/colorlike';
import { Stroke } from 'ol/style';
import { default as RStyleBase, RStyleBaseProps } from './RStyleBase';
export interface RStrokeProps extends RStyleBaseProps {
    color: ColorLike;
    width: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
}
export default class RStroke extends RStyleBase<RStrokeProps> {
    static classProps: string[];
    ol: Stroke;
    create(props: RStrokeProps): Stroke;
    set(ol: Stroke): void;
}
//# sourceMappingURL=RStroke.d.ts.map