import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Form, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, HeaderText, RegularText } from '@covid/components/Text';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { vaccineService } from '@covid/Services';
import { colors } from '@theme';
import { InlineNeedle } from '@covid/components/InlineNeedle';
import { DoesSymptomsData, DoesSymptomsQuestions } from '@covid/features/vaccines/fields/DoseSymptomsQuestions';

import { ScreenParamList } from '../ScreenParamList';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'VaccineDoseSymptoms'>;
  route: RouteProp<ScreenParamList, 'VaccineDoseSymptoms'>;
};

export const VaccineDoseSymptomsScreen: React.FC<Props> = ({ route, navigation }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (formData: DoesSymptomsData) => {
    setSubmitting(true);

    const payload = DoesSymptomsQuestions.createDoseSymptoms(formData);
    const patientId = assessmentCoordinator.assessmentData.patientData.patientId;

    // TODO: Catch errors
    await vaccineService.saveDoseSymptoms(patientId, payload);
    assessmentCoordinator.gotoNextScreen(route.name);
  };

  const registerSchema = Yup.object().shape({}).concat(DoesSymptomsQuestions.schema());
  const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
  return (
    <View style={styles.rootContainer}>
      <Screen profile={currentPatient.profile} navigation={navigation}>
        <Header>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <InlineNeedle />
            <RegularText>{i18n.t('vaccines.dose-symptoms.label')}</RegularText>
          </View>

          <HeaderText>{i18n.t('vaccines.dose-symptoms.title')}</HeaderText>
        </Header>

        <View style={{ marginHorizontal: 16 }}>
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
                  <BrandedButton style={styles.continueButton} onPress={props.handleSubmit} hideLoading={isSubmitting}>
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
    marginHorizontal: 16,
    marginBottom: 32,
  },
});
