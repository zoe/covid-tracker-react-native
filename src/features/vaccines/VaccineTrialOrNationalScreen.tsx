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
import { VaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { colors } from '@theme';
import InfoCircle from '@assets/icons/InfoCircle';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineTrialOrNational'>;
  route: RouteProp<ScreenParamList, 'VaccineTrialOrNational'>;
};

export const VaccineTrialOrNationalScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handlePress = async (vaccineType: string) => {
    assessmentCoordinator.gotoNextScreen(route.name, vaccineType);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <RegularText>How did you receive your vaccination?</RegularText>
          </View>

          <HeaderText>How did you receive your vaccination?</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <RegularText>{i18n.t('vaccines.question-text')}</RegularText>
          </View>

          <Form style={{ flexGrow: 1 }}>
            <SelectorButton
              onPress={() => handlePress('covid_national')}
              text="I was vaccinated during the national roll out of COVID-19 vaccines"
            />
            <SelectorButton onPress={() => handlePress('covid_trial')} text="I participated in a trial" />
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
