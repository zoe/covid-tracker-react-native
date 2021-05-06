import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';

export default () => (
  <BasicPage
    active
    footerTitle="Introduction"
    onPress={() => NavigatorService.navigate('MentalHealthPlaybackGeneral')}
  />
);
