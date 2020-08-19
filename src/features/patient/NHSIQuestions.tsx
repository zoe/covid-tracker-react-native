import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import i18n from '@covid/locale/i18n';
import patientCoordinator from '@covid/core/patient/PatientCoordinator';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { IPatientService } from '@covid/core/patient/PatientService';
import YesNoField from '@covid/components/YesNoField';

import { ScreenParamList } from '../ScreenParamList';

export interface Data {
  feltUnwell: string;
  thinkHadCovid: string;
  hadClassicSymptoms: string;
}

export type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSQuestions'>;
  route: RouteProp<ScreenParamList, 'NHSQuestions'>;
};

export type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

const initialFormValues = {
  feltUnwell: 'no',
  thinkHadCovid: 'no',
  hadClassicSymptoms: 'no',
};

export default class NHSQuestionsScreen extends Component<Props, State> {
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

  handleUpdateWork(formData: Data) {
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
    const infos = {
      nhs_study_felt_unwell_month_before: formData.feltUnwell === 'yes',
      nhs_study_think_had_covid: formData.thinkHadCovid === 'yes',
      nhs_study_had_classic_symptoms: formData.hadClassicSymptoms === 'yes',
    } as PatientInfosRequest;

    return infos;
  }

  registerSchema = Yup.object().shape({});

  render() {
    const currentPatient = patientCoordinator.patientData.patientState;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('nhs-study-questions.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={initialFormValues as Data}
          validationSchema={this.registerSchema}
          onSubmit={(values: Data) => this.handleUpdateWork(values)}>
          {(props) => {
            const { handleSubmit, handleChange, touched, errors } = props;

            return (
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <YesNoField
                  selectedValue={props.values.feltUnwell}
                  onValueChange={props.handleChange('feltUnwell')}
                  label={i18n.t('nhs-study-questions.felt-unwell')}
                />

                <YesNoField
                  selectedValue={props.values.thinkHadCovid}
                  onValueChange={props.handleChange('thinkHadCovid')}
                  label={i18n.t('nhs-study-questions.think-had-covid')}
                />

                <YesNoField
                  selectedValue={props.values.hadClassicSymptoms}
                  onValueChange={props.handleChange('hadClassicSymptoms')}
                  label={i18n.t('nhs-study-questions.had-classic-symptoms')}
                />

                <Form>
                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(errors).length && props.submitCount > 0 && (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  )}

                  <BrandedButton
                    onPress={handleSubmit}
                    enable={this.checkFormFilled(props)}
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
