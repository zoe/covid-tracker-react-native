const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    // transformer: {
    //   babelTransformerPath: require.resolve('./asset-transformer.js'),
    //   assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    // },
    // resolver: {
    //   assetExts: assetExts.filter((ext) => ext !== 'svg'),
    //   sourceExts: [...sourceExts, 'svg'],
    // },
    // maxWorkers: 2,
  };
})();
