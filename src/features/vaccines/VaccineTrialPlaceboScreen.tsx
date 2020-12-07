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
  navigation: StackNavigationProp<ScreenParamList, 'VaccineTrialPlacebo'>;
  route: RouteProp<ScreenParamList, 'VaccineTrialPlacebo'>;
};

export const VaccineTrialPlaceboScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handlePress = async (placeboType: string) => {
    // Save vaccine placebo on screen
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <RegularText>{i18n.t('vaccines.weekly-label')}</RegularText>
          </View>

          <HeaderText>As a trial participant, what type of vaccine did you receive?</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <RegularText>{i18n.t('vaccines.question-text')}</RegularText>
          </View>

          <Form style={{ flexGrow: 1 }}>
            <SelectorButton onPress={() => handlePress('no')} text={i18n.t('vaccines.answer-yes')} />
            <SelectorButton onPress={() => handlePress('yes')} text={i18n.t('vaccines.answer-no')} />
            <SelectorButton onPress={() => handlePress('unsure')} text={i18n.t('vaccines.answer-no')} />
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
