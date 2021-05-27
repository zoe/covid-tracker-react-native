import Constants from 'expo-constants';

import * as appConfig from '../../app.json';

export default {
  ...Constants,
  manifest: {
    ...Constants.manifest,
    ...appConfig.expo,
  },
};
