module.exports = {
    presets: [
        'module:metro-react-native-babel-preset',
        ['@babel/preset-typescript', { allowDeclareFields: true }],

    ],
    plugins: [
        "babel-plugin-transform-typescript-metadata",
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
    ],
};
