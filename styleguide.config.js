const path = require('path');
const glob = require('glob');

module.exports = {
    title: 'rlayers API',
    components: 'src/[A-Z]*.tsx',
    usageMode: 'expand',
    webpackConfig: {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    },
                    exclude: /dist/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json']
        }
    },
    sections: [
        {
            name: 'Core',
            description: 'Core components',
            components: 'src/R[A-Z]*.tsx',
            ignore: 'src/REvent.tsx'
        },
        {
            name: 'Layer',
            description: 'Layer componenets',
            components: 'src/layer/R[A-Z]*.tsx',
            ignore: 'src/layer/R@(LayerBaseVector|Layer|LayerRaster).tsx'
        },
        {
            name: 'Control',
            description: 'Map controls',
            components: 'src/control/R[A-Z]*.tsx',
            ignore: 'src/control/RControlBase.tsx'
        },
        {
            name: 'Style',
            description: 'Components for creating styles',
            components: 'src/style/R[A-Z]*.tsx',
            ignore: 'src/style/R@(Base|Image).tsx'
        },
        {
            name: 'Interaction',
            description: 'Components for handling interactions',
            components: 'src/interaction/R[A-Z]*.tsx',
            ignore: 'src/control/RPointer.tsx'
        }
    ],
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json').parse,
    styleguideDir: 'docs/api'
};
