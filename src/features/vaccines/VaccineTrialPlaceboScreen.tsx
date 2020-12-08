import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Form } from 'native-base';
import { StyleSheet, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { SelectorButton } from '@covid/components/SelectorButton';
import { colors } from '@theme';
import { PlaceboStatus } from '@covid/core/vaccine/dto/VaccineRequest';
import { InlineNeedle } from '@covid/components/InlineNeedle';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineTrialPlacebo'>;
  route: RouteProp<ScreenParamList, 'VaccineTrialPlacebo'>;
};

export const VaccineTrialPlaceboScreen: React.FC<Props> = ({ route, navigation }) => {
  const handlePress = async (placeboStatus: PlaceboStatus) => {
    // Save vaccine placebo on screen
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.placebo.label')}</RegularText>
          </View>

          <HeaderText>{i18n.t('vaccines.placebo.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
          <Form style={{ flexGrow: 1 }}>
            <SelectorButton
              onPress={() => handlePress(PlaceboStatus.NO)}
              text={i18n.t('vaccines.placebo.answer-yes')}
            />
            <SelectorButton
              onPress={() => handlePress(PlaceboStatus.YES)}
              text={i18n.t('vaccines.placebo.answer-no')}
            />
            <SelectorButton
              onPress={() => handlePress(PlaceboStatus.UNSURE)}
              text={i18n.t('vaccines.placebo.answer-unsure')}
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
