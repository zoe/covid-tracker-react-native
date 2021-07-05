import i18n from '@covid/locale/i18n';
import * as React from 'react';
import { Platform } from 'react-native';

import { BaseShareAppCard, shareApp } from './BaseShareApp';

export function ShareAppCardViral() {
  return (
    <BaseShareAppCard
      ctaTitle={i18n.t('thank-you.share-this-app')}
      onSharePress={() =>
        shareApp(
          i18n.t('share-this-app.message') + (Platform.OS === 'android' ? ` ${i18n.t('share-this-app.url')}` : ''),
        )
      }
      primaryText={i18n.t('thank-you.sharing-is-caring')}
      secondaryText={i18n.t('thank-you.the-more-reports')}
    />
  );
}
