// For React Native version 0.59 or later
// var upstreamTransformer = require("metro-react-native-babel-transformer");
// var sassTransformer = require("react-native-sass-transformer");
const svgTransformer = require('react-native-svg-transformer');
// require.resolve('react-native-typescript-transformer')
const rnTSTransformer = require('react-native-typescript-transformer');

module.exports.transform = function transform({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ filename, options, src });
  }
  return rnTSTransformer.transform({ filename, options, src });
};
