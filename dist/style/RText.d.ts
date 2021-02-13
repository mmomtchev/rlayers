/// <reference types="react" />
import { Text } from 'ol/style';
import { Size } from 'ol/size';
import { default as RStyleBase, RStyleBaseProps } from './RStyleBase';
export interface RTextProps extends RStyleBaseProps {
    text: string;
    font?: string;
    offsetx?: number;
    offsety?: number;
    overflow?: boolean;
    scale?: number | Size;
    rotation?: number;
    textAlign?: string;
    padding?: number[];
}
export default class RText extends RStyleBase<RTextProps> {
    static classProps: string[];
    ol: Text;
    create(props: RTextProps): Text;
    set(ol: Text): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RText.d.ts.map