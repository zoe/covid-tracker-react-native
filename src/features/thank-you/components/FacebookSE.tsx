import { facebook } from '@assets';
import { BrandedButton } from '@covid/components';
import { RegularBoldText, RegularText } from '@covid/components/Text';
import Analytics, { events } from '@covid/core/Analytics';
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
    borderRadius: 10,
    marginHorizontal: 10,
  },
  primaryText: {
    fontSize: 20,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  secondaryText: {
    color: colors.secondary,
    marginHorizontal: 32,
    paddingVertical: 10,
    textAlign: 'center',
  },
  shareButton: {
    backgroundColor: colors.facebook,
    height: 42,
    marginHorizontal: 72,
    marginVertical: 20,
  },
  shareLink: {
    marginBottom: 20,
    marginHorizontal: 30,
    marginTop: 5,
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
    borderRadius: 10,
    marginBottom: 24,
    marginTop: 24,
  },
});
