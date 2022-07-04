/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    projects: [
        './packages/*',
    ],
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'lib', 'src']
};
