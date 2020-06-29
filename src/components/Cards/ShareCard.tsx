import React from 'react';
import { Text, View, Image, Share, StyleSheet } from 'react-native';

import { social } from '@assets';
import i18n from '@covid/locale/i18n';
import { isAndroid } from '@covid/components/Screen';
import { AreaStatsResponse } from '@covid/core/user/dto/UserAPIContracts';
import Analytics, { events } from '@covid/core/Analytics';
import { colors } from '@theme';

import { RegularText } from '../Text';
import { BrandedButton } from '../BrandedButton';

interface Props {
  area: AreaStatsResponse | null;
}

const shareUrl = i18n.t('share-this-app.url');

export const getShareMessage = (area: AreaStatsResponse | null) => {
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
  return base() + (isAndroid ? ' ' + shareUrl : ''); // On Android add link to end of message
};

export const shareApp = async (message: string) => {
  try {
    await Share.share({
      message,
      url: shareUrl, // IOS has separate field for URL
    });
    Analytics.track(events.SHARE_THIS_APP);
  } catch (error) {}
};

export const shareAppWithAreaStats = (area: AreaStatsResponse | null) => shareApp(getShareMessage(area));

export const ShareCard: React.FC<Props> = ({ area }) => (
  <View style={styles.shareContainer}>
    <View style={styles.socialIconContainer}>
      <Image source={social} style={styles.socialIcon} />
    </View>
    <Text style={styles.share}>{i18n.t('thank-you.sharing-is-caring')}</Text>
    <RegularText style={styles.shareSubtitle}>{i18n.t('thank-you.the-more-reports')}</RegularText>
    <BrandedButton
      onPress={() => {
        shareAppWithAreaStats(area);
      }}
      style={styles.shareButton}>
      {i18n.t('thank-you.share-this-app')}
    </BrandedButton>
  </View>
);

const styles = StyleSheet.create({
  socialIcon: {
    height: 60,
    resizeMode: 'contain',
  },

  socialIconContainer: {
    height: 60,
    marginTop: 32,
    alignSelf: 'center',
  },

  shareContainer: {
    marginTop: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
  },

  share: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '500',
    textAlign: 'center',
  },

  shareSubtitle: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: colors.secondary,
  },

  shareButton: {
    marginVertical: 20,
    width: 240,
    alignSelf: 'center',
  },
});
