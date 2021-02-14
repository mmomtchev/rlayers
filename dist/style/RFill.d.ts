import { ColorLike } from 'ol/colorlike';
import { Fill } from 'ol/style';
import { default as RBase, RBaseProps } from './RBase';
export interface RFillProps extends RBaseProps {
    color?: ColorLike;
}
export default class RFill extends RBase<RFillProps> {
    static classProps: string[];
    ol: Fill;
    create(props: RFillProps): Fill;
    set(ol: Fill): void;
}
//# sourceMappingURL=RFill.d.ts.map