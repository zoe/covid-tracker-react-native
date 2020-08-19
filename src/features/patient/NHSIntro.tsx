import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import NHSLogo from '@assets/icons/NHSLogo';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { CheckboxItem } from '@covid/components/Checkbox';
import { useInjection } from '@covid/provider/services.hooks';

import { ScreenParamList } from '../ScreenParamList';

export interface Data {
  name: string;
  nhsID: string;
}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSIntro'>;
  route: RouteProp<ScreenParamList, 'NHSIntro'>;
};

type State = {
  consent: boolean;
  errorMessage: string;
};

export const NHSIntroScreen: React.FC<Props> = (props: Props) => {
  const patientService = useInjection<IPatientService>(Services.Patient);
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkFormFilled = (props: FormikProps<Data>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  const toggleConsent = () => {
    setConsent(!consent);
  };

  const handleCancel = () => {
    const currentPatient = patientCoordinator.patientData.patientState;
    const patientId = currentPatient.patientId;

    const infos = {
      is_in_uk_nhs_asymptomatic_study: false,
    };

    patientService
      .updatePatient(patientId, infos)
      .then(() => {
        currentPatient.isNHSStudy = false;
        patientCoordinator.gotoNextScreen(props.route.name);
      })
      .catch(() => setErrorMessage(i18n.t('something-went-wrong')));
  };

  const handleSubmit = (formData: Data) => {
    const currentPatient = patientCoordinator.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = createPatientInfos(formData);

    patientService
      .updatePatient(patientId, infos)
      .then(() => {
        patientCoordinator.gotoNextScreen(props.route.name);
      })
      .catch(() => setErrorMessage(i18n.t('something-went-wrong')));
  };

  const createPatientInfos = (formData: Data) => {
    return {
      name: formData.name,
      nhs_study_id: formData.nhsID,
    } as PatientInfosRequest;
  };

  const registerSchema = Yup.object().shape({});
  const currentPatient = patientCoordinator.patientData.patientState;

  return (
    <Screen profile={currentPatient.profile} navigation={props.navigation}>
      <NHSLogo />

      <Header>
        <HeaderText>{i18n.t('nhs-study-intro.title')}</HeaderText>
      </Header>

      <RegularText>{i18n.t('nhs-study-intro.text-1')}</RegularText>

      <Formik
        initialValues={{} as Data}
        validationSchema={registerSchema}
        onSubmit={(values: Data) => handleSubmit(values)}>
        {(props) => {
          const { handleSubmit, handleChange, touched, errors } = props;

          return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <Form>
                <RegularText>{i18n.t('nhs-study-intro.text-2')}</RegularText>

                <ValidatedTextInput
                  placeholder={i18n.t('nhs-study-intro.name-placeholder')}
                  value={props.values.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                  error={props.touched.name && props.errors.name}
                  returnKeyType="next"
                />

                <ValidatedTextInput
                  placeholder={i18n.t('nhs-study-intro.nhsID-placeholder')}
                  value={props.values.nhsID}
                  onChangeText={props.handleChange('nhsID')}
                  onBlur={props.handleBlur('nhsID')}
                  error={props.touched.nhsID && props.errors.nhsID}
                />

                <RegularText>{i18n.t('nhs-study-intro.text-3')}</RegularText>

                <ClickableText onPress={handleCancel}>{i18n.t('nhs-study-intro.text-cancel')}</ClickableText>

                <RegularText>{i18n.t('nhs-study-intro.text-4')}</RegularText>

                <RegularText>{i18n.t('nhs-study-intro.text-5')}</RegularText>

                <CheckboxItem value={consent} onChange={toggleConsent}>
                  {i18n.t('nhs-study-intro.consent')}
                </CheckboxItem>

                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton
                  onPress={handleSubmit}
                  enable={checkFormFilled(props) && consent}
                  hideLoading={!props.isSubmitting}>
                  {i18n.t('next-question')}
                </BrandedButton>
              </Form>
            </KeyboardAvoidingView>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
