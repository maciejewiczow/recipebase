module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    modulePathIgnorePatterns: [
        "react-native"
    ],
    setupTestFrameworkScriptFile: "<rootDir>/test-setup.ts"
}
