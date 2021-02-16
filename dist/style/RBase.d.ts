import React from 'react';
import { RContextType } from '../context';
export interface RBaseProps {
}
export default class RBase<P extends RBaseProps> extends React.PureComponent<P, null> {
    static classProps: string[];
    classProps: string[];
    ol: unknown;
    constructor(props: Readonly<P>, context: React.Context<RContextType>);
    create(props: P): unknown;
    refresh(prevProps?: P): void;
    set(ol: unknown): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: P, prevState: null, snapshot: unknown): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=RBase.d.ts.map