import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';
import { homeScreenName } from '@covid/core/localisation/LocalisationService';

export default () => (
  <BasicPage
    active
    footerTitle="Rating"
    onPress={() => NavigatorService.reset([{ name: homeScreenName() }, { name: 'MentalHealthPlaybackThankYou' }])}
  />
);
