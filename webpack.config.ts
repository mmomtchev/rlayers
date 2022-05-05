// This webpack builds the examples, the library dist files are built with tsc
import path from 'path';
import webpack, {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import * as React from 'react';

const webpackConfig = (env): Configuration => {
    let reactMajorVersion = +React.version.split('.')[0];
    if (reactMajorVersion >= 18) {
        console.log('React 18 detected');
    } else {
        console.log('React 16/17 detected');
    }

    const conf: Configuration = {
        entry: reactMajorVersion >= 18 ? './examples/index-react18.tsx' : './examples/index.tsx',
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
        // https://github.com/TypeStrong/ts-loader/issues/751
        ignoreWarnings: [{message: /export .* was not found in/}],
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
                        DEBUG: !env.production || env.development
                    }
                },
                VERSION: JSON.stringify(require('./package.json').version),
                MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN)
            })
        ],
        devServer: {
            port: 8030
        }
    };

    if (reactMajorVersion < 18) {
        // This is needed for React 16/17 as otherwise ts-loader
        // will pick `index-react18.tsx` and will fail transpiling it
        conf.module.rules.unshift({
            test: /index-react18\.tsx?$/,
            loader: 'null-loader'
        });
    }

    if (!env.development) {
        conf.plugins.push(
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './{src,examples}/**/*.{ts,tsx,js}'
                }
            })
        );
    }

    return conf;
};

export default webpackConfig;
