import { social } from '@assets';
import { BrandedButton } from '@covid/components/buttons';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import * as React from 'react';
import { Image, Platform, Share, ShareAction, StyleSheet, View } from 'react-native';

export interface ICommonShareProps {
  onSharePress?: VoidFunction;
}

interface IProps {
  primaryText?: string;
  secondaryText: string;
  ctaTitle: string;
  onSharePress: VoidFunction;
}

const extractSharedOn = (shareAction: ShareAction): string | null => {
  if (shareAction.action === Share.sharedAction) {
    return Platform.OS === 'android'
      ? 'Android: no data'
      : shareAction.activityType
      ? shareAction.activityType
      : 'unknown';
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

export const share = async (prefix: string) => {
  const message = prefix + (Platform.OS === 'android' ? ` ${shareUrl()}` : ''); // On Android add link to end of message
  shareApp(message);
};

export function BaseShareAppCard({ primaryText, secondaryText, ctaTitle, onSharePress }: IProps) {
  return (
    <View style={styles.container}>
      <View style={styles.socialIconContainer}>
        <Image source={social} style={styles.socialIcon} />
      </View>
      {primaryText != null ? <RegularBoldText style={styles.primaryText}>{primaryText}</RegularBoldText> : null}
      <RegularText style={styles.secondaryText}>{secondaryText}</RegularText>
      <BrandedButton onPress={onSharePress} style={styles.shareButton}>
        {ctaTitle}
      </BrandedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  primaryText: {
    fontSize: 20,
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.secondary,
    paddingHorizontal: 40,
    paddingVertical: 10,
    textAlign: 'center',
  },
  shareButton: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  shareLink: {
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: 5,
    textAlign: 'center',
  },
  socialIcon: {
    aspectRatio: 3.438,
    height: 'auto',
    width: '100%',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: 10,
    margin: 30,
  },
});
