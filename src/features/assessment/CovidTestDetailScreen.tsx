import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import CovidTestService from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { CovidTestDateData, CovidTestDateQuestion } from '@covid/features/assessment/fields/CovidTestDateQuestion';
import {
  CovidTestMechanismData,
  CovidTestMechanismQuestionV1,
} from '@covid/features/assessment/fields/CovidTestMechanismQuesionV1';
import {
  CovidTestResultData,
  CovidTestResultQuestion,
} from '@covid/features/assessment/fields/CovidTestResultQuestion';
import {
  CovidTestInvitedData,
  CovidTestInvitedQuestion,
} from '@covid/features/assessment/fields/CovidTestInvitedQuesetion';

import { ScreenParamList } from '../ScreenParamList';

export interface CovidTestData
  extends CovidTestDateData,
    CovidTestMechanismData,
    CovidTestResultData,
    CovidTestInvitedData {}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestDetail'>;
  route: RouteProp<ScreenParamList, 'CovidTestDetail'>;
};

type State = {
  errorMessage: string;
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class CovidTestDetailScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  submitCovidTest(infos: Partial<CovidTest>) {
    const { test } = this.props.route.params;
    const covidTestService = new CovidTestService();
    if (test?.id) {
      covidTestService
        .updateTest(test.id, infos)
        .then(() => {
          AssessmentCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
          this.setState({ submitting: false });
        });
    } else {
      covidTestService
        .addTest(infos)
        .then(() => {
          AssessmentCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
          this.setState({ submitting: false });
        });
    }
  }

  handleAction(formData: CovidTestData) {
    if (!this.state.submitting) {
      this.setState({ submitting: true });

      if (formData.knowsDateOfTest === 'yes' && !formData.dateTakenSpecific) {
        this.setState({ errorMessage: i18n.t('covid-test.required-date') });
        this.setState({ submitting: false });
        return;
      }

      if (
        formData.knowsDateOfTest === 'no' &&
        (formData.dateTakenBetweenStart === undefined || formData.dateTakenBetweenEnd === undefined)
      ) {
        this.setState({ errorMessage: i18n.t('covid-test.required-dates') });
        this.setState({ submitting: false });
        return;
      }

      const infos = {
        patient: AssessmentCoordinator.assessmentData.currentPatient.patientId,
        ...CovidTestDateQuestion.createDTO(formData),
        ...CovidTestMechanismQuestionV1.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
        ...CovidTestInvitedQuestion.createDTO(formData),
      } as Partial<CovidTest>;

      this.submitCovidTest(infos);
    }
  }

  render() {
    const { currentPatient } = AssessmentCoordinator.assessmentData;
    const { test } = this.props.route.params;
    const testId = test?.id;

    const registerSchema = Yup.object()
      .shape({})
      .concat(CovidTestDateQuestion.schema())
      .concat(CovidTestMechanismQuestionV1.schema())
      .concat(CovidTestResultQuestion.schema())
      .concat(CovidTestInvitedQuestion.schema());

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>
            {i18n.t(testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...CovidTestDateQuestion.initialFormValues(test),
            ...CovidTestMechanismQuestionV1.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
            ...CovidTestInvitedQuestion.initialFormValues(test),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleAction(values);
          }}>
          {(props) => {
            return (
              <Form>
                <CovidTestDateQuestion formikProps={props as FormikProps<CovidTestDateData>} test={test} />
                <CovidTestMechanismQuestionV1 formikProps={props as FormikProps<CovidTestMechanismData>} test={test} />
                <CovidTestResultQuestion formikProps={props as FormikProps<CovidTestResultData>} test={test} />
                <CovidTestInvitedQuestion formikProps={props as FormikProps<CovidTestInvitedData>} test={test} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t(testId ? 'covid-test.update-test' : 'covid-test.add-test')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
