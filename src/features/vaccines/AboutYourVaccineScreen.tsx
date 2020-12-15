import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from 'native-base';
import key from 'weak-key';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@theme';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import { Loading } from '@covid/components/Loading';
import i18n from '@covid/locale/i18n';
import { vaccineService } from '@covid/Services';
import { CovidTestRow } from '@covid/components/CovidTestRow/CovidTestRow';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';

import { IVaccineService } from '../../core/vaccine/VaccineService';
import { VaccineCard } from '@covid/features/vaccines/components/VaccineCard';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  // TODO Inject
  const vaccineService: IVaccineService = vaccineService;
  const coordinator = assessmentCoordinator;
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { patientData } = route.params.assessmentData;

  const handleNextButton = async () => {
    coordinator.gotoNextScreen(route.name);
  };

  return (
    <View style={styles.rootContainer}>
      <Screen profile={patientData.patientState.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('covid-test-list.title')}</HeaderText>
        </Header>

        <View style={styles.content}>
          <RegularText>{i18n.t('covid-test-list.text')}</RegularText>
        </View>

        <BrandedButton style={styles.continueButton} onPress={handleNextButton}>
          <Text>{i18n.t('covid-test-list.never-had-test')}</Text>
        </BrandedButton>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  content: {
    margin: 16,
  },
  newButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: colors.backgroundTertiary,
  },
  newText: {
    color: colors.primary,
  },
  continueButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
