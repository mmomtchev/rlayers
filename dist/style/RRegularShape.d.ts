import { RegularShape } from 'ol/style';
import RRegularBase, { RRegularBaseProps } from './RRegularBase';
export interface RRegularShapeProps extends RRegularBaseProps {
    radius1?: number;
    radius2?: number;
    points: number;
    angle?: number;
}
export default class RRegularShape extends RRegularBase<RRegularShapeProps> {
    static classProps: string[];
    ol: RegularShape;
    create(props: RRegularShapeProps): RegularShape;
}
//# sourceMappingURL=RRegularShape.d.ts.map