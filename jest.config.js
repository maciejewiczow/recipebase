/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  projects: [
    './packages/*/jest.config.js',
  ],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'lib', 'src']
};
