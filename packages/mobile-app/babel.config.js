module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        'module:metro-react-native-babel-preset',
        ['@babel/preset-typescript', { allowDeclareFields: true }],

    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        '@babel/plugin-transform-flow-strip-types',
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        [
            'babel-plugin-root-import',
            {
                rootPathPrefix: '~',
                rootPathSuffix: 'src',
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
