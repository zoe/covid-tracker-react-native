import { Text } from '@covid/components';
import FeatureIntroScreen from '@covid/components/FeatureIntroScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function UsualSelfIntroductionScreen() {
  const illustration = require('../assets/usual-self-intro.png');

  return (
    <FeatureIntroScreen
      buttonOnPress={() => NavigatorService.navigate('UsualSelfReportsPowerful')}
      buttonTitle={i18n.t('usual-self.introduction.button')}
      testID="usual-self-introduction-screen"
    >
      <View style={styles.contentWrapper}>
        <Image resizeMode="contain" source={illustration} style={styles.illustration} />
        <Text inverted colorPalette="uiDark" colorShade="darker" textAlign="center" textClass="h1">
          {i18n.t('usual-self.introduction.title')}
        </Text>
      </View>
    </FeatureIntroScreen>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  illustration: {
    alignSelf: 'center',
    aspectRatio: 1,
    height: undefined,
    width: '100%',
  },
});
