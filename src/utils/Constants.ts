import Constants from 'expo-constants';

import * as appConfig from '../../app.json';

export default {
  ...Constants,
  expo: appConfig.expo,
  manifest: {
    ...Constants.manifest,
    ...appConfig.expo,
  },
};
