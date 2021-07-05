import { Text } from '@covid/components';
import IllustrationTim from '@covid/features/reconsent/components/IllustrationTim';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import TalkRectangle from '@covid/features/reconsent/components/TalkRectangle';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { StyleSheet } from 'react-native';

export default function ReconsentIntroductionScreen() {
  return (
    <ReconsentScreen
      buttonOnPress={() => NavigatorService.navigate('ReconsentDiseasePreferences')}
      buttonTitle={i18n.t('reconsent.introduction.button')}
    >
      <Text
        inverted
        colorPalette="actionPrimary"
        colorShade="main"
        style={{ alignSelf: 'center' }}
        textClass="h5Medium"
      >
        {i18n.t('company-name')}{' '}
        <Text inverted colorPalette="actionPrimary" colorShade="main" textClass="h5Light">
          {i18n.t('app-name')}
        </Text>
      </Text>
      <IllustrationTim style={styles.illustration} />
      <TalkRectangle>
        <Text textAlign="center" textClass="h2Light">
          {i18n.t('reconsent.introduction.title')}
        </Text>
      </TalkRectangle>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.description}
        textAlign="center"
        textClass="h5Light"
      >
        {i18n.t('reconsent.introduction.description')}
      </Text>
      <Text
        inverted
        colorPalette="uiDark"
        colorShade="darker"
        style={styles.sidenote}
        textAlign="center"
        textClass="h5Light"
      >
        {i18n.t('reconsent.introduction.sidenote')}
      </Text>
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 32,
    marginTop: 32,
  },
  illustration: {
    alignSelf: 'center',
    marginTop: 12,
  },
  sidenote: {
    marginBottom: 32,
  },
});
