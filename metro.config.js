const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
    resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const config = {
    transformer: {
        getTransformOptions: () =>
            Promise.resolve({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        minifierConfig: {
            keep_classnames: true,
            keep_fnames: true,
            mangle: {
                keep_classnames: true,
                keep_fnames: true,
            },
            output: {
                ascii_only: true,
                quote_style: 3,
                wrap_iife: true,
            },
            sourceMap: {
                includeSources: false,
            },
            toplevel: false,
            compress: {
                reduce_funcs: false,
            },
        },
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};

module.exports = mergeConfig(defaultConfig, config);
