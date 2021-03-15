import React from 'react';

import i18n from '@covid/locale/i18n';

import { ICommonShareProps, BaseShareAppCard, share } from './BaseShareApp';

export const ShareAppCard: React.FC<ICommonShareProps> = (props) => {
  const shareMessage = i18n.t('share-this-app.message');
  const { onSharePress = () => share(shareMessage) } = props;

  return (
    <BaseShareAppCard
      primaryText={i18n.t('share-this-app.primary-text')}
      secondaryText={i18n.t('share-this-app.secondary-text')}
      ctaTitle={i18n.t('share-this-app.button-text')}
      onSharePress={onSharePress}
    />
  );
};
