var svgTransformer = require('react-native-svg-transformer');
var rnTSTransformer = require('react-native-typescript-transformer');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    return svgTransformer.transform({ src, filename, options });
  } else {
    return rnTSTransformer.transform({ src, filename, options });
  }
};
