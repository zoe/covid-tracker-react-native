import { BrandedButton } from '@covid/components';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features';
import { DoseSymptomsData, DoseSymptomsQuestions } from '@covid/features/vaccines/fields/DoseSymptomsQuestions';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik } from 'formik';
import { Form } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);

  const handleSubmit = async (formData: DoseSymptomsData) => {
    if (!isSubmitting) {
      setSubmitting(true);
      const { patientId } = route.params.assessmentData.patientData;
      try {
        const dosePayload = DoseSymptomsQuestions.createDoseSymptoms(formData);
        dosePayload.dose = route.params.dose;
        await vaccineService.saveDoseSymptoms(patientId, dosePayload);
      } catch (e) {
        setErrorMessage(i18n.t('something-went-wrong'));
        // TODO Show error message toast?
      } finally {
        // TODO Not sure this is the right behaviour. Discuss what to do on error....
        assessmentCoordinator.gotoNextScreen(route.name);
      }
    }
  };

  const registerSchema = Yup.object().shape({}).concat(DoseSymptomsQuestions.schema());
  const currentPatient = route.params.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen navigation={navigation} profile={currentPatient.profile}>
        <Header>
          <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
          </View>

          <HeaderText>
            <HeaderText>{i18n.t('vaccines.dose-symptoms.title-1')}</HeaderText>
            <HeaderText style={{ color: colors.purple }}>{i18n.t('vaccines.dose-symptoms.title-2')}</HeaderText>
            <HeaderText>{i18n.t('vaccines.dose-symptoms.title-3')}</HeaderText>
          </HeaderText>
        </Header>

        <View>
          <Formik
            initialValues={{
              ...DoseSymptomsQuestions.initialFormValues(),
            }}
            onSubmit={(values: DoseSymptomsData) => handleSubmit(values)}
            validationSchema={registerSchema}
          >
            {(props) => {
              return (
                <Form style={{ flexGrow: 1 }}>
                  <View style={{ marginHorizontal: 16 }}>
                    <DoseSymptomsQuestions formikProps={props} />
                  </View>

                  <View style={{ flex: 1 }} />
                  <BrandedButton
                    enable={!isSubmitting}
                    hideLoading={!isSubmitting}
                    onPress={props.handleSubmit}
                    style={styles.continueButton}
                  >
                    {i18n.t('vaccines.dose-symptoms.next')}
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
