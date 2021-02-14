window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Feature} from 'ol';
import {Style, Circle, Image} from 'ol/style';

import {RStyle, RStroke, RFill, RCircle, RText, RIcon, RStyleRef} from 'react-layers/style';
import {Point} from 'ol/geom';
import * as common from './common';

describe('<RStyle>', () => {
    it('should create a basic icon style', async () => {
        const ref = React.createRef() as RStyleRef;
        render(
            <RStyle ref={ref}>
                <RIcon src={'/icon'} />
            </RStyle>
        );
        expect((RStyle.getStyle(ref) as () => Style)().getImage()).toBeInstanceOf(Image);
    });
    it('should create a basic dot style', async () => {
        const ref = React.createRef() as RStyleRef;
        render(
            <RStyle ref={ref}>
                <RStroke color='#007bff' width={3} />
                <RFill color='#000001' />
            </RStyle>
        );
        expect(RStyle.getStyleStatic(ref).getStroke().getColor()).toBe('#007bff');
        expect(RStyle.getStyleStatic(ref).getStroke().getWidth()).toBe(3);
        expect(RStyle.getStyleStatic(ref).getFill().getColor()).toBe('#000001');
    });
    it('should create a basic circle style', async () => {
        const ref = React.createRef() as RStyleRef;
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
        const ref = React.createRef() as RStyleRef;
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
        const ref = React.createRef() as RStyleRef;
        const {rerender} = render(
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
        rerender(
            <RStyle ref={ref}>
                <RCircle radius={3}>
                    <RFill color='#000005' />
                </RCircle>
            </RStyle>
        );
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getRadius()).toBe(3);
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getFill().getColor()).toBe(
            '#000005'
        );
        rerender(
            <RStyle ref={ref}>
                <RCircle radius={3}>
                    <RStroke color='#000005' width={1} />
                </RCircle>
            </RStyle>
        );
        expect((RStyle.getStyleStatic(ref).getImage() as Circle).getStroke().getWidth()).toBe(1);
    });
    it('should support dynamic styles', async () => {
        const ref = React.createRef() as RStyleRef;
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
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text'
        });
        const style = (RStyle.getStyle(ref) as (Feature) => Style)(f);
        expect(style.getText().getText()).toBe('text');
        expect(style.getText().getStroke().getWidth()).toBe(3);
    });
});

describe('RStyle.getStyle', () => {
    it('should always return the same object', async () => {
        const ref = React.createRef() as RStyleRef;
        render(
            <RStyle ref={ref}>
                <RIcon src={'/icon'} />
            </RStyle>
        );
        const style = RStyle.getStyleStatic(ref);
        expect(RStyle.getStyleStatic(ref.current)).toBe(style);
        expect((RStyle.getStyle(ref) as () => Style)()).toBe(style);
        expect((RStyle.getStyle(ref.current) as () => Style)()).toBe(style);
    });
    it('should return OpenLayers styles without modification', async () => {
        const obj = new Style({});
        expect(RStyle.getStyle(obj)).toBe(obj);
        expect(RStyle.getStyleStatic(obj)).toBe(obj);
        expect(RStyle.getStyle([obj])[0]).toBe(obj);
        expect(RStyle.getStyleStatic([obj])[0]).toBe(obj);
    });
    it('throw on dynamic styles', async () => {
        const err = console.error;
        console.error = () => undefined;
        const ref = React.createRef() as RStyleRef;
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
});
