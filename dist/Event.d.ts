import React from 'react';
export declare class ReactLayersBase<P, S> extends React.Component<P, S> {
    ol: any;
    handlers: Record<string, (e: any) => boolean | void>;
    olEventName(ev: string): string;
    refresh(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: P, prev: null, snap: unknown): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
//# sourceMappingURL=Event.d.ts.map