/**
 * @jest-environment node
 */
Object.defineProperty(global, 'navigator', {value: {userAgent: ''}});
import * as fs from 'fs';
import 'ol-ssr/dom';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {fromLonLat} from 'ol/proj';
import pixelmatch from 'pixelmatch';

import {PNG} from 'pngjs';

import {RMap, ROSM, RLayerTile} from 'rlayers';
import {RSSRender} from 'rlayers-ssr';

const mapProps = {
    initial: {center: fromLonLat([2.364, 48.82]), zoom: 11},
    width: 500,
    height: 500
};

function decodeDataURL(url) {
    const matches = url.match(/^data:.+\/(.+);base64,(.*)$/);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    return buffer;
}

jest.mock('piscina', () => {
    return function (options: {filename: string}) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fn = require(options.filename).default;
        return {
            runTask: fn
        };
    };
});

describe('[SSR plugin rlayers-ssr] Server-side rendering', () => {
    it('should SSR a map', async () => {
        const raw = await RSSRender(
            <RMap {...mapProps}>
                <ROSM />
            </RMap>
        );

        const image = PNG.sync.read(decodeDataURL(raw.placeholderImage)).data;
        const ref = PNG.sync.read(fs.readFileSync('./test/__snapshots__/ref1.png')).data;
        const diff = pixelmatch(image, ref, null, 500, 500);
        expect(diff).toBeLessThan(25000);
    });
    it('should SSR a map w/2 layers', async () => {
        const raw = await RSSRender(
            <RMap {...mapProps}>
                <ROSM />
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
            </RMap>
        );

        const image = PNG.sync.read(decodeDataURL(raw.placeholderImage)).data;
        const ref = PNG.sync.read(fs.readFileSync('./test/__snapshots__/ref2.png')).data;
        const diff = pixelmatch(image, ref, null, 500, 500);
        expect(diff).toBeLessThan(25000);
    });
});
