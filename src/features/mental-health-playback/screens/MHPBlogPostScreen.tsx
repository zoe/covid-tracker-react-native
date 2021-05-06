import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';

export default () => (
  <BasicPage active footerTitle="Blog post" onPress={() => NavigatorService.navigate('MentalHealthPlaybackRating')} />
);
