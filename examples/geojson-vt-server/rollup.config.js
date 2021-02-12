import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import builtins from 'builtin-modules';

export default {
    input: 'geojson-vt-server.mjs',
    output: {
        file: './geodata.min.js',
        format: 'cjs',
        compact: true
    },
    external: builtins,
    plugins: [
        resolve({
            preferBuiltins: true,
            mainFields: ['main']
        }),
        commonjs({
            include: ['node_modules/**']
        }),
        json(),
        terser()
    ]
};
