import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import { CovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import {
  CovidTestDateQuestion,
  CovidTestInvitedQuestion,
  CovidTestIsRapidQuestion,
  CovidTestLocationQuestion,
  CovidTestMechanismQuestion,
  CovidTestResultQuestion,
  ICovidTestDateData,
  ICovidTestInvitedData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/fields/';
import Analytics, { events } from '@covid/core/Analytics';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { Services } from '@covid/provider/services.types';
import { lazyInject } from '@covid/provider/services';
import { ClearButton } from '@covid/components/buttons/ClearButton';
import NavigatorService from '@covid/NavigatorService';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { BrandedButton } from '@covid/components';

interface ICovidTestData
  extends ICovidTestDateData,
    ICovidTestMechanismData,
    ICovidTestResultData,
    ICovidTestLocationData,
    ICovidTestInvitedData,
    ICovidTestIsRapidData {}

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

  submitCovidTest(infos: Partial<CovidTest>) {
    const { test } = this.props.route.params;
    if (test?.id) {
      if (
        test.result !== 'positive' &&
        infos.result === 'positive' &&
        this.props.route.params.assessmentData.patientData.patientState.hasSchoolGroup
      ) {
        this.setState({ submitting: false });
        infos.id = this.testId;
        assessmentCoordinator.goToTestConfirm(infos as CovidTest);
      } else {
        this.covidTestService
          .updateTest(test.id, infos)
          .then(() => {
            NavigatorService.goBack();
          })
          .catch(() => {
            this.setState({ errorMessage: i18n.t('something-went-wrong') });
            this.setState({ submitting: false });
          });
      }
    } else {
      if (
        infos.result === 'positive' &&
        this.props.route.params.assessmentData.patientData.patientState.hasSchoolGroup
      ) {
        this.setState({ submitting: false });
        assessmentCoordinator.goToTestConfirm(infos as CovidTest);
      } else {
        this.covidTestService
          .addTest(infos)
          .then(() => {
            NavigatorService.goBack();
          })
          .catch(() => {
            this.setState({ errorMessage: i18n.t('something-went-wrong') });
            this.setState({ submitting: false });
          });
      }
    }
  }

  handleAction(formData: ICovidTestData) {
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
        patient: assessmentCoordinator.assessmentData.patientData.patientId,
        type: CovidTestType.Generic,
        ...CovidTestDateQuestion.createDTO(formData),
        ...CovidTestMechanismQuestion.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
        ...CovidTestInvitedQuestion.createDTO(formData),
        ...CovidTestLocationQuestion.createDTO(formData),
        ...CovidTestIsRapidQuestion.createDTO(formData),
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
      { cancelable: false },
    );
  }

  async deleteTest() {
    await this.covidTestService.deleteTest(this.testId!);
    this.props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  render() {
    const currentPatient = assessmentCoordinator.assessmentData.patientData.patientState;
    const { test } = this.props.route.params;

    const registerSchema = Yup.object()
      .shape({})
      .concat(CovidTestDateQuestion.schema())
      .concat(CovidTestMechanismQuestion.schema())
      .concat(CovidTestResultQuestion.schema())
      .concat(CovidTestInvitedQuestion.schema())
      .concat(CovidTestLocationQuestion.schema())
      .concat(CovidTestIsRapidQuestion.schema());

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>
            {i18n.t(this.testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={2} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...CovidTestDateQuestion.initialFormValues(test),
            ...CovidTestMechanismQuestion.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
            ...CovidTestInvitedQuestion.initialFormValues(test),
            ...CovidTestLocationQuestion.initialFormValues(test),
            ...CovidTestIsRapidQuestion.initialFormValues(test),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: ICovidTestData) => {
            return this.handleAction(values);
          }}
        >
          {(props) => {
            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <CovidTestDateQuestion formikProps={props as FormikProps<ICovidTestDateData>} test={test} />
                  <CovidTestMechanismQuestion formikProps={props as FormikProps<ICovidTestMechanismData>} test={test} />
                  <CovidTestLocationQuestion formikProps={props as FormikProps<ICovidTestLocationData>} test={test} />
                  <CovidTestResultQuestion formikProps={props as FormikProps<ICovidTestResultData>} test={test} />
                  <CovidTestIsRapidQuestion formikProps={props as FormikProps<ICovidTestIsRapidData>} test={test} />
                  <CovidTestInvitedQuestion formikProps={props as FormikProps<ICovidTestInvitedData>} test={test} />

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
                </View>

                <BrandedButton onPress={props.handleSubmit} enable={!this.state.submitting}>
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
