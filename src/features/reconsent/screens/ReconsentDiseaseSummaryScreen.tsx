import { Text } from '@covid/components';
import IllustrationConfirmation from '@covid/features/reconsent/components/IllustrationSummary';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import { TDiseasePreference } from '@covid/features/reconsent/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { StyleSheet } from 'react-native';

// This is dummy, should be replaced in the future by dynamic global managed data.
const diseases: TDiseasePreference[] = [
  {
    name: 'joint-bone',
  },
  {
    name: 'mental-health',
  },
  {
    name: 'dementia',
  },
];

export default function ReconsentDiseaseSummaryScreen() {
  let diseasesTitle = '';
  if (diseases.length === 1) {
    diseasesTitle = i18n.t(`disease-cards.${diseases[0].name}.name`);
  } else if (diseases.length === 2) {
    diseasesTitle = `${i18n.t(`disease-cards.${diseases[0].name}.name`)} & ${i18n.t(
      `disease-cards.${diseases[1].name}.name`,
    )}`;
  } else if (diseases.length > 2) {
    diseasesTitle = `${i18n.t(`disease-cards.${diseases[0].name}.name`)}, ${i18n.t(
      `disease-cards.${diseases[1].name}.name`,
    )} & ${i18n.t('more')}`;
  }
  return (
    <ReconsentScreen
      activeDot={2}
      buttonOnPress={() => NavigatorService.navigate('ReconsentRequestConsent')}
      buttonTitle={i18n.t('reconsent.disease-summary.button')}
    >
      <Text textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.disease-summary.title')}
      </Text>
      <Text inverted colorPalette="actionSecondary" colorShade="main" textAlign="center" textClass="h2">
        {diseasesTitle}
      </Text>
      <IllustrationConfirmation style={styles.illustration} />
    </ReconsentScreen>
  );
}

const styles = StyleSheet.create({
  illustration: {
    alignSelf: 'center',
    marginTop: 'auto',
  },
});
