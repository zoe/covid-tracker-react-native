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
import { NewButton } from '@covid/components/NewButton';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineYesNo'>;
  route: RouteProp<ScreenParamList, 'VaccineYesNo'>;
};

export const VaccineYesNoScreen: React.FC<Props> = ({ route, navigation }) => {
  const handlePress = async (takenVaccine: boolean) => {
    assessmentCoordinator.gotoNextScreen(route.name, takenVaccine);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('vaccines.yes-no.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16, marginVertical: 16 }}>
          <View>
            <RegularText>{i18n.t('vaccines.yes-no.description')}</RegularText>
          </View>

          <Form style={{ flexGrow: 1 }}>
            <NewButton onPress={() => handlePress(true)} text={i18n.t('vaccines.yes-no.answer-yes')} />
            <NewButton onPress={() => handlePress(false)} text={i18n.t('vaccines.yes-no.answer-no')} />
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
});
