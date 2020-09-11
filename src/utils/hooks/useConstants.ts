import Constants from 'expo-constants';

import * as manifest from '../../../app.json';

function useConstants() {
  if (!Constants.manifest) {
    Constants.manifest = manifest.expo;
  }
  return Constants;
}

export default useConstants;
