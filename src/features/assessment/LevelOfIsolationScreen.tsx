import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Form, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, ProgressBlock, FieldWrapper } from '../../components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '../../components/Text';
import { ValidatedTextInput } from '../../components/ValidatedTextInput';
import { ValidationError, ValidationErrors } from '../../components/ValidationError';
import { PatientStateType } from '../../core/patient/PatientState';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest, PatientInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { cleanIntegerVal } from '../../core/utils/number';

const initialFormValues = {
  isolationLittleInteraction: '',
  isolationLotsOfPeople: '',
  isolationHealthcareProvider: '',
};

interface LevelOfIsolationData {
  isolationLittleInteraction: string;
  isolationLotsOfPeople: string;
  isolationHealthcareProvider: string;
}

type LocationProps = {
  navigation: StackNavigationProp<ScreenParamList, 'LevelOfIsolation'>;
  route: RouteProp<ScreenParamList, 'LevelOfIsolation'>;
};

type State = {
  errorMessage: string;
  enableSubmit: boolean;
};

const checkFormFilled = (props: FormikProps<LevelOfIsolationData>) => {
  if (Object.keys(props.errors).length && props.submitCount > 0) return false;
  if (Object.keys(props.values).length === 0 && props.submitCount > 0) return false;
  return true;
};

const initialState: State = {
  errorMessage: '',
  enableSubmit: true,
};

export default class LevelOfIsolationScreen extends Component<LocationProps, State> {
  constructor(props: LocationProps) {
    super(props);
    this.state = initialState;
  }

  private createAssessment(formData: LevelOfIsolationData) {
    const currentPatient = this.props.route.params.currentPatient;
    const patientId = currentPatient.patientId;

    return {
      patient: patientId,
      isolation_little_interaction: cleanIntegerVal(formData.isolationLittleInteraction),
      isolation_lots_of_people: cleanIntegerVal(formData.isolationLotsOfPeople),
      isolation_healthcare_provider: cleanIntegerVal(formData.isolationHealthcareProvider),
    } as Partial<AssessmentInfosRequest>;
  }

  registerSchema = Yup.object().shape({
    isolationLittleInteraction: Yup.number()
      .required(i18n.t('level-of-isolation.required-answer'))
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationLotsOfPeople: Yup.number()
      .required(i18n.t('level-of-isolation.required-answer'))
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationHealthcareProvider: Yup.number()
      .required(i18n.t('level-of-isolation.required-answer'))
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
  });

  private updatePatientsLastAskedDate(currentPatient: PatientStateType) {
    const userService = new UserService();
    const patientId = currentPatient.patientId;
    const timeNow = moment().toDate();
    const infos = {
      last_asked_level_of_isolation: timeNow,
    } as Partial<PatientInfosRequest>;

    return userService
      .updatePatient(patientId, infos)
      .then((response) => (currentPatient.shouldAskLevelOfIsolation = false))
      .catch(() => {
        this.setState({ errorMessage: i18n.t('something-went-wrong') });
      });
  }

  navigateToStart = (currentPatient: PatientStateType, assessmentId: string) => {
    if (currentPatient.isHealthWorker) {
      this.props.navigation.navigate('HealthWorkerExposure', { currentPatient, assessmentId });
    } else {
      this.props.navigation.navigate('CovidTest', { currentPatient, assessmentId });
    }
  };

  handleUpdate(formData: LevelOfIsolationData) {
    const userService = new UserService();
    let { currentPatient, assessmentId } = this.props.route.params;
    var assessment = this.createAssessment(formData);

    const promise =
      assessmentId == null
        ? userService.addAssessment(assessment)
        : userService.updateAssessment(assessmentId, assessment);

    promise
      .then((response) => {
        this.props.navigation.setParams({ assessmentId: response.data.id });
        assessmentId = response.data.id;
      })
      .then(() => this.updatePatientsLastAskedDate(currentPatient))
      .then(() => this.navigateToStart(currentPatient, assessmentId as string))
      .catch(() => this.setState({ errorMessage: i18n.t('something-went-wrong') }));
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('level-of-isolation.question-level-of-isolation')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: LevelOfIsolationData) => {
            return this.handleUpdate(values);
          }}>
          {(props) => {
            return (
              <Form>
                <FieldWrapper>
                  <Item stackedLabel style={styles.textItemStyle}>
                    <Label>{i18n.t('level-of-isolation.question-little-interaction')}</Label>
                    <ValidatedTextInput
                      placeholder={i18n.t('level-of-isolation.placeholder-frequency')}
                      value={props.values.isolationLittleInteraction}
                      onChangeText={props.handleChange('isolationLittleInteraction')}
                      onBlur={props.handleBlur('isolationLittleInteraction')}
                      error={
                        props.touched.isolationLittleInteraction &&
                        props.errors.isolationLittleInteraction &&
                        props.submitCount > 0
                      }
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Item>
                  {!!props.errors.isolationLittleInteraction && props.submitCount > 0 && (
                    <ValidationError error={props.errors.isolationLittleInteraction} />
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <Item stackedLabel style={styles.textItemStyle}>
                    <Label>{i18n.t('level-of-isolation.question-lots-of-people')}</Label>
                    <ValidatedTextInput
                      placeholder={i18n.t('level-of-isolation.placeholder-frequency')}
                      value={props.values.isolationLotsOfPeople}
                      onChangeText={props.handleChange('isolationLotsOfPeople')}
                      onBlur={props.handleBlur('isolationLotsOfPeople')}
                      error={
                        props.touched.isolationLotsOfPeople &&
                        props.errors.isolationLotsOfPeople &&
                        props.submitCount > 0
                      }
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Item>
                  {!!props.errors.isolationLotsOfPeople && props.submitCount > 0 && (
                    <ValidationError error={props.errors.isolationLotsOfPeople} />
                  )}
                </FieldWrapper>

                <FieldWrapper>
                  <Item stackedLabel style={styles.textItemStyle}>
                    <Label>{i18n.t('level-of-isolation.question-healthcare-provider')}</Label>
                    <ValidatedTextInput
                      placeholder={i18n.t('level-of-isolation.placeholder-frequency')}
                      value={props.values.isolationHealthcareProvider}
                      onChangeText={props.handleChange('isolationHealthcareProvider')}
                      onBlur={props.handleBlur('isolationHealthcareProvider')}
                      error={
                        props.touched.isolationHealthcareProvider &&
                        props.errors.isolationHealthcareProvider &&
                        props.submitCount > 0
                      }
                      returnKeyType="next"
                      keyboardType="numeric"
                    />
                  </Item>
                  {!!props.errors.isolationHealthcareProvider && props.submitCount > 0 && (
                    <ValidationError error={props.errors.isolationHealthcareProvider} />
                  )}
                </FieldWrapper>

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationErrors errors={props.errors as string[]} />
                )}

                <BrandedButton
                  onPress={props.handleSubmit}
                  enable={checkFormFilled(props)}
                  hideLoading={!props.isSubmitting}>
                  {i18n.t('next-question')}
                </BrandedButton>
              </Form>
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
