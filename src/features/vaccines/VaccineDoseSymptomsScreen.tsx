import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen, { Header } from '@covid/components/Screen';
import { HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { colors } from '@covid/theme';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import { DoesSymptomsData, DoesSymptomsQuestions } from '@covid/features/vaccines/fields/DoseSymptomsQuestions';
import { useInjection } from '@covid/provider/services.hooks';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { Services } from '@covid/provider/services.types';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);

  const handleSubmit = async (formData: DoesSymptomsData) => {
    if (!isSubmitting) {
      setSubmitting(true);
      const patientId = route.params.assessmentData.patientData.patientId;
      try {
        const dosePayload = DoesSymptomsQuestions.createDoseSymptoms(formData);
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

  const registerSchema = Yup.object().shape({}).concat(DoesSymptomsQuestions.schema());
  const currentPatient = route.params.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              ...DoesSymptomsQuestions.initialFormValues(),
            }}
            validationSchema={registerSchema}
            onSubmit={(values: DoesSymptomsData) => handleSubmit(values)}>
            {(props) => {
              return (
                <Form style={{ flexGrow: 1 }}>
                  <View style={{ marginHorizontal: 16 }}>
                    <DoesSymptomsQuestions formikProps={props} />
                  </View>

                  <View style={{ flex: 1 }} />
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
