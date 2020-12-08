import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { vaccineService } from '@covid/Services';
import { SelectorButton } from '@covid/components/SelectorButton';
import { DoseSymptomsRequest, VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { colors } from '@theme';
import InfoCircle from '@assets/icons/InfoCircle';
import { InlineNeedle } from '@covid/components/InlineNeedle';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    // TODO: Save DOSE SYMPTOM
    const payload = {} as Partial<DoseSymptomsRequest>;
    const patientId = assessmentCoordinator.assessmentData.patientData.patientId;
    await vaccineService.saveDoseSymptoms(patientId, payload);
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
          </View>

          <HeaderText>{i18n.t('vaccines.dose-symptoms.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <RegularText>{i18n.t('vaccines.dose-symptoms.question')}</RegularText>
          </View>
        </View>
      </Screen>

      <BrandedButton style={styles.continueButton} onPress={handleSubmit} hideLoading={isSubmitting}>
        <Text>{i18n.t('vaccines.dose-symptoms.next')}</Text>
      </BrandedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },

  continueButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
