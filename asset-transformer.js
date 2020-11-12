// For React Native version 0.59 or later
// var upstreamTransformer = require("metro-react-native-babel-transformer");
// var sassTransformer = require("react-native-sass-transformer");
var svgTransformer = require('react-native-svg-transformer');
// require.resolve('react-native-typescript-transformer')
var rnTSTransformer = require('react-native-typescript-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return rnTSTransformer.transform({ src, filename, options });
  }
};
