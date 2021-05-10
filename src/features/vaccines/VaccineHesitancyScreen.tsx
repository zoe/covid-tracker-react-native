import { BrandedButton, ErrorText, HeaderText } from '@covid/components';
import Screen, { Header } from '@covid/components/Screen';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features';
import {
  VaccineHesitancyData,
  VaccineHesitancyQuestions,
} from '@covid/features/vaccines/fields/VaccineHesitancyQuestions';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik } from 'formik';
import { Form, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineHesitancy'>;
  route: RouteProp<ScreenParamList, 'VaccineHesitancy'>;
};

export const VaccineHesitancyScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);

  const handleSubmit = async (formData: VaccineHesitancyData) => {
    if (!isSubmitting) {
      setSubmitting(true);
      const { patientId } = route.params.assessmentData.patientData;
      try {
        const dto = VaccineHesitancyQuestions.createDTO(formData);
        await vaccineService.saveVaccinePlan(patientId, dto);
        assessmentCoordinator.gotoNextScreen(route.name);
      } catch (e) {
        setErrorMessage(i18n.t('something-went-wrong'));
        // TODO Show error message toast?
      } finally {
        setSubmitting(false);
      }
    }
  };

  const registerSchema = Yup.object().shape({}).concat(VaccineHesitancyQuestions.schema());
  const currentPatient = route.params.assessmentData.patientData.patientState;

  return (
    <View style={styles.rootContainer}>
      <Screen navigation={navigation} profile={currentPatient.profile}>
        <Header>
          <HeaderText>{i18n.t('vaccines.hesitancy.title')}</HeaderText>
        </Header>

        <View>
          <Formik
            initialValues={{
              ...VaccineHesitancyQuestions.initialFormValues(),
            }}
            onSubmit={(values: VaccineHesitancyData) => handleSubmit(values)}
            validationSchema={registerSchema}
          >
            {(props) => {
              return (
                <Form style={{ flexGrow: 1 }}>
                  <View style={{ marginHorizontal: 16 }}>
                    <VaccineHesitancyQuestions formikProps={props} />
                  </View>

                  <View style={{ flex: 1 }} />

                  {!!Object.keys(props.errors).length && (
                    <View style={{ marginBottom: 24, marginHorizontal: 16 }}>
                      <ErrorText>{i18n.t('validation-error-text')}</ErrorText>
                    </View>
                  )}

                  <BrandedButton
                    enable={!isSubmitting}
                    hideLoading={!isSubmitting}
                    onPress={props.handleSubmit}
                    style={styles.continueButton}
                  >
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
  continueButton: {
    marginBottom: 32,
    marginHorizontal: 16,
    marginTop: 16,
  },

  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
});
