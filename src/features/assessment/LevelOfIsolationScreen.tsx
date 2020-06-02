import { assessmentService } from '@covid/Services';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationErrors } from '@covid/components/ValidationError';
import { AssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { PatientStateType } from '@covid/core/patient/PatientState';
import UserService from '@covid/core/user/UserService';
import { PatientInfosRequest } from '@covid/core/user/dto/UserAPIContracts';
import { cleanIntegerVal } from '@covid/core/utils/number';
import i18n from '@covid/locale/i18n';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import { Form } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';

import { ScreenParamList } from '../ScreenParamList';

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
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationLotsOfPeople: Yup.number()
      .typeError(i18n.t('level-of-isolation.whole-number'))
      .integer(i18n.t('level-of-isolation.whole-number'))
      .min(0, i18n.t('level-of-isolation.correct-answer')),
    isolationHealthcareProvider: Yup.number()
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
      .then(() => (currentPatient.shouldAskLevelOfIsolation = false))
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

  async handleUpdate(formData: LevelOfIsolationData) {
    try {
      const { currentPatient, assessmentId } = this.props.route.params;
      var assessment = this.createAssessment(formData);

      const response = await assessmentService.saveAssessment(assessmentId, assessment);
      if (!assessmentId) {
        this.props.navigation.setParams({ assessmentId: response.id });
      }
      this.updatePatientsLastAskedDate(currentPatient);
      this.navigateToStart(currentPatient, response.id);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
    }
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
                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-little-interaction')}
                  name="isolationLittleInteraction"
                  keyboardType="numeric"
                  showError
                />

                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-lots-of-people')}
                  name="isolationLotsOfPeople"
                  keyboardType="numeric"
                  showError
                />

                <GenericTextField
                  formikProps={props}
                  placeholder={i18n.t('level-of-isolation.placeholder-optional')}
                  label={i18n.t('level-of-isolation.question-healthcare-provider')}
                  name="isolationHealthcareProvider"
                  keyboardType="numeric"
                  showError
                />

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
