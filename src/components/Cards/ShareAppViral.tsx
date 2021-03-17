import React from 'react';

import i18n from '@covid/locale/i18n';
import { isAndroid } from '@covid/utils/platform';

import { BaseShareAppCard, shareApp } from './BaseShareApp';

export function ShareAppCardViral() {
  return (
    <BaseShareAppCard
      primaryText={i18n.t('thank-you.sharing-is-caring')}
      secondaryText={i18n.t('thank-you.the-more-reports')}
      ctaTitle={i18n.t('thank-you.share-this-app')}
      onSharePress={() =>
        shareApp(i18n.t('share-this-app.message') + (isAndroid ? ' ' + i18n.t('share-this-app.url') : ''))
      }
    />
  );
}
