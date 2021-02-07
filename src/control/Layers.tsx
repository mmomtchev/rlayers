import React from 'react';
import {Map as OLMap} from 'ol';
import {Control as OLControl} from 'ol/control';

import './layers.css';
import {MapContext} from 'src/Map';
import {default as ControlBase, ControlProps} from './ControlBase';

export interface LayersProps extends ControlProps {
    element?: React.ReactElement;
}

export interface LayersState {
    collapsed: boolean;
    visible: boolean[];
}

export default class Layers extends ControlBase<LayersProps, LayersState> {
    static contextType = MapContext;
    ol: OLControl;
    targetRef: React.RefObject<HTMLDivElement>;
    context: OLMap;

    constructor(props: Readonly<LayersProps>, context: React.Context<OLMap>) {
        super(props, context);
        this.targetRef = React.createRef();
        this.state = {collapsed: true, visible: [true]};
    }

    componentDidMount(): void {
        this.ol = new OLControl(this.toOLProps(this.props));
        super.componentDidMount();
        this.context.on('change', () => this.forceUpdate());
        this.forceUpdate();
    }

    toOLProps(props: LayersProps): Record<string, unknown> {
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
                return child.props.properties.label ?? 'no label';
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
                                            this.setState({visible: [...visible]});
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
                        return React.cloneElement(child, {visible: visible[i]});
                    }
                    return child;
                })}
            </React.Fragment>
        );
    }
}
