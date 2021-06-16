import NHSLogo from '@assets/icons/NHSLogo';
import { BrandedButton } from '@covid/components';
import { CheckboxItem } from '@covid/components/Checkbox';
import Screen, { Header } from '@covid/components/Screen';
import { ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { ValidationError } from '@covid/components/ValidationError';
import { Coordinator } from '@covid/core/Coordinator';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { IPatientService } from '@covid/core/patient/PatientService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { ScreenParamList } from '@covid/features';
import editProfileCoordinator from '@covid/features/multi-profile/edit-profile/EditProfileCoordinator';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { Form, View } from 'native-base';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';

export interface IData {
  nhsID: string;
}

interface IProps {
  navigation: StackNavigationProp<ScreenParamList, 'NHSIntro'>;
  route: RouteProp<ScreenParamList, 'NHSIntro'>;
}

const initialValues = {} as IData;

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
    const { patientId } = currentPatient;

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

  async function onSubmit(values: IData, formikHelpers: FormikHelpers<IData>) {
    const currentPatient = coordinator.patientData.patientState;
    const infos = createPatientInfos(values);

    try {
      await patientService.updatePatientInfo(currentPatient.patientId, infos);
      coordinator.gotoNextScreen(props.route.name);
    } catch (_) {
      setErrorMessage(i18n.t('something-went-wrong'));
    }

    formikHelpers.setSubmitting(false);
  }

  const createPatientInfos = (formData: IData) => {
    return {
      nhs_study_id: formData.nhsID,
    } as PatientInfosRequest;
  };

  const validationSchema = Yup.object().shape({});
  const currentPatient = coordinator.patientData.patientState;

  return (
    <Screen navigation={props.navigation} profile={currentPatient.profile}>
      <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
        <NHSLogo />
      </View>

      <Header>
        <HeaderText style={{ marginBottom: 16 }}>{i18n.t('nhs-study-intro.title')}</HeaderText>
      </Header>

      <View style={{ paddingHorizontal: 16 }}>
        <RegularText style={{ marginBottom: 24 }}>{i18n.t('nhs-study-intro.text-1')}</RegularText>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(formikProps) => (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
              <Form>
                <RegularText style={{ marginBottom: 16 }}>{i18n.t('nhs-study-intro.text-2')}</RegularText>

                <ValidatedTextInput
                  error={formikProps.touched.nhsID && formikProps.errors.nhsID}
                  onBlur={formikProps.handleBlur('nhsID')}
                  onChangeText={formikProps.handleChange('nhsID')}
                  placeholder={i18n.t('nhs-study-intro.nhsID-placeholder')}
                  value={formikProps.values.nhsID}
                />

                <RegularText style={{ marginVertical: 16 }}>
                  <RegularText>{i18n.t('nhs-study-intro.text-3')}</RegularText>
                  <ClickableText onPress={handleCancel}>{i18n.t('nhs-study-intro.text-cancel')}</ClickableText>
                </RegularText>

                <CheckboxItem onChange={toggleConsent} value={consent}>
                  {i18n.t('nhs-study-intro.consent')}
                </CheckboxItem>

                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                  <ValidationError error={i18n.t('validation-error-text')} />
                ) : null}

                <BrandedButton
                  enable={checkFormFilled(formikProps) && consent}
                  hideLoading={!formikProps.isSubmitting}
                  onPress={formikProps.handleSubmit}
                >
                  {i18n.t('nhs-study-intro.next')}
                </BrandedButton>
              </Form>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
    </Screen>
  );
}
