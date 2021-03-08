module.exports = {
    roots: ['<rootDir>/test'],
    transform: {
        '^.+\\.(j|t)sx?$': 'ts-jest'
    },
    transformIgnorePatterns: ['/node_modules/(?!ol)'],
    moduleNameMapper: {
        '^rlayers$': '<rootDir>/src',
        '^rlayers\/(.*)$': '<rootDir>/src/$1',
        '\\.(css|less)$': '<rootDir>/test/css.js'
    },
    setupFiles: ['jest-canvas-mock'],
    setupFilesAfterEnv: [
        '@testing-library/react/dont-cleanup-after-each',
        '@testing-library/jest-dom/extend-expect'
    ],
    testRegex: '/test/.*\\.test\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover']
};
