import React from 'react';

import i18n from '@covid/locale/i18n';

import { isAndroid } from '../Screen';

import { CommonShareProps, BaseShareAppCard, shareUrl, shareApp } from './BaseShareApp';

export const ShareAppCard: React.FC<CommonShareProps> = (props) => {
  const shareMessage = i18n.t('share-this-app.message');
  const share = async () => {
    const message = shareMessage + (isAndroid ? ' ' + shareUrl() : ''); // On Android add link to end of message
    shareApp(message);
  };
  const { onSharePress = () => share() } = props;

  return (
    <BaseShareAppCard
      primaryText={i18n.t('share-this-app.primary-text')}
      secondaryText={i18n.t('share-this-app.secondary-text')}
      ctaTitle={i18n.t('share-this-app.button-text')}
      onSharePress={onSharePress}
    />
  );
};
