// This webpack builds the examples, the library dist files are built with tsc
import path from 'path';
import webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';

const webpackConfig = (env): webpack.Configuration => {
    const conf: webpack.Configuration = {
        entry: './examples/index.tsx',
        ...(env.production || !env.development ? {} : {devtool: 'eval-source-map'}),
        resolve: {
            alias: {
                rlayers: path.resolve(__dirname, 'src')
            },
            extensions: ['.ts', '.tsx', '.js'],
            //TODO waiting on https://github.com/dividab/tsconfig-paths-webpack-plugin/issues/61
            //@ts-ignore
            plugins: [new TsconfigPathsPlugin()]
        },
        output: {
            path: path.join(__dirname, '/docs'),
            filename: 'bundle.js'
        },
        ignoreWarnings: [
            // https://github.com/TypeStrong/ts-loader/issues/751
            {message: /export .* was not found in/},
            // OpenLayers + React + rlayers is simply big
            {message: /asset size exceeds/},
            {message: /recommended size limit/}
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                        configFile: 'examples/tsconfig.json'
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-url-loader'
                },
                {
                    test: /\.md$/,
                    use: ['html-loader', 'markdown-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './examples/index.html'
            }),
            new webpack.DefinePlugin({
                process: {
                    env: {
                        RLAYERS_DEBUG: !env.production || env.development
                    }
                },
                VERSION: JSON.stringify(require('./package.json').version),
                MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN),
                STADIA_MAPS_API_KEY: JSON.stringify(process.env.STADIA_MAPS_API_KEY)
            })
        ],
        devServer: {
            port: 8030,
            headers: process.env.COOP
                ? {
                      'Cross-Origin-Opener-Policy': 'same-origin',
                      'Cross-Origin-Embedder-Policy': 'require-corp'
                  }
                : undefined
        }
    };

    if (!env.development) {
        conf.plugins!.push(new ForkTsCheckerWebpackPlugin());
    }

    return conf;
};

export default webpackConfig;
