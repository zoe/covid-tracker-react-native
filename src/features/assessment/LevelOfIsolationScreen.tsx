import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import moment from 'moment';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, ProgressBlock, isAndroid } from '../../components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '../../components/Text';
import { PatientStateType } from '../../core/patient/PatientState';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest, PatientInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { IOption } from '../patient/YourWorkScreen/helpers';

const initialFormValues = {
  isolationLittleInteraction: 'never',
  isolationLotsOfPeople: 'never',
  isolationHealthcareProvider: 'never',
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
};

const initialState: State = {
  errorMessage: '',
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
      isolation_little_interaction: formData.isolationLittleInteraction,
      isolation_lots_of_people: formData.isolationLotsOfPeople,
      isolation_healthcare_provider: formData.isolationHealthcareProvider,
    } as Partial<AssessmentInfosRequest>;
  }

  registerSchema = Yup.object().shape({
    a: Yup.string(),
    b: Yup.string(),
    c: Yup.string(),
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

    const androidOption = isAndroid && {
      label: i18n.t('choose-one-of-these-options'),
      value: '',
    };

    const isolationFrequencyItems = [
      androidOption,
      { label: i18n.t('level-of-isolation.picker-never'), value: 'Never' },
      { label: i18n.t('level-of-isolation.picker-once'), value: '1_time' },
      { label: i18n.t('level-of-isolation.picker-twice'), value: '2_times' },
      { label: i18n.t('level-of-isolation.picker-three'), value: '3_times' },
      { label: i18n.t('level-of-isolation.picker-four'), value: '4_times' },
      { label: i18n.t('level-of-isolation.picker-five'), value: '5_times' },
      { label: i18n.t('level-of-isolation.picker-six'), value: '6_times' },
      { label: i18n.t('level-of-isolation.picker-seven'), value: '7_times' },
      { label: i18n.t('level-of-isolation.picker-more-than-seven'), value: 'more_than_7_times' },
    ].filter(Boolean) as IOption[];

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
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <Form>
                  <DropdownField
                    selectedValue={props.values.isolationLittleInteraction}
                    onValueChange={props.handleChange('isolationLittleInteraction')}
                    label={i18n.t('level-of-isolation.question-little-interaction')}
                    items={isolationFrequencyItems}
                  />

                  <DropdownField
                    selectedValue={props.values.isolationLotsOfPeople}
                    onValueChange={props.handleChange('isolationLotsOfPeople')}
                    label={i18n.t('level-of-isolation.question-lots-of-people')}
                    items={isolationFrequencyItems}
                  />

                  <DropdownField
                    selectedValue={props.values.isolationHealthcareProvider}
                    onValueChange={props.handleChange('isolationHealthcareProvider')}
                    label={i18n.t('level-of-isolation.question-healthcare-provider')}
                    items={isolationFrequencyItems}
                  />

                  <ErrorText>{this.state.errorMessage}</ErrorText>

                  <BrandedButton onPress={props.handleSubmit}>{i18n.t('next-question')}</BrandedButton>
                </Form>
              </KeyboardAvoidingView>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

// const styles = StyleSheet.create({
//   form: {
//     marginVertical: 32,
//   },
// });
