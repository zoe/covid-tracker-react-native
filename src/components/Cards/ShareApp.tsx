import React from 'react';
import { Image, Share, ShareAction, StyleSheet, View } from 'react-native';

import { social } from '@assets';
import { colors } from '@theme';
import { BrandedButton, RegularBoldText, RegularText } from '@covid/components/Text';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import Analytics, { events } from '@covid/core/Analytics';
import i18n from '@covid/locale/i18n';

import { isAndroid } from '../Screen';

interface BaseShareAppCardProps {
  primaryText: string;
  secondaryText: string;
  ctaTitle: string;
  onSharePress: VoidFunction;
}

interface CommonShareProps {
  onSharePress?: VoidFunction;
}

const shareUrl = (): string => i18n.t('share-this-app.url');

const extractSharedOn = (shareAction: ShareAction): string | null => {
  if (shareAction.action === Share.sharedAction) {
    return isAndroid ? 'Android: no data' : shareAction.activityType ? shareAction.activityType : 'unknown';
  }

  if (shareAction.action === Share.dismissedAction) {
    return 'Dismissed';
  }

  return null;
};

const shareApp = async (message: string) => {
  try {
    const shareAction = await Share.share({
      message,
      url: shareUrl(), // IOS has separate field for URL
    });

    const sharedOn = extractSharedOn(shareAction);
    Analytics.track(events.SHARE_THIS_APP, { sharedOn });
  } catch (error) {}
};

const BaseShareAppCard: React.FC<BaseShareAppCardProps> = ({ primaryText, secondaryText, ctaTitle, onSharePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.socialIconContainer}>
        <Image source={social} style={styles.socialIcon} />
      </View>
      <RegularBoldText style={styles.primaryText}>{primaryText}</RegularBoldText>
      <RegularText style={styles.secondaryText}>{secondaryText}</RegularText>
      <BrandedButton onPress={onSharePress} style={styles.shareButton}>
        {ctaTitle}
      </BrandedButton>
    </View>
  );
};

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

interface ShareAppCardViralProps extends CommonShareProps {
  area: AreaStatsResponse | null;
}

export const ShareAppCardViral: React.FC<ShareAppCardViralProps> = (props) => {
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
