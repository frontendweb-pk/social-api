module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.ts$': 'ts-jest', // Transform TypeScript files
    },
    testMatch: ['**/*.test.ts', "**/*.spec.ts"],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts',],
    coveragePathIgnorePatterns: ['src/index.ts'],
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
};