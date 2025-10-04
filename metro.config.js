const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: [
            // Excluir svg de assetExts
            ...getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
        ],
        sourceExts: [
            ...getDefaultConfig(__dirname).resolver.sourceExts,
            'svg' // Agregar svg a sourceExts
        ],
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
