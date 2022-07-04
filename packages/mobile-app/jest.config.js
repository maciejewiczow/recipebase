const { defaults: tsPreset } = require('ts-jest/presets');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    ...tsPreset,
    preset: 'react-native',
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.spec.json',
            babelConfig: true,
        },
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: [
        ".*@?react-native.*"
    ]
};
