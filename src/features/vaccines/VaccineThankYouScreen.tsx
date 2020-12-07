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
  navigation: StackNavigationProp<ScreenParamList, 'VaccineThankYou'>;
  route: RouteProp<ScreenParamList, 'VaccineThankYou'>;
};

export const VaccineThankYouScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [takenVaccine, setTakenVaccine] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      taken: takenVaccine === 'yes',
    } as Partial<VaccineRequest>;
    const patientId = assessmentCoordinator.assessmentData.patientData.patientId;
    await vaccineService.saveVaccineResponse(patientId, payload);
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const handlePress = async (taken: string) => {
    setTakenVaccine(taken);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <RegularText>{i18n.t('vaccines.weekly-label')}</RegularText>
          </View>

          <HeaderText>{i18n.t('vaccines.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
          <View style={{ marginVertical: 16 }}>
            <RegularText>Thanks!</RegularText>
          </View>
        </View>
      </Screen>

      <BrandedButton style={styles.continueButton} onPress={handleSubmit} hideLoading={isSubmitting}>
        <Text>{i18n.t('vaccines.confirm')}</Text>
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
