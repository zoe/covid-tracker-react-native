// @ts-expect-error
const childProcess = require('child_process');
// @ts-expect-error
const fs = require('fs');

const podsPath = './ios/Pods';
const privateAssetsPath = './.private-assets';

// if (!fs.existsSync(podsPath)) {
//   childProcess.execSync('yarn install:pod');
// }

if (!fs.existsSync(privateAssetsPath)) {
  childProcess.execSync('yarn install:private-assets');
}
