import { Image } from 'ol/style';
import { Size } from 'ol/size';
import { default as RStyleBase, RStyleBaseProps } from './RStyleBase';
export interface RImageProps extends RStyleBaseProps {
    opacity?: number;
    rotateWithView?: boolean;
    rotation?: number;
    scale?: number | Size;
    displacement?: number[];
}
export default class RImage<P extends RImageProps> extends RStyleBase<P> {
    static classProps: string[];
    ol: Image;
    create(props: P): Image;
    set(ol: Image): void;
}
//# sourceMappingURL=RImage.d.ts.map