import { BrandedButton, SafeLayout, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling } from '@covid/themes';
import React from 'react';
import { View } from 'react-native';

export default function MHPThankYouScreen() {
  function onPress() {
    NavigatorService.goBack();
  }
  return (
    <SafeLayout style={styling.backgroundWhite}>
      <View style={[styling.padding, styling.flex]}>
        <View style={styling.marginVerticalAuto}>
          <Text
            inverted
            colorPalette="accentBlue"
            colorShade="main"
            style={styling.marginBottomHuge}
            textAlign="center"
            textClass="h2"
          >
            {i18n.t('mental-health-playback.thank-you.title')}
          </Text>
          <Text inverted colorPalette="accentBlue" colorShade="main" textAlign="center" textClass="h5Medium">
            {i18n.t('mental-health-playback.thank-you.description')}
          </Text>
        </View>
        <BrandedButton enable onPress={onPress} style={{ marginBottom: grid.gutter }}>
          {i18n.t('mental-health-playback.thank-you.button')}
        </BrandedButton>
      </View>
    </SafeLayout>
  );
}
