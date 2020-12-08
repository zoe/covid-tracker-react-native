import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Form } from 'native-base';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import { VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import { vaccineService } from '@covid/Services';
import { SelectorButton } from '@covid/components/SelectorButton';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineTrialOrNational'>;
  route: RouteProp<ScreenParamList, 'VaccineTrialOrNational'>;
};

export const VaccineTrialOrNationalScreen: React.FC<Props> = ({ route, navigation }) => {
  const handlePress = async (vaccine_type: VaccineTypes) => {
    const vaccine = { vaccine_type } as Partial<VaccineRequest>;

    // Save vaccine_type in assessmentCoordinator for submission later
    assessmentCoordinator.assessmentData.vaccineData = {
      ...assessmentCoordinator.assessmentData.vaccineData!,
      ...vaccine,
    };

    if (vaccine_type === VaccineTypes.COVID_VACCINE) {
      // Save Vaccine to server
      const patientId = assessmentCoordinator.assessmentData.patientData.patientId;
      await vaccineService.saveVaccineResponse(patientId, vaccine);
    }

    assessmentCoordinator.gotoNextScreen(route.name, vaccine_type);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.trial-or-national.label')}</RegularText>
          </View>

          <HeaderText>{i18n.t('vaccines.trial-or-national.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <Form style={{ flexGrow: 1 }}>
            <SelectorButton
              onPress={() => handlePress(VaccineTypes.COVID_VACCINE)}
              text={i18n.t('vaccines.trial-or-national.answer-national')}
            />
            <SelectorButton
              onPress={() => handlePress(VaccineTypes.COVID_TRIAL)}
              text={i18n.t('vaccines.trial-or-national.answer-trial')}
            />
          </Form>
        </View>
      </Screen>
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
