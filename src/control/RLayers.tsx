import React, {JSX} from 'react';
import {Control} from 'ol/control';

import RControlBase, {RControlOptions, RControlProps} from './RControlBase';
import {RLayerProps} from 'rlayers/layer/RLayer';

/**
 * @propsfor RLayer
 */
export interface RLayersProps extends RControlProps {
    /** Custom element for rendering */
    element?: React.ReactElement;
}

export interface RLayersState {
    collapsed: boolean;
    visible: boolean[];
}

/** A custom control allowing to switch between different layers
 *
 * Layers that are to be controlled have to be nested inside the control
 *
 * Every layer should have a `label` property
 *
 * Requires an `RMap` context
 */
export default class RLayers extends RControlBase<RLayersProps, RLayersState> {
    ol: Control;
    targetRef: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<RLayersProps>) {
        super(props);
        this.targetRef = React.createRef();
        this.state = {collapsed: true, visible: [true]};
    }

    onchange = (): void => this.forceUpdate();

    componentDidMount(): void {
        this.ol = new Control(this.toOLProps(this.props));
        super.componentDidMount();
        this.context.map.on('change', this.onchange);
        this.forceUpdate();
    }

    componentWillUnmount(): void {
        super.componentWillUnmount();
        this.context.map.un('change', this.onchange);
    }

    toOLProps(props: RLayersProps): RControlOptions {
        return {
            ...super.toOLProps(props),
            element: this.targetRef?.current
        };
    }

    clickCollapse = (): void => {
        this.setState({collapsed: !this.state.collapsed});
    };

    render(): JSX.Element {
        const visible = React.Children.map(this.props.children, (child, i) => {
            if (React.isValidElement(child)) {
                return this.state.visible[i] ?? false;
            }
        }) as boolean[];
        const labels = React.Children.map(this.props.children, (child) => {
            if (React.isValidElement(child)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return (child.props as any).properties?.label ?? 'no label';
            }
        }) as string[];
        return (
            <React.Fragment>
                <div
                    className={['ol-control', this.props.className ?? 'ol-layers-control'].join(
                        ' '
                    )}
                    ref={this.targetRef}
                >
                    <span onClick={this.clickCollapse}>
                        {this.props.element ?? <button>=</button>}
                    </span>
                    {this.state.collapsed ? null : (
                        <div>
                            {labels.map((l, i) => (
                                <div key={i}>
                                    <input
                                        type='radio'
                                        id={i.toString()}
                                        name={l}
                                        value={i.toString()}
                                        checked={visible[i]}
                                        onChange={() => {
                                            for (const v in visible) {
                                                visible[v] = false;
                                            }
                                            visible[i] = true;
                                            this.setState({visible: [...visible], collapsed: true});
                                        }}
                                    />
                                    <label htmlFor={i.toString()}>{l}</label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {React.Children.map(this.props.children, (child, i) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement<RLayerProps>(child, {visible: visible[i]});
                    }
                    return child;
                })}
            </React.Fragment>
        );
    }
}
