/// <reference types="react" />
import { Size } from 'ol/size';
import { Text } from 'ol/style';
import { default as RBase, RBaseProps } from './RBase';
export interface RTextProps extends RBaseProps {
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
export default class RText extends RBase<RTextProps> {
    static classProps: string[];
    ol: Text;
    create(props: RTextProps): Text;
    set(ol: Text): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RText.d.ts.map