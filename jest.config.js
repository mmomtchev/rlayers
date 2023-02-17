module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/test'],
    transform: {
        '^.+.(t|j)sx?$': [
            'ts-jest',
            {
                tsconfig: {
                    outDir: './.ts-jest'
                }
            }
        ]
    },
    transformIgnorePatterns: ['/node_modules/(?!(ol|txml|geotiff|quick-lru))'],
    moduleNameMapper: {
        '^rlayers$': '<rootDir>/src',
        '^rlayers/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/test/css.js',
        '^txml/txml$': '<rootDir>/node_modules/txml/dist/txml'
    },
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './test/setup_mocks.ts'],
    testRegex: '/test/.*\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
