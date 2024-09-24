module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/test'],
    transform: {
        '\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: {
                    outDir: './.ts-jest'
                }
            }
        ],
        '\\.jsx?$': [
            'babel-jest',
            {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-modules-commonjs']
            }
        ]
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(ol|txml|geotiff|quick-lru|color-|rbush|earcut|pbf|quickselect))'
    ],
    moduleNameMapper: {
        '^rlayers$': '<rootDir>/src',
        '^rlayers/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/test/css.js',
        '^txml/txml$': '<rootDir>/node_modules/txml/dist/txml'
    },
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['@testing-library/jest-dom', './test/setup_mocks.ts'],
    testRegex: '/test/.*\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
