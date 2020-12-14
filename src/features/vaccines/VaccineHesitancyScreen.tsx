import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { colors } from '@theme';
import {
  VaccineHesitancyData,
  VaccineHesitancyQuestions,
} from '@covid/features/vaccines/fields/VaccineHesitancyQuestions';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineHesitancy'>;
  route: RouteProp<ScreenParamList, 'VaccineHesitancy'>;
};

export const VaccineHesitancyScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: VaccineHesitancyData) => {
    // if (!isSubmitting) {
    //   setSubmitting(true);
    //   const patientId = route.params.assessmentData.patientData.patientId;
    //   try {
    //     if (route.params.recordVaccine) {
    //       await vaccineService.saveVaccineResponse(patientId, route.params.assessmentData.vaccineData!);
    //     }
    //     const dosePayload = DoesSymptomsQuestions.createDoseSymptoms(formData);
    //     await vaccineService.saveDoseSymptoms(patientId, dosePayload);
    //   } catch (e) {
    //     setErrorMessage(i18n.t('something-went-wrong'));
    //     //TODO Show error message toast?
    //   } finally {
    //     assessmentCoordinator.gotoNextScreen(route.name);
    //   }
    // }
  };

  const registerSchema = Yup.object().shape({}).concat(VaccineHesitancyQuestions.schema());
  const currentPatient = route.params.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <HeaderText>{i18n.t('vaccines.hesitancy.title')}</HeaderText>
        </Header>

        <View>
          <Formik
            initialValues={{
              ...VaccineHesitancyQuestions.initialFormValues(),
            }}
            validationSchema={registerSchema}
            onSubmit={(values: VaccineHesitancyData) => handleSubmit(values)}>
            {(props) => {
              return (
                <Form style={{ flexGrow: 1 }}>
                  <View style={{ marginHorizontal: 16 }}>
                    <VaccineHesitancyQuestions formikProps={props} />
                  </View>

                  <View style={{ flex: 1 }} />

                  {!!Object.keys(props.errors).length && (
                    <View style={{ marginHorizontal: 16, marginBottom: 24 }}>
                      <ErrorText>{i18n.t('validation-error-text')}</ErrorText>
                    </View>
                  )}

                  <BrandedButton
                    style={styles.continueButton}
                    onPress={props.handleSubmit}
                    enable={!isSubmitting}
                    hideLoading={!isSubmitting}>
                    <Text>{i18n.t('vaccines.dose-symptoms.next')}</Text>
                  </BrandedButton>
                </Form>
              );
            }}
          </Formik>
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
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
