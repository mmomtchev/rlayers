import React from 'react';
import { Style } from 'ol/style';
export interface RBaseProps {
}
export default class RBase<P extends RBaseProps> extends React.PureComponent<P, null> {
    static contextType: React.Context<any>;
    static classProps: string[];
    classProps: string[];
    ol: unknown;
    context: Style;
    constructor(props: Readonly<P>, context: React.Context<Style>);
    create(props: P): unknown;
    refresh(prevProps?: P): void;
    set(ol: unknown): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: P, prevState: null, snapshot: unknown): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RBase.d.ts.map