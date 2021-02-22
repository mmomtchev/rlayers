/**
 * @jest-environment ./test/network-test-env.js
 */
window.URL.createObjectURL = jest.fn();
import * as fs from 'fs';
import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs';

import {RMap, ROSM, RLayerTile} from 'rlayers';
import RSSRender from 'rlayers/RSSR';
import * as common from './common';

function decodeDataURL(url) {
    const matches = url.match(/^data:.+\/(.+);base64,(.*)$/);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    return buffer;
}

describe('Server-side rendering', () => {
    it('should SSR a map', async () => {
        const raw = await RSSRender(
            <RMap {...common.mapProps}>
                <ROSM />
            </RMap>
        );

        const image = PNG.sync.read(decodeDataURL(raw)).data;
        const ref = PNG.sync.read(fs.readFileSync('./test/__snapshots__/ref1.png')).data;
        const diff = pixelmatch(image, ref, null, 500, 500);
        expect(diff).toBeLessThan(20);
    });
    it('should SSR a map w/2 layers', async () => {
        const raw = await RSSRender(
            <RMap {...common.mapProps}>
                <ROSM />
                <RLayerTile
                    properties={{label: 'OpenTopo'}}
                    url='https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                    attributions='Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
                />
            </RMap>
        );

        const image = PNG.sync.read(decodeDataURL(raw)).data;
        const ref = PNG.sync.read(fs.readFileSync('./test/__snapshots__/ref2.png')).data;
        const diff = pixelmatch(image, ref, null, 500, 500);
        expect(diff).toBeLessThan(20);
    });
});
