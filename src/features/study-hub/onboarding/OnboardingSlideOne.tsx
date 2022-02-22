import { Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { Image, StyleSheet, useWindowDimensions } from 'react-native';

const imageRatio = 884 / 820;

export function OnboardingSlideOne() {
  const windowDimensions = useWindowDimensions();

  const sourceIllustration = React.useMemo(
    () => require('@covid/features/study-hub/assets/illustration_slide_one.png'),
    [],
  );
  const sourceTim = React.useMemo(() => require('@covid/features/study-hub/assets/profile_picture_tim.png'), []);

  const imageWidth = windowDimensions.width - sizes.screenVerticalPadding * 4;

  return (
    <>
      <Text
        inverted
        colorPalette="actionPrimary"
        colorShade="main"
        style={styles.marginBottom}
        textAlign="center"
        textClass="h4"
      >
        ZOE{' '}
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h4Light">
          Health Study
        </Text>
      </Text>
      <Image source={sourceTim} style={styles.imageTim} />
      <Text style={styles.marginVertical}>
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
          {i18n.t('study-hub.onboarding.slide-1.title-begin')}
        </Text>{' '}
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3">
          {i18n.t('study-hub.onboarding.slide-1.title-end')}
        </Text>
      </Text>
      <Image
        resizeMethod="resize"
        source={sourceIllustration}
        style={{
          alignSelf: 'center',
          height: imageWidth * imageRatio,
          maxHeight: windowDimensions.height / 2,
          resizeMode: 'contain',
          width: imageWidth,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageTim: {
    alignSelf: 'center',
    height: 120,
    width: 120,
  },
  marginBottom: {
    marginBottom: sizes.l,
  },
  marginVertical: {
    marginBottom: sizes.l,
    marginTop: sizes.l,
  },
});
