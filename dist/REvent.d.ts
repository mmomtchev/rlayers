import React from 'react';
import { RContextType } from './context';
export declare class RlayersBase<P, S> extends React.PureComponent<P, S> {
    static contextType: React.Context<any>;
    context: RContextType;
    ol: any;
    eventSources: any[];
    handlers: Record<string, (e: any) => boolean | void>;
    olEventName(ev: string): string;
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    propsDiff(prev: P): boolean;
    componentDidUpdate(prevProps: P, prev: null, snap: unknown): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=REvent.d.ts.map