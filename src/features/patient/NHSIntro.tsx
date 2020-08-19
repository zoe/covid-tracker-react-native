import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import NHSLogo from '@assets/icons/NHSLogo';
import { ValidatedTextInput } from '@covid/components/ValidatedTextInput';
import { CheckboxItem, CheckboxList } from '@covid/components/Checkbox';

import { ScreenParamList } from '../ScreenParamList';

export interface Data {
  name: string;
  nhsID: string;
}

export type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSIntro'>;
  route: RouteProp<ScreenParamList, 'NHSIntro'>;
};

export type State = {
  consent: boolean;
  errorMessage: string;
};

const initialState: State = {
  consent: false,
  errorMessage: '',
};

export default class NHSIntroScreen extends Component<Props, State> {
  @lazyInject(Services.Patient)
  private readonly patientService: IPatientService;

  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  checkFormFilled = (props: FormikProps<Data>) => {
    if (Object.keys(props.errors).length) return false;
    if (Object.keys(props.values).length === 0) return false;
    return true;
  };

  toggleConsent = () => {
    this.setState({
      consent: !this.state.consent,
    });
  };

  handleCancel() {
    const currentPatient = patientCoordinator.patientData.patientState;
    const patientId = currentPatient.patientId;

    const infos = {
      is_in_uk_nhs_asymptomatic_study: false,
    };

    this.patientService
      .updatePatient(patientId, infos)
      .then(() => {
        currentPatient.isNHSStudy = false;
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch(() =>
        this.setState({
          errorMessage: i18n.t('something-went-wrong'),
        })
      );
  }

  handleSubmit(formData: Data) {
    const currentPatient = patientCoordinator.patientData.patientState;
    const patientId = currentPatient.patientId;
    const infos = this.createPatientInfos(formData);

    this.patientService
      .updatePatient(patientId, infos)
      .then(() => {
        patientCoordinator.gotoNextScreen(this.props.route.name);
      })
      .catch(() =>
        this.setState({
          errorMessage: i18n.t('something-went-wrong'),
        })
      );
  }

  private createPatientInfos(formData: Data) {
    return {
      name: formData.name,
      nhs_study_id: formData.nhsID,
    } as PatientInfosRequest;
  }

  registerSchema = Yup.object().shape({});

  render() {
    const currentPatient = patientCoordinator.patientData.patientState;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <NHSLogo />

        <Header>
          <HeaderText>{i18n.t('nhs-study-intro.title')}</HeaderText>
        </Header>

        <RegularText>{i18n.t('nhs-study-intro.text-1')}</RegularText>

        <Formik
          initialValues={{} as Data}
          validationSchema={this.registerSchema}
          onSubmit={(values: Data) => this.handleSubmit(values)}>
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

                  <ClickableText onPress={this.handleCancel}>{i18n.t('nhs-study-intro.text-cancel')}</ClickableText>

                  <RegularText>{i18n.t('nhs-study-intro.text-4')}</RegularText>

                  <RegularText>{i18n.t('nhs-study-intro.text-5')}</RegularText>

                  <CheckboxItem value={this.state.consent} onChange={this.toggleConsent}>
                    {i18n.t('nhs-study-intro.consent')}
                  </CheckboxItem>

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(errors).length && props.submitCount > 0 && (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  )}

                  <BrandedButton
                    onPress={handleSubmit}
                    enable={this.checkFormFilled(props) && this.state.consent}
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
  }
}

const styles = StyleSheet.create({
  textItemStyle: {
    borderColor: 'transparent',
  },
});
