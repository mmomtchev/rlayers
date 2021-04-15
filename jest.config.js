const { ResourceLoader } = require("jsdom");

const resourceLoader = new ResourceLoader();

module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: {
                rootDir: '.'
            }
        }
    },
    roots: ['<rootDir>/test'],
    transform: {
        '^.+\\.(j|t)sx?$': 'ts-jest'
    },
    transformIgnorePatterns: ['^<rootDir>/node_modules/(?!(ol|ol-mapbox-style)/)'],
    moduleNameMapper: {

        '^rlayers$': '<rootDir>/src',
        '^rlayers-ssr$': '<rootDir>/ssr',
        '^rlayers\/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/test/css.js'
    },
    setupFilesAfterEnv: [
        '@testing-library/react/dont-cleanup-after-each',
        '@testing-library/jest-dom/extend-expect'
    ],
    testRegex: '/test/.*\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
