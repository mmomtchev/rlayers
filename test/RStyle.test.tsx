window.URL.createObjectURL = jest.fn();
import React from 'react';
import {fireEvent, render} from '@testing-library/react';

import {Feature} from 'ol';
import {Style, Circle, Image, RegularShape} from 'ol/style';

import {RMap, RLayerVector, RFeature} from 'rlayers';
import {
    RStyle,
    RStyleArray,
    RRegularShape,
    RStroke,
    RFill,
    RCircle,
    RText,
    RIcon,
    createRStyle
} from 'rlayers/style';
import {Point} from 'ol/geom';
import * as common from './common';

describe('<RStyle>', () => {
    it('should create a basic icon style', async () => {
        const ref = createRStyle();
        render(
            <RStyle ref={ref}>
                <RIcon src={'/icon'} />
            </RStyle>
        );
        expect((RStyle.getStyle(ref) as () => Style)().getImage()).toBeInstanceOf(Image);
    });
    it('should support icon with a size style and should emit a warning on update', async () => {
        const ref = createRStyle();
        const comp = (color) => (
            <RStyle ref={ref}>
                <RIcon src={'/icon'} size={[16, 16]} color={color} />
            </RStyle>
        );
        const {rerender} = render(comp('#000001'));
        expect((RStyle.getStyle(ref) as () => Style)().getImage().getSize()).toEqual([16, 16]);
        const console_error = console.error;
        const warning = jest.fn();
        console.error = warning;
        rerender(comp('#000002'));
        expect(warning.mock.calls[0][0]).toMatch('anonymous');
        console.error = console_error;
    });
    it('should create a basic dot style', async () => {
        const ref = createRStyle();
        render(
            <RStyle ref={ref}>
                <RStroke color='#007bff' width={3} />
                <RFill color='#000001' />
                <RRegularShape points={5} radius1={10} radius2={5}>
                    <RFill color='#000003' />
                </RRegularShape>
            </RStyle>
        );
        expect(RStyle.getStyleStatic(ref).getStroke().getColor()).toBe('#007bff');
        expect(RStyle.getStyleStatic(ref).getStroke().getWidth()).toBe(3);
        expect(RStyle.getStyleStatic(ref).getFill().getColor()).toBe('#000001');
        expect((RStyle.getStyleStatic(ref).getImage() as RegularShape).getFill().getColor()).toBe(
            '#000003'
        );
    });
    it('should create a basic circle style', async () => {
        const ref = createRStyle();
        render(
            <RStyle ref={ref}>
                <RCircle radius={5}>
                    <RFill color='#000002' />
                </RCircle>
            </RStyle>
        );
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getRadius()).toBe(5);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getFill().getColor()).toBe(
            '#000002'
        );
    });
    it('should create a basic circle style', async () => {
        const ref = createRStyle();
        render(
            <RStyle ref={ref}>
                <RCircle radius={5}>
                    <RFill color='#000002' />
                </RCircle>
            </RStyle>
        );
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getRadius()).toBe(5);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getFill().getColor()).toBe(
            '#000002'
        );
    });
    it('should support updating the style', async () => {
        const ref = createRStyle();
        const {rerender} = render(
            <RStyle ref={ref} zIndex={1}>
                <RCircle radius={5}>
                    <RFill color='#000002' />
                </RCircle>
            </RStyle>
        );
        expect(RStyle.getStyleStatic(ref).getZIndex()).toBe(1);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getRadius()).toBe(5);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getFill().getColor()).toBe(
            '#000002'
        );
        rerender(
            <RStyle ref={ref}>
                <RCircle radius={3}>
                    <RFill color='#000005' />
                </RCircle>
            </RStyle>
        );
        expect(RStyle.getStyleStatic(ref).getZIndex()).toBeUndefined();
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getRadius()).toBe(3);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getFill().getColor()).toBe(
            '#000005'
        );
        rerender(
            <RStyle ref={ref} zIndex={2}>
                <RCircle radius={3}>
                    <RStroke color='#000005' width={1} />
                </RCircle>
            </RStyle>
        );
        expect(RStyle.getStyleStatic(ref).getZIndex()).toBe(2);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getStroke().getWidth()).toBe(1);
    });
    it('should support dynamic styles', async () => {
        const ref = createRStyle();
        render(
            <RStyle
                ref={ref}
                render={(f, r) => (
                    <RText text={f.get('name')}>
                        <RStroke color='#000100' width={r} />
                    </RText>
                )}
            />
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text'
        });
        const style = (RStyle.getStyle(ref) as (Feature, number) => Style)(f, 100);
        expect(style.getText().getText()).toBe('text');
        expect(style.getText().getStroke().getWidth()).toBe(100);
    });
    it('should support caching styles', async () => {
        const ref = createRStyle();
        render(
            <RStyle
                ref={ref}
                cacheSize={16}
                cacheId={(f) => f.get('name')}
                render={(f) => (
                    <RText text={f.get('name')}>
                        <RStroke color='#000100' width={14} />
                    </RText>
                )}
            />
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text14'
        });
        const style = (RStyle.getStyle(ref) as (Feature) => Style)(f);
        expect(style.getText().getText()).toBe('text14');
        expect(style.getText().getStroke().getWidth()).toBe(14);
        expect(ref.current?.cache.get(f.get('name'))).toBe(style);
    });
    it('should apply to vector layers', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVector>;
        render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={ref}>
                    <RStyle>
                        <RStroke color='#000100' width={7} />
                    </RStyle>
                </RLayerVector>
            </RMap>
        );
        const style = ref.current?.ol.getStyle() as Style;
        expect(style.getStroke().getWidth()).toBe(7);
    });
    it('should apply to vector layers w/dynamic', async () => {
        const ref = React.createRef() as React.RefObject<RLayerVector>;
        render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={ref}>
                    <RStyle
                        render={(f) => (
                            <RText text={f.get('name')}>
                                <RStroke color='#000100' width={9} />
                            </RText>
                        )}
                    />
                </RLayerVector>
            </RMap>
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text9'
        });
        const style = (ref.current?.ol.getStyle() as (Feature) => Style)(f);
        expect(style.getText().getText()).toBe('text9');
        expect(style.getText().getStroke().getWidth()).toBe(9);
    });
    it('should apply to features', async () => {
        const refVector = React.createRef() as React.RefObject<RLayerVector>;
        const refFeature = React.createRef() as React.RefObject<RFeature>;
        render(
            <RMap {...common.mapProps}>
                <RLayerVector ref={refVector}>
                    <RFeature ref={refFeature}>
                        <RStyle>
                            <RStroke color='#000100' width={13} />
                        </RStyle>
                    </RFeature>
                </RLayerVector>
            </RMap>
        );
        const styleF = refFeature.current?.ol.getStyle() as Style;
        const styleV = refVector.current?.ol.getStyle();
        expect(styleF.getStroke().getWidth()).toBe(13);
        expect(typeof styleV).toBe('function');
    });
});

describe('RStyle.getStyle', () => {
    it('should always return the same object', async () => {
        const ref = createRStyle();
        render(
            <RStyle ref={ref}>
                <RIcon src={'/icon'} />
            </RStyle>
        );
        const style = RStyle.getStyleStatic(ref);
        expect(RStyle.getStyleStatic(ref.current as RStyle)).toBe(style);
        expect((RStyle.getStyle(ref) as () => Style)()).toBe(style);
        expect((RStyle.getStyle(ref.current as RStyle) as () => Style)()).toBe(style);
    });
    it('should return OpenLayers styles without modification', async () => {
        const obj = new Style({});
        expect(RStyle.getStyle(obj)).toBe(obj);
        expect(RStyle.getStyleStatic(obj)).toBe(obj);
        expect(RStyle.getStyle([obj])[0]).toBe(obj);
        expect(RStyle.getStyleStatic([obj])[0]).toBe(obj);
    });
    it('should throw on dynamic RStyle', async () => {
        const err = console.error;
        console.error = () => undefined;
        const ref = createRStyle();
        render(
            <RStyle
                ref={ref}
                render={(f) => (
                    <RText text={f.get('name')}>
                        <RStroke color='#000100' width={3} />
                    </RText>
                )}
            />
        );
        expect(() => RStyle.getStyleStatic(ref)).toThrow('dynamic');
        console.error = err;
    });
    it('should throw on dynamic StyleLike', async () => {
        const err = console.error;
        console.error = () => undefined;
        expect(() => RStyle.getStyleStatic(() => new Style({}))).toThrow('dynamic');
        console.error = err;
    });
});

describe('<RStyleArray>', () => {
    it('should create a basic style array', async () => {
        const ref = createRStyle();
        render(
            <RStyleArray ref={ref}>
                <RStyle>
                    <RIcon src={'/icon'} />
                </RStyle>
                <RStyle>
                    <RStroke color='#007bff' width={3} />
                    <RFill color='#000001' />
                </RStyle>
            </RStyleArray>
        );
        const style = (RStyle.getStyle(ref) as () => Style[])();
        expect(style[0].getImage()).toBeInstanceOf(Image);
        expect(style[1].getStroke().getWidth()).toBe(3);
        expect(RStyle.getStyleStatic(ref)[0]).toBe(style[0]);
    });
    it('should update a style array', async () => {
        const ref = createRStyle();
        const {rerender} = render(
            <RStyleArray ref={ref}>
                <RStyle>
                    <RIcon src={'/icon'} />
                </RStyle>
                <RStyle>
                    <RStroke color='#007bff' width={3} />
                    <RFill color='#000001' />
                </RStyle>
            </RStyleArray>
        );
        let style = (RStyle.getStyle(ref) as () => Style[])();
        expect(style[0].getImage()).toBeInstanceOf(Image);
        expect(style[1].getStroke().getWidth()).toBe(3);
        rerender(
            <RStyleArray ref={ref}>
                <RStyle>
                    <RStroke color='#007bff' width={1} />
                    <RFill color='#000001' />
                </RStyle>
                <RStyle>
                    <RIcon src={'/icon'} />
                </RStyle>
                <RStyle>
                    <RStroke color='#007bff' width={3} />
                    <RFill color='#000001' />
                </RStyle>
            </RStyleArray>
        );
        style = (RStyle.getStyle(ref) as () => Style[])();
        expect(style[0].getStroke().getWidth()).toBe(1);
        expect(style[1].getImage()).toBeInstanceOf(Image);
        expect(style[2].getStroke().getWidth()).toBe(3);
    });
    it('should create a dynamic style array', async () => {
        const ref = createRStyle();
        const {rerender, unmount} = render(
            <RStyleArray
                ref={ref}
                render={(f) => (
                    <React.Fragment>
                        <RStyle>
                            <RText text={f.get('name')} />
                        </RStyle>
                        <RStyle>
                            <RStroke color='#007bff' width={3} />
                            <RFill color='#000001' />
                        </RStyle>
                    </React.Fragment>
                )}
            />
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text1'
        });
        expect(((ref.current as RStyleArray).style(f, 0) as Style[]).length).toBe(2);
        let style = (RStyle.getStyle(ref) as (Feature) => Style[])(f);
        expect(style[0].getText().getText()).toBe('text1');
        expect(style[1].getStroke().getWidth()).toBe(3);
        f.set('name', 'text2');
        style = (RStyle.getStyle(ref) as (Feature) => Style[])(f);
        expect(style[0].getText().getText()).toBe('text2');
        rerender(
            <RStyleArray
                ref={ref}
                render={(f) => (
                    <React.Fragment>
                        <RStyle>
                            <RStroke color='#007bff' width={3} />
                            <RFill color='#000001' />
                        </RStyle>
                        <RStyle>
                            <RText text={f.get('name')} />
                        </RStyle>
                    </React.Fragment>
                )}
            />
        );
        f.set('name', 'text3');
        style = (RStyle.getStyle(ref) as (Feature) => Style[])(f);
        expect(style[1].getText().getText()).toBe('text3');
        unmount();
    });
    it('should throw on invalid elements', async () => {
        const err = console.error;
        console.error = () => undefined;
        const ref = createRStyle();
        expect(() =>
            render(
                <RStyleArray ref={ref}>
                    <RStyle>
                        <RStroke color='#007bff' width={1} />
                        <RFill color='#000001' />
                    </RStyle>
                    <div></div>
                    <RStyle>
                        <RIcon src={'/icon'} />
                    </RStyle>
                    <RStyle>
                        <RStroke color='#007bff' width={3} />
                        <RFill color='#000001' />
                    </RStyle>
                </RStyleArray>
            )
        ).toThrow('only RStyle');
        console.error = err;
    });
    it('should throw on invalid elements w/render', async () => {
        const err = console.error;
        console.error = () => undefined;
        const ref = createRStyle();
        render(
            <RStyleArray
                ref={ref}
                render={() => (
                    <React.Fragment>
                        <RStyle>
                            <RStroke color='#007bff' width={1} />
                            <RFill color='#000001' />
                        </RStyle>
                        <div></div>
                        <RStyle>
                            <RIcon src={'/icon'} />
                        </RStyle>
                        <RStyle>
                            <RStroke color='#007bff' width={3} />
                            <RFill color='#000001' />
                        </RStyle>
                    </React.Fragment>
                )}
            />
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text1'
        });
        expect(() => (RStyle.getStyle(ref) as (Feature) => Style[])(f)).toThrow('only RStyle');
        console.error = err;
    });
});
