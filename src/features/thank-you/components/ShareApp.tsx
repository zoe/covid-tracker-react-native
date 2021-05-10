import i18n from '@covid/locale/i18n';
import React from 'react';

import { BaseShareAppCard, ICommonShareProps, share } from '../../../components/Cards/BaseShareApp';

export function ShareAppCard(props: ICommonShareProps) {
  const shareMessage = i18n.t('share-this-app.message');
  const { onSharePress = () => share(shareMessage) } = props;

  return (
    <BaseShareAppCard
      ctaTitle={i18n.t('share-this-app.button-text')}
      onSharePress={onSharePress}
      primaryText={i18n.t('share-this-app.primary-text')}
      secondaryText={i18n.t('share-this-app.secondary-text')}
    />
  );
}
