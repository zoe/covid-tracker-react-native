import React from 'react';
import { View } from 'react-native';

import NavigatorService from '@covid/NavigatorService';
import { BrandedButton, SafeLayout, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import { grid, styling } from '@covid/themes';

export default function MHPThankYouScreen() {
  function onPress() {
    NavigatorService.goBack();
  }
  return (
    <SafeLayout style={styling.backgroundWhite} withGutter>
      <View style={styling.marginVerticalAuto}>
        <Text
          inverted
          textAlign="center"
          colorPalette="accentBlue"
          colorShade="main"
          textClass="h2"
          style={styling.marginBottomHuge}>
          {i18n.t('mental-health-playback.thank-you.title')}
        </Text>
        <Text inverted textAlign="center" colorPalette="accentBlue" colorShade="main" textClass="h5Medium">
          {i18n.t('mental-health-playback.thank-you.description')}
        </Text>
      </View>
      <BrandedButton enable onPress={onPress} style={{ marginBottom: grid.gutter }}>
        {i18n.t('mental-health-playback.thank-you.button')}
      </BrandedButton>
    </SafeLayout>
  );
}
