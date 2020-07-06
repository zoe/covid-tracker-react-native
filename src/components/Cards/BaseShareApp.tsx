import React from 'react';
import { Image, Share, ShareAction, StyleSheet, View } from 'react-native';

import { social } from '@assets';
import { colors } from '@theme';
import { BrandedButton, RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';

import { isAndroid } from '../Screen';

export interface CommonShareProps {
  onSharePress?: VoidFunction;
}

interface BaseShareAppCardProps {
  primaryText?: string;
  secondaryText: string;
  ctaTitle: string;
  onSharePress: VoidFunction;
}

const extractSharedOn = (shareAction: ShareAction): string | null => {
  if (shareAction.action === Share.sharedAction) {
    return isAndroid ? 'Android: no data' : shareAction.activityType ? shareAction.activityType : 'unknown';
  }

  if (shareAction.action === Share.dismissedAction) {
    return 'Dismissed';
  }

  return null;
};

export const shareUrl = (): string => i18n.t('share-this-app.url');

export const shareApp = async (message: string) => {
  try {
    const shareAction = await Share.share({
      message,
      url: shareUrl(), // IOS has separate field for URL
    });

    const sharedOn = extractSharedOn(shareAction);
    Analytics.track(events.SHARE_THIS_APP, { sharedOn });
  } catch (error) {}
};

export const BaseShareAppCard: React.FC<BaseShareAppCardProps> = ({
  primaryText,
  secondaryText,
  ctaTitle,
  onSharePress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.socialIconContainer}>
        <Image source={social} style={styles.socialIcon} />
      </View>
      {primaryText != null && <RegularBoldText style={styles.primaryText}>{primaryText}</RegularBoldText>}
      <RegularText style={styles.secondaryText}>{secondaryText}</RegularText>
      <BrandedButton onPress={onSharePress} style={styles.shareButton}>
        {ctaTitle}
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  primaryText: {
    fontSize: 20,
    textAlign: 'center',
  },
  secondaryText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    textAlign: 'center',
    color: colors.secondary,
  },
  shareButton: {
    marginVertical: 20,
    marginHorizontal: 30,
  },
  shareLink: {
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  socialIconContainer: {
    borderRadius: 10,
    margin: 30,
    alignSelf: 'center',
  },
  socialIcon: {
    width: '100%',
    height: 'auto',
    aspectRatio: 3.438,
  },
});
