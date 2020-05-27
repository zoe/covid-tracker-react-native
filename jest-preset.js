const { withEnzyme } = require('jest-expo-enzyme');
const { withWatchPlugins } = require('jest-expo/config');

module.exports = withWatchPlugins({
  projects: [
    withEnzyme(require('jest-expo/ios/jest-preset')),
    withEnzyme(require('jest-expo/android/jest-preset')),
    // Do we need web testing?
    // withEnzyme(require('jest-expo/web/jest-preset')),
    withEnzyme(require('jest-expo/node/jest-preset')),
  ],
});
