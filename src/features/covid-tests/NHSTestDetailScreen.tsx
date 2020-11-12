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
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import Analytics, { events } from '@covid/core/Analytics';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import { ClearButton } from '@covid/components/Buttons/ClearButton';
import { NHSTestDateData, NHSTestDateQuestion } from '@covid/features/covid-tests/fields/NHSTestDateQuestion';
import {
  CovidTestTimeQuestion,
  ICovidTestTimeData,
  CovidTestResultData,
  CovidTestResultQuestion,
  NHSTestMechanismData,
  NHSTestMechanismQuestion,
} from '@covid/features/covid-tests/fields/';

export interface NHSTestData extends NHSTestDateData, NHSTestMechanismData, CovidTestResultData, ICovidTestTimeData {}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'NHSTestDetail'>;
  route: RouteProp<ScreenParamList, 'NHSTestDetail'>;
};

type State = {
  errorMessage: string;
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class NHSTestDetailScreen extends Component<CovidProps, State> {
  @lazyInject(Services.CovidTest)
  private readonly covidTestService: ICovidTestService;

  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  get testId(): string | undefined {
    const { test } = this.props.route.params;
    return test?.id;
  }

  // TODO: refactor this into a util function
  submitCovidTest(infos: Partial<CovidTest>) {
    const { test } = this.props.route.params;
    if (test?.id) {
      this.covidTestService
        .updateTest(test.id, infos)
        .then(() => {
          AssessmentCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
          this.setState({ submitting: false });
        });
    } else {
      this.covidTestService
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

  handleAction(formData: NHSTestData) {
    if (!this.state.submitting) {
      this.setState({ submitting: true });

      if (!formData.dateTakenSpecific) {
        this.setState({ errorMessage: i18n.t('covid-test.required-date') });
        this.setState({ submitting: false });
        return;
      }

      const infos = {
        patient: AssessmentCoordinator.assessmentData.patientData.patientId,
        type: CovidTestType.NHSStudy,
        invited_to_test: false,
        ...NHSTestDateQuestion.createDTO(formData),
        ...CovidTestTimeQuestion.createDTO(formData),
        ...NHSTestMechanismQuestion.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
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
    await this.covidTestService.deleteTest(this.testId!);
    this.props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.patientData.patientState;
    const { test } = this.props.route.params;

    const registerSchema = Yup.object()
      .shape({})
      .concat(NHSTestDateQuestion.schema())
      .concat(CovidTestTimeQuestion.schema())
      .concat(NHSTestMechanismQuestion.schema())
      .concat(CovidTestResultQuestion.schema());

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
            ...NHSTestDateQuestion.initialFormValues(test),
            ...CovidTestTimeQuestion.initialFormValues(test),
            ...NHSTestMechanismQuestion.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: NHSTestData) => {
            return this.handleAction(values);
          }}>
          {(props) => {
            return (
              <Form>
                <NHSTestDateQuestion formikProps={props as FormikProps<NHSTestDateData>} test={test} />
                <CovidTestTimeQuestion formikProps={props as FormikProps<ICovidTestTimeData>} test={test} />
                <NHSTestMechanismQuestion formikProps={props as FormikProps<NHSTestMechanismData>} test={test} />
                <CovidTestResultQuestion formikProps={props as FormikProps<CovidTestResultData>} test={test} />

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
