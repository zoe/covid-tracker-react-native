import { Formik, FormikProps } from 'formik';
import { Form, View } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen, { Header } from '@covid/components/Screen';
import { ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
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
import { Coordinator } from '@covid/core/Coordinator';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import NavigatorService from '@covid/NavigatorService';
import { ScreenParamList } from '@covid/features';
import { BrandedButton } from '@covid/components';

export interface IData {
  nhsID: string;
}

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'NHSIntro'>;
  route: RouteProp<ScreenParamList, 'NHSIntro'>;
}

export function NHSIntroScreen(props: IProps) {
  const coordinator: Coordinator = props.route.params.editing ? editProfileCoordinator : patientCoordinator;

  const patientService = useInjection<IPatientService>(Services.Patient);
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkFormFilled = (props: FormikProps<IData>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  const toggleConsent = () => {
    setConsent(!consent);
  };

  const handleCancel = () => {
    const currentPatient = coordinator.patientData.patientState;
    const patientId = currentPatient.patientId;

    const infos = {
      is_in_uk_nhs_asymptomatic_study: false,
    };

    patientService
      .updatePatientInfo(patientId, infos)
      .then(() => {
        currentPatient.isNHSStudy = false;

        if (props.route.params.editing) {
          NavigatorService.goBack();
        } else {
          coordinator.gotoNextScreen(props.route.name);
        }
      })
      .catch(() => setErrorMessage(i18n.t('something-went-wrong')));
  };

  const handleSubmit = (formData: IData) => {
    const currentPatient = coordinator.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = createPatientInfos(formData);

    patientService
      .updatePatientInfo(patientId, infos)
      .then(() => {
        coordinator.gotoNextScreen(props.route.name);
      })
      .catch(() => setErrorMessage(i18n.t('something-went-wrong')));
  };

  const createPatientInfos = (formData: IData) => {
    return {
      nhs_study_id: formData.nhsID,
    } as PatientInfosRequest;
  };

  const registerSchema = Yup.object().shape({});
  const currentPatient = coordinator.patientData.patientState;

  return (
    <Screen profile={currentPatient.profile} navigation={props.navigation}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <NHSLogo />
      </View>

      <Header>
        <HeaderText style={{ marginBottom: 16 }}>{i18n.t('nhs-study-intro.title')}</HeaderText>
      </Header>

      <View style={{ paddingHorizontal: 16 }}>
        <RegularText style={{ marginBottom: 24 }}>{i18n.t('nhs-study-intro.text-1')}</RegularText>

        <Formik
          initialValues={{} as IData}
          validationSchema={registerSchema}
          onSubmit={(values: IData) => handleSubmit(values)}
        >
          {(props) => {
            const { handleSubmit, errors } = props;

            return (
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Form>
                  <RegularText style={{ marginBottom: 16 }}>{i18n.t('nhs-study-intro.text-2')}</RegularText>

                  <ValidatedTextInput
                    placeholder={i18n.t('nhs-study-intro.nhsID-placeholder')}
                    value={props.values.nhsID}
                    onChangeText={props.handleChange('nhsID')}
                    onBlur={props.handleBlur('nhsID')}
                    error={props.touched.nhsID && props.errors.nhsID}
                  />

                  <RegularText style={{ marginVertical: 16 }}>
                    <RegularText>{i18n.t('nhs-study-intro.text-3')}</RegularText>
                    <ClickableText onPress={handleCancel}>{i18n.t('nhs-study-intro.text-cancel')}</ClickableText>
                  </RegularText>

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
                    hideLoading={!props.isSubmitting}
                  >
                    {i18n.t('nhs-study-intro.next')}
                  </BrandedButton>
                </Form>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </View>
    </Screen>
  );
}
