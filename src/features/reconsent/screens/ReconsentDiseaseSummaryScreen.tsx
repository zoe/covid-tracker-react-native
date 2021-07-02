import { Text } from '@covid/components';
import { ScreenParamList } from '@covid/features';
import IllustrationConfirmation from '@covid/features/reconsent/components/IllustrationSummary';
import ReconsentScreen from '@covid/features/reconsent/components/ReconsentScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFormikContext } from 'formik';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import { TDisease, TDiseasePreferencesData } from '../types';

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'ReconsentDiseaseSummary'>;
  route: RouteProp<ScreenParamList, 'ReconsentDiseaseSummary'>;
}

// TODO: delete this Test component
const Test = () => {
  // this doesn't work - just gives us initial props because Formik is reloaded for each stack screen
  const formik = useFormikContext();
  console.log(formik.values);
  return <Text>{formik.values.dementia}</Text>;
};

export default function ReconsentDiseaseSummaryScreen(props: IProps) {
  const diseases: TDiseasePreferencesData = props.route.params || {};
  const diseasesChosen = Object.keys(diseases) as TDisease[];
  const numberDiseases = diseasesChosen.length;

  let diseasesTitle = '';
  // TODO: Copy in the event of no choices being made

  if (numberDiseases === 0) {
    diseasesTitle = 'Sol to provide';
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
      activeDot={1}
      buttonOnPress={() => NavigatorService.navigate('ReconsentRequestConsent')}
      buttonTitle={i18n.t('reconsent.disease-summary.button')}
    >
      <Text textAlign="center" textClass="h2Light">
        {i18n.t('reconsent.disease-summary.title')}
      </Text>
      <Text inverted colorPalette="actionSecondary" colorShade="main" textAlign="center" textClass="h2">
        {diseasesTitle}
      </Text>
      <Test />
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
