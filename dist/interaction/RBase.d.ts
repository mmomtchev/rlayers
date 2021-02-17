import React from 'react';
import { Interaction } from 'ol/interaction';
import { RContextType } from '../context';
import { RlayersBase } from '../REvent';
export default class RBase<P> extends RlayersBase<P, null> {
    static classProps: string[];
    classProps: string[];
    ol: Interaction;
    constructor(props: P, context: React.Context<RContextType>);
    createOL(props: P): Interaction;
    refresh(prevProps?: P): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}
//# sourceMappingURL=RBase.d.ts.map