import { Text } from '@covid/components';
import { IllustrationSlideTwo } from '@covid/features/study-hub/onboarding/IllustrationSlideTwo';
import i18n from '@covid/locale/i18n';
import { sizes } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

export function OnboardingSlideTwo() {
  const windowDimensions = useWindowDimensions();

  const illustrationWidth = windowDimensions.width - sizes.screenVerticalPadding * 4;

  return (
    <>
      <Text>
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3">
          {i18n.t('study-hub.onboarding.slide-2.title-begin')}
        </Text>{' '}
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h3Light">
          {i18n.t('study-hub.onboarding.slide-2.title-end')}
        </Text>
      </Text>
      <IllustrationSlideTwo maxWidth={illustrationWidth} style={styles.illustration} />
    </>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignSelf: 'center',
    marginTop: sizes.xl,
  },
});
