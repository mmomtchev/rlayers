import { ColorLike } from 'ol/colorlike';
import { Fill } from 'ol/style';
import { default as RStyleBase, RStyleBaseProps } from './RStyleBase';
export interface RFillProps extends RStyleBaseProps {
    color?: ColorLike;
}
export default class RFill extends RStyleBase<RFillProps> {
    static classProps: string[];
    ol: Fill;
    create(props: RFillProps): Fill;
    set(ol: Fill): void;
}
//# sourceMappingURL=RFill.d.ts.map