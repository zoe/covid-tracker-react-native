const { getDefaultConfig } = require('metro-config');

// This is a dummy metro config and should be deleted with the next native release,
// along with the config mention in the app.json file.

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
