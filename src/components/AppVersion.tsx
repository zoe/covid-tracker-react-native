import Constants from 'expo-constants';
import React from 'react';

import { MutedText } from './Text';

export const ApplicationVersion = () => (
  <MutedText style={{ textAlign: 'center' }}>
    AppVersion: {Constants.nativeBuildVersion} - OTA: {Constants.manifest.revisionId}
  </MutedText>
);
