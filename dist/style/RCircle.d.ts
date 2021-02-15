import { Circle } from 'ol/style';
import RRegularBase, { RRegularBaseProps } from './RRegularBase';
export interface RCircleProps extends RRegularBaseProps {
    radius: number;
}
export default class RCircle extends RRegularBase<RCircleProps> {
    static classProps: string[];
    ol: Circle;
    create(props: RCircleProps): Circle;
}
//# sourceMappingURL=RCircle.d.ts.map