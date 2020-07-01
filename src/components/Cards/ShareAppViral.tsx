import React from 'react';

import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';

import { isAndroid } from '../Screen';

import { CommonShareProps, BaseShareAppCard, shareUrl, shareApp } from './BaseShareApp';

interface Props extends CommonShareProps {
  area: AreaStatsResponse | null;
}

const getViralShareMessage = (area: AreaStatsResponse | null) => {
  const base = () => {
    if (!area) return i18n.t('share-this-app.message');
    if (area.locked)
      // Be careful with extra tabs or space, they would appear in the message.
      return i18n.t('thank-you.share-area-locked', {
        missing: area.number_of_missing_contributors,
        area: area.area_name,
      });
    else return i18n.t('thank-you.share-area-unlocked', { cases: area.predicted_cases, area: area.area_name });
  };
  return base() + (isAndroid ? ' ' + shareUrl() : ''); // On Android add link to end of message
};

export const shareAppWithAreaStats = (area: AreaStatsResponse | null) => shareApp(getViralShareMessage(area));

export const ShareAppCardViral: React.FC<Props> = (props) => {
  const {
    area,
    onSharePress = () => {
      shareAppWithAreaStats(area);
    },
  } = props;
  return (
    <BaseShareAppCard
      primaryText={i18n.t('thank-you.sharing-is-caring')}
      secondaryText={i18n.t('thank-you.the-more-reports')}
      ctaTitle={i18n.t('thank-you.share-this-app')}
      onSharePress={onSharePress}
    />
  );
};
