// This webpack builds the examples, the library dist files are built with tsc
import path from "path";
import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const webpackConfig = (env): Configuration => ({
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
                },
                exclude: /dist/
            },
            {
                test: /\.jsx$/,
                use: 'raw-loader'
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
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './{src,examples}/**/*.{ts,tsx,js}'
            }
        })
    ],
    devServer: {
        port: 8030
    }
});

export default webpackConfig;
