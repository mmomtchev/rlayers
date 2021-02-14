import { ColorLike } from 'ol/colorlike';
import { Stroke } from 'ol/style';
import { default as RBase, RBaseProps } from './RBase';
export interface RStrokeProps extends RBaseProps {
    color: ColorLike;
    width: number;
    lineCap?: CanvasLineCap;
    lineJoin?: CanvasLineJoin;
}
export default class RStroke extends RBase<RStrokeProps> {
    static classProps: string[];
    ol: Stroke;
    create(props: RStrokeProps): Stroke;
    set(ol: Stroke): void;
}
//# sourceMappingURL=RStroke.d.ts.map