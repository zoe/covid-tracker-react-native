import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';

export default () => (
  <BasicPage active footerTitle="General" onPress={() => NavigatorService.navigate('MentalHealthPlaybackRating')} />
);
