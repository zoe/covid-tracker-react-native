import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { ClearButton } from '@covid/components/Buttons/ClearButton';
import CovidTestService from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { CovidTestDateData, CovidTestDateQuestion } from '@covid/features/covid-tests/fields/CovidTestDateQuestion';
import {
  CovidTestMechanismData,
  CovidTestMechanismQuestion,
} from '@covid/features/covid-tests/fields/CovidTestMechanismQuesion';
import {
  CovidTestResultData,
  CovidTestResultQuestion,
} from '@covid/features/covid-tests/fields/CovidTestResultQuestion';
import {
  CovidTestInvitedData,
  CovidTestInvitedQuestion,
} from '@covid/features/covid-tests/fields/CovidTestInvitedQuesetion';
import { CovidTestLocationData, CovidTestLocationQuestion } from '@covid/features/covid-tests/fields/CovidTestLocation';
import Analytics, { events } from '@covid/core/Analytics';

import { ScreenParamList } from '../ScreenParamList';

const covidTestService = new CovidTestService();

export interface CovidTestData
  extends CovidTestDateData,
    CovidTestMechanismData,
    CovidTestResultData,
    CovidTestLocationData,
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

  get testId(): string | undefined {
    const { test } = this.props.route.params;
    return test?.id;
  }

  submitCovidTest(infos: Partial<CovidTest>) {
    if (this.testId) {
      covidTestService
        .updateTest(this.testId, infos)
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
        ...CovidTestMechanismQuestion.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
        ...CovidTestInvitedQuestion.createDTO(formData),
        ...CovidTestLocationQuestion.createDTO(formData),
      } as Partial<CovidTest>;

      this.submitCovidTest(infos);
    }
  }

  async promptDeleteTest() {
    Alert.alert(
      i18n.t('covid-test.delete-test-alert-title'),
      i18n.t('covid-test.delete-test-alert-text'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: async () => {
            await this.deleteTest();
          },
        },
      ],
      { cancelable: false }
    );
  }

  async deleteTest() {
    await covidTestService.deleteTest(this.testId!);
    this.props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  render() {
    const { currentPatient } = AssessmentCoordinator.assessmentData;
    const { test } = this.props.route.params;

    const registerSchema = Yup.object()
      .shape({})
      .concat(CovidTestDateQuestion.schema())
      .concat(CovidTestMechanismQuestion.schema())
      .concat(CovidTestResultQuestion.schema())
      .concat(CovidTestInvitedQuestion.schema())
      .concat(CovidTestLocationQuestion.schema());

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>
            {i18n.t(this.testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...CovidTestDateQuestion.initialFormValues(test),
            ...CovidTestMechanismQuestion.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
            ...CovidTestInvitedQuestion.initialFormValues(test),
            ...CovidTestLocationQuestion.initialFormValues(test),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleAction(values);
          }}>
          {(props) => {
            return (
              <Form>
                <CovidTestDateQuestion formikProps={props as FormikProps<CovidTestDateData>} test={test} />
                <CovidTestMechanismQuestion formikProps={props as FormikProps<CovidTestMechanismData>} test={test} />
                <CovidTestLocationQuestion formikProps={props as FormikProps<CovidTestLocationData>} test={test} />
                <CovidTestResultQuestion formikProps={props as FormikProps<CovidTestResultData>} test={test} />
                <CovidTestInvitedQuestion formikProps={props as FormikProps<CovidTestInvitedData>} test={test} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                {this.testId && (
                  <ClearButton
                    text={i18n.t('covid-test.delete-test')}
                    onPress={async () => {
                      await this.promptDeleteTest();
                    }}
                  />
                )}

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t(this.testId ? 'covid-test.update-test' : 'covid-test.add-test')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
