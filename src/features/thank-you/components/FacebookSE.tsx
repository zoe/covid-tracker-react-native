import { facebook } from '@assets';
import { BrandedButton } from '@covid/components';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
import { sizes } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { colors } from '@theme';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const FacebookSECard: React.FC = () => {
  const onButtonPress = () => {
    Analytics.track(events.CLICK_CALLOUT, {
      calloutID: 'facebookSE',
    });
    openWebLink('https://www.facebook.com/covidsymptomstudysverige');
  };

  return (
    <View style={styles.container}>
      <View style={styles.socialIconContainer}>
        <Image source={facebook} style={styles.socialIcon} />
      </View>
      <RegularBoldText style={styles.primaryText}>Följ oss på Facebook!</RegularBoldText>
      <RegularText style={styles.secondaryText}>
        På Facebook hittar du alltid det senaste om COVID Symptom Study, bland annat länkar, artiklar och information om
        uppdateringar.
      </RegularText>
      <BrandedButton onPress={onButtonPress} style={styles.shareButton}>
        Följ oss på Facebook
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: sizes.s,
  },
  primaryText: {
    fontSize: 20,
    paddingHorizontal: sizes.xl,
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.secondary,
    marginHorizontal: sizes.xl,
    paddingVertical: sizes.s,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: colors.darkBlue,
    height: 42,
    marginHorizontal: sizes.xxl,
    marginVertical: sizes.l,
  },
  shareLink: {
    marginBottom: sizes.l,
    marginHorizontal: sizes.xl,
    marginTop: sizes.xxs,
    textAlign: 'center',
  },
  socialIcon: {
    aspectRatio: 1,
    maxHeight: 48,
    maxWidth: 48,
    resizeMode: 'contain',
  },
  socialIconContainer: {
    alignSelf: 'center',
    borderRadius: sizes.s,
    marginBottom: sizes.l,
    marginTop: sizes.l,
  },
});
