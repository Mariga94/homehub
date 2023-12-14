import type {
    Config
} from "@jest/types"

const config: Config.InitialOptions = {

    // root directory that Jest should scan for tests and modules within
    roots: ['client/src'],

    // A list of paths to directories that Jest should use to search for files in
    moduleDirectories: ['node_modules', 'src'],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // Transform files with TypeScript using ts-jest
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    // Indicates which files should be considered for converage
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: ['json', 'lcov', 'text', 'clover'],

   

    // SetupFiles property is useful to import any setup files or configuration before running the tests
    setupFiles: ['client/path/to/setupTests.ts'],

   

    // Add other Jest configurations as needed
}

export default config