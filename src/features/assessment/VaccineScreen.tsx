import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form } from 'native-base';
import { Text, View } from 'react-native';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, HeaderText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { SelectorButton } from '@covid/components/SelectorButton';
import { VaccineRequest } from '@covid/core/vaccines/dto/VaccineRequest';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Vaccines'>;
  route: RouteProp<ScreenParamList, 'Vaccines'>;
};

export const VaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [takenVaccine, setTakenVaccine] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    const payload = {
      taken: takenVaccine === 'yes',
    } as Partial<VaccineRequest>;
    const patientId = assessmentCoordinator.assessmentData.patientData.patientId;
    await assessmentService.saveVaccineResponse(patientId, payload);
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const handlePress = async (taken: string) => {
    setTakenVaccine(taken);
  };

  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('vaccines.title')}</HeaderText>
        </Header>

        <View>
          <Text>{i18n.t('vaccines.question-text')}</Text>
        </View>

        <Form style={{ flexGrow: 1 }}>
          <View style={{ marginHorizontal: 16 }}>
            <SelectorButton onPress={() => handlePress('yes')} text={i18n.t('vaccines.answer-yes')} />
            <SelectorButton onPress={() => handlePress('no')} text={i18n.t('vaccines.answer-no')} />
          </View>

          {takenVaccine === 'yes' && <Text>{i18n.t('vaccines.yes-info')}</Text>}
          {takenVaccine === 'no' && <Text>{i18n.t('vaccines.no-info')}</Text>}

          <View style={{ flex: 1 }} />
          <BrandedButton onPress={handleSubmit} hideLoading={isSubmitting}>
            {i18n.t('vaccines.confirm')}
          </BrandedButton>
        </Form>
      </Screen>
    </>
  );
};
