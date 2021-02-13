window.URL.createObjectURL = jest.fn();
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';

import {Feature} from 'ol';
import {Style, Circle, Image} from 'ol/style';

import {RStyle} from 'react-layers';
import {Point} from 'ol/geom';
import * as common from './common';

describe('<RStyle>', () => {
    it('should create a basic icon style', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        render(
            <RStyle.RStyle ref={ref}>
                <RStyle.RIcon src={'/icon'} />
            </RStyle.RStyle>
        );
        expect((RStyle.RStyle.getStyle(ref) as () => Style)().getImage()).toBeInstanceOf(Image);
    });
    it('should create a basic dot style', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        render(
            <RStyle.RStyle ref={ref}>
                <RStyle.RStroke color='#007bff' width={3} />
                <RStyle.RFill color='#000001' />
            </RStyle.RStyle>
        );
        expect((ref.current.ol as Style).getStroke().getColor()).toBe('#007bff');
        expect((ref.current.ol as Style).getStroke().getWidth()).toBe(3);
        expect((ref.current.ol as Style).getFill().getColor()).toBe('#000001');
    });
    it('should create a basic circle style', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        render(
            <RStyle.RStyle ref={ref}>
                <RStyle.RCircle radius={5}>
                    <RStyle.RFill color='#000002' />
                </RStyle.RCircle>
            </RStyle.RStyle>
        );
        expect(((ref.current.ol as Style).getImage() as Circle).getRadius()).toBe(5);
        expect(((ref.current.ol as Style).getImage() as Circle).getFill().getColor()).toBe(
            '#000002'
        );
    });
    it('should create a basic circle style', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        render(
            <RStyle.RStyle ref={ref}>
                <RStyle.RCircle radius={5}>
                    <RStyle.RFill color='#000002' />
                </RStyle.RCircle>
            </RStyle.RStyle>
        );
        expect(((ref.current.ol as Style).getImage() as Circle).getRadius()).toBe(5);
        expect(((ref.current.ol as Style).getImage() as Circle).getFill().getColor()).toBe(
            '#000002'
        );
    });
    it('should support updating the style', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        const {rerender} = render(
            <RStyle.RStyle ref={ref}>
                <RStyle.RCircle radius={5}>
                    <RStyle.RFill color='#000002' />
                </RStyle.RCircle>
            </RStyle.RStyle>
        );
        expect(((ref.current.ol as Style).getImage() as Circle).getRadius()).toBe(5);
        rerender(
            <RStyle.RStyle ref={ref}>
                <RStyle.RCircle radius={3}>
                    <RStyle.RFill color='#000005' />
                </RStyle.RCircle>
            </RStyle.RStyle>
        );
        expect(((ref.current.ol as Style).getImage() as Circle).getRadius()).toBe(3);
        rerender(
            <RStyle.RStyle ref={ref}>
                <RStyle.RCircle radius={3}>
                    <RStyle.RStroke color='#000005' width={1} />
                </RStyle.RCircle>
            </RStyle.RStyle>
        );
        expect(((ref.current.ol as Style).getImage() as Circle).getStroke().getWidth()).toBe(1);
    });
    it('should support dynamic styles', async () => {
        const ref = React.createRef() as RStyle.RStyleRef;
        render(
            <RStyle.RStyle
                ref={ref}
                render={(f) => (
                    <RStyle.RText text={f.get('name')}>
                        <RStyle.RStroke color='#000100' width={3} />
                    </RStyle.RText>
                )}
            />
        );
        const f = new Feature({
            geometry: new Point(common.coords.ArcDeTriomphe),
            name: 'text'
        });
        const style = (RStyle.RStyle.getStyle(ref) as (Feature) => Style)(f);
        expect(style.getText().getText()).toBe('text');
        expect(style.getText().getStroke().getWidth()).toBe(3);
    });
});
