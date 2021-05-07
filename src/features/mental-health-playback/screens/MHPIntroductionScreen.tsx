import React from 'react';

import NavigatorService from '@covid/NavigatorService';
import { BasicPage } from '@covid/components';
import i18n from '@covid/locale/i18n';
import Illust from '@assets/illust.svg';

export default () => (
  <BasicPage
    active
    hasStickyHeader
    footerTitle={i18n.t('mental-health-playback.introduction.button')}
    onPress={() => NavigatorService.navigate('MentalHealthPlaybackGeneral')}
  >
    <Illust />
  </BasicPage>
);
