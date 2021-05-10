import i18n from '@covid/locale/i18n';
import { isAndroid } from '@covid/utils/platform';
import React from 'react';

import { BaseShareAppCard, shareApp } from './BaseShareApp';

export function ShareAppCardViral() {
  return (
    <BaseShareAppCard
      ctaTitle={i18n.t('thank-you.share-this-app')}
      onSharePress={() =>
        shareApp(i18n.t('share-this-app.message') + (isAndroid ? ` ${i18n.t('share-this-app.url')}` : ''))
      }
      primaryText={i18n.t('thank-you.sharing-is-caring')}
      secondaryText={i18n.t('thank-you.the-more-reports')}
    />
  );
}
