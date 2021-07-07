import { Text } from '@covid/components';
import { selectDiseasePreferences } from '@covid/core/state/reconsent';
import { TDisease, TDiseasePreferencesData } from '@covid/core/state/reconsent/types';
import IllustrationConfirmation from '@covid/features/reconsent/components/IllustrationSummary';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function ReconsentDiseaseSummaryScreen() {
  const diseasePreferences = useSelector(selectDiseasePreferences);
  const identifiers = Object.keys(diseasePreferences) as TDisease[];
  const diseasesChosen = identifiers.filter((key: keyof TDiseasePreferencesData) => diseasePreferences[key] === true);
  const numberDiseases = diseasesChosen.length;

  let diseasesTitle = '';
  // TODO: Copy in the event of no choices being made

  if (numberDiseases === 0) {
    diseasesTitle = i18n.t('reconsent.disease-summary.various-diseases');
  } else if (numberDiseases === 1) {
    diseasesTitle = i18n.t(`disease-cards.${diseasesChosen[0]}.name`);
  } else if (numberDiseases === 2) {
    diseasesTitle = `${i18n.t(`disease-cards.${diseasesChosen[0]}.name`)} & ${i18n.t(
      `disease-cards.${diseasesChosen[1]}.name`,
    )}`;
  } else if (numberDiseases > 2) {
    diseasesTitle = `${i18n.t(`disease-cards.${diseasesChosen[0]}.name`)}, ${i18n.t(
      `disease-cards.${diseasesChosen[1]}.name`,
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
      {numberDiseases === 0 ? (
        <Text textAlign="center" textClass="h2Light">
          {diseasesTitle}
        </Text>
      ) : (
        <Text inverted colorPalette="actionSecondary" colorShade="main" textAlign="center" textClass="h2">
          {diseasesTitle}
        </Text>
      )}
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
