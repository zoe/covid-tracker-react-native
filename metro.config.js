// This is a dummy metro config and should be deleted with the next native release,
// along with the config mention in the app.json file.

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig();
  return config;
})();
