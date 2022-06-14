import { social } from '@assets';
import { BrandedButton } from '@covid/components/buttons';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
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

export const shareApp = async (message: string) => {
  try {
    const shareAction = await Share.share({
      message,
      url: i18n.t('share-this-app.url'), // IOS has separate field for URL
    });

    const sharedOn = extractSharedOn(shareAction);
    Analytics.track(events.SHARE_THIS_APP, { sharedOn });
  } catch (error) {}
};

export const share = async (prefix: string) => {
  const message = prefix + (Platform.OS === 'android' ? ` ${i18n.t('share-this-app.url')}` : ''); // On Android add link to end of message
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
    borderRadius: sizes.s,
    paddingHorizontal: sizes.s,
  },
  primaryText: {
    fontSize: 20,
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.secondary,
    paddingHorizontal: sizes.xxl,
    paddingVertical: sizes.s,
    textAlign: 'center',
  },
  shareButton: {
    marginHorizontal: sizes.xl,
    marginVertical: sizes.l,
  },
  shareLink: {
    marginBottom: sizes.l,
    marginHorizontal: sizes.xl,
    marginTop: sizes.xxs,
    textAlign: 'center',
  },
  socialIcon: {
    aspectRatio: 3.438,
    height: 'auto',
    width: '100%',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: sizes.s,
    margin: sizes.xl,
  },
});
