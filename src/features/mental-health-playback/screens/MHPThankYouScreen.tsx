import { BrandedButton, SafeLayout, Text } from '@covid/components';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { grid, styling } from '@covid/themes';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MHPThankYouScreen() {
  function onPress() {
    NavigatorService.goBack();
  }
  return (
    <SafeLayout style={styling.backgroundWhite}>
      <View style={[styling.padding, styling.flex]}>
        <View style={styles.view}>
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
        <BrandedButton enabled onPress={onPress} style={styles.button}>
          {i18n.t('mental-health-playback.thank-you.button')}
        </BrandedButton>
      </View>
    </SafeLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: grid.gutter,
  },
  view: {
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    maxWidth: 250,
  },
});
