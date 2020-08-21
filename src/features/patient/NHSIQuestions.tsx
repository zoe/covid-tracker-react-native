import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import YesNoField from '@covid/components/YesNoField';
import { useInjection } from '@covid/provider/services.hooks';
import { Coordinator } from '@covid/core/Coordinator';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';

import { ScreenParamList } from '../ScreenParamList';

interface Data {
  hadClassicSymptoms: string;
  thinkHadCovid: string;
}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSQuestions'>;
  route: RouteProp<ScreenParamList, 'NHSQuestions'>;
};

const initialFormValues = {
  hadClassicSymptoms: 'no',
  thinkHadCovid: 'no',
};

export const NHSQuestionsScreen: React.FC<Props> = (props: Props) => {
  const coordinator: Coordinator = props.route.params.editing ? editProfileCoordinator : patientCoordinator;
  const patientService = useInjection<IPatientService>(Services.Patient);
  const [errorMessage, setErrorMessage] = useState('');

  const checkFormFilled = (props: FormikProps<Data>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  const handleUpdateWork = (formData: Data) => {
    const currentPatient = coordinator.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = createPatientInfos(formData);

    patientService
      .updatePatient(patientId, infos)
      .then(() => {
        coordinator.gotoNextScreen(props.route.name);
      })
      .catch(() => setErrorMessage(i18n.t('something-went-wrong')));
  };

  const createPatientInfos = (formData: Data) => {
    return {
      nhs_study_had_classic_symptoms: formData.hadClassicSymptoms === 'yes',
      nhs_study_think_had_covid: formData.thinkHadCovid === 'yes',
    } as PatientInfosRequest;
  };

  const registerSchema = Yup.object().shape({});
  const currentPatient = coordinator.patientData.patientState;

  return (
    <Screen profile={currentPatient.profile} navigation={props.navigation}>
      <Header>
        <HeaderText>{i18n.t('nhs-study-questions.title')}</HeaderText>
      </Header>

      <Formik
        initialValues={initialFormValues as Data}
        validationSchema={registerSchema}
        onSubmit={(values: Data) => handleUpdateWork(values)}>
        {(props) => {
          const { handleSubmit, handleChange, touched, errors } = props;

          return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <YesNoField
                selectedValue={props.values.hadClassicSymptoms}
                onValueChange={props.handleChange('hadClassicSymptoms')}
                label={i18n.t('nhs-study-questions.had-classic-symptoms')}
              />

              <YesNoField
                selectedValue={props.values.thinkHadCovid}
                onValueChange={props.handleChange('thinkHadCovid')}
                label={i18n.t('nhs-study-questions.think-had-covid')}
              />

              <RegularText style={{ margin: 16 }}>{i18n.t('nhs-study-questions.text')}</RegularText>

              <Form>
                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={handleSubmit} enable={checkFormFilled(props)} hideLoading={!props.isSubmitting}>
                  {i18n.t('nhs-study-intro.next')}
                </BrandedButton>
              </Form>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </Screen>
  );
};
