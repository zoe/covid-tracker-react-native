import { HeaderLightText, Text } from '@covid/components';
import { BrandedButtonAnalytics } from '@covid/components/analytics/BrandedButtonAnalytics';
import { Screen } from '@covid/components/Screen';
import { events } from '@covid/core/Analytics';
import { IconHeart } from '@covid/features/health-profile/components/IconHeart';
import ImageTimSpector from '@covid/features/health-profile/components/ImageTimSpector';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes } from '@covid/themes';
import { colors } from '@theme';
import * as React from 'react';
import { Image, Platform, StyleSheet, useWindowDimensions, View } from 'react-native';

const backgroundTop = require('../assets/background_top_inverted.png');
const backgroundBottom = require('../assets/background_bottom_inverted.png');

const TOP_SPACING_TO_SCREEN_HEIGHT_RATIO = 0.075;

const ORIGINAL_IMAGE_BOTTOM_HEIGHT = 489;
const ORIGINAL_IMAGE_TOP_HEIGHT = 471;
const ORIGINAL_IMAGE_WIDTH = 375;
const IMAGE_BOTTOM_RATIO = ORIGINAL_IMAGE_WIDTH / ORIGINAL_IMAGE_BOTTOM_HEIGHT;
const IMAGE_TOP_RATIO = ORIGINAL_IMAGE_WIDTH / ORIGINAL_IMAGE_TOP_HEIGHT;

export default function HPThankYouScreen() {
  const windowDimensions = useWindowDimensions();
  const height = windowDimensions.height;
  const width = windowDimensions.width;

  const SCALED_BOTTOM_POSITION_ANDROID = (ORIGINAL_IMAGE_BOTTOM_HEIGHT - height) * 0.1;
  const SCALED_BOTTOM_POSITION_IOS = (ORIGINAL_IMAGE_BOTTOM_HEIGHT - height) * 0.4;

  const buttonOnPress = () => {
    NavigatorService.navigate('Dashboard');
  };

  return (
    <Screen
      isInsideTabBar
      noHeader
      noPadding
      backgroundColor={colors.backgroundPrimary}
      testID="health-profile-thank-you-screen"
    >
      <Image
        source={backgroundBottom}
        style={[
          styles.backgroundImage,
          Platform.OS === 'android'
            ? {
                bottom: SCALED_BOTTOM_POSITION_ANDROID,
                width,
              }
            : {
                bottom: SCALED_BOTTOM_POSITION_IOS,
                height: IMAGE_BOTTOM_RATIO * height,
                width,
              },
        ]}
      />
      <Image
        source={backgroundTop}
        style={[
          styles.backgroundImage,
          Platform.OS === 'android'
            ? {
                bottom: SCALED_BOTTOM_POSITION_ANDROID,
                width,
              }
            : {
                bottom: SCALED_BOTTOM_POSITION_IOS,
                height: IMAGE_TOP_RATIO * height,
                width,
              },
        ]}
      />
      <View style={[styles.contentContainer, { marginTop: TOP_SPACING_TO_SCREEN_HEIGHT_RATIO * height }]}>
        <HeaderLightText style={styles.title}>{i18n.t('health-profile.thank-you.title')}</HeaderLightText>
        <Text
          inverted
          colorPalette="uiDark"
          colorShade="darker"
          style={styles.description}
          textAlign="center"
          textClass="h5Light"
        >
          {i18n.t('health-profile.thank-you.description')}
        </Text>
        <IconHeart style={styles.heart} />
        <ImageTimSpector />
        <Text
          colorPalette="uiDark"
          colorShade="lighter"
          style={styles.comingSoon}
          textAlign="center"
          textClass="h5Light"
        >
          {i18n.t('health-profile.thank-you.coming-soon')}
        </Text>
        <BrandedButtonAnalytics
          eventName={events.HEALTH_PROFILE_THANK_YOU_SCREEN_RETURN_HOME_CLICKED}
          onPress={buttonOnPress}
          style={styles.button}
          testID="health-profile-thank-you-button-cta"
        >
          {i18n.t('health-profile.thank-you.return')}
        </BrandedButtonAnalytics>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
  },
  button: {
    backgroundColor: colors.purple,
    marginTop: 56,
  },
  comingSoon: {
    marginVertical: sizes.l,
  },
  contentContainer: {
    paddingHorizontal: sizes.screenHorizontalPadding,
    paddingVertical: sizes.screenVerticalPadding,
  },
  description: {
    marginBottom: sizes.l,
  },
  heart: {
    alignItems: 'center',
    marginBottom: 70,
  },
  marginVertical: {
    marginBottom: sizes.xl,
    marginTop: sizes.l,
  },
  title: {
    color: colors.black,
    marginBottom: sizes.l,
    textAlign: 'center',
  },
});
