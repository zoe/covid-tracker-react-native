import { BrandedButton } from '@covid/components';
import { ClearButton } from '@covid/components/buttons/ClearButton';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
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
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import * as Yup from 'yup';

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
    } else if (
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

  onSubmit(values: ICovidTestData) {
    if (!this.state.submitting) {
      this.setState({ submitting: true });
      if (values.knowsDateOfTest === 'yes' && !values.dateTakenSpecific) {
        this.setState({ errorMessage: i18n.t('covid-test.required-date') });
        this.setState({ submitting: false });
        return;
      }

      if (
        values.knowsDateOfTest === 'no' &&
        (values.dateTakenBetweenStart === undefined || values.dateTakenBetweenEnd === undefined)
      ) {
        this.setState({ errorMessage: i18n.t('covid-test.required-dates') });
        this.setState({ submitting: false });
        return;
      }

      const infos = {
        patient: assessmentCoordinator.assessmentData.patientData.patientId,
        type: CovidTestType.Generic,
        ...CovidTestDateQuestion.createDTO(values),
        ...CovidTestMechanismQuestion.createDTO(values),
        ...CovidTestResultQuestion.createDTO(values),
        ...CovidTestInvitedQuestion.createDTO(values),
        ...CovidTestLocationQuestion.createDTO(values),
        ...CovidTestIsRapidQuestion.createDTO(values),
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
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: async () => {
            await this.deleteTest();
          },
          style: 'destructive',
          text: i18n.t('delete'),
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
    const { test } = this.props.route.params;

    const initialValues = {
      ...CovidTestDateQuestion.initialFormValues(test),
      ...CovidTestMechanismQuestion.initialFormValues(test),
      ...CovidTestResultQuestion.initialFormValues(test),
      ...CovidTestInvitedQuestion.initialFormValues(test),
      ...CovidTestLocationQuestion.initialFormValues(test),
      ...CovidTestIsRapidQuestion.initialFormValues(test),
    };

    const validationSchema = Yup.object()
      .shape({})
      .concat(CovidTestDateQuestion.schema())
      .concat(CovidTestMechanismQuestion.schema())
      .concat(CovidTestResultQuestion.schema())
      .concat(CovidTestInvitedQuestion.schema())
      .concat(CovidTestLocationQuestion.schema())
      .concat(CovidTestIsRapidQuestion.schema());

    return (
      <Screen
        navigation={this.props.navigation}
        profile={assessmentCoordinator.assessmentData.patientData.patientState.profile}
      >
        <Header>
          <HeaderText>
            {i18n.t(this.testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={2} step={1} />
        </ProgressBlock>

        <Formik initialValues={initialValues} onSubmit={this.onSubmit} validationSchema={validationSchema}>
          {(formikProps) => {
            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <CovidTestDateQuestion formikProps={formikProps as FormikProps<ICovidTestDateData>} test={test} />
                  <CovidTestMechanismQuestion
                    formikProps={formikProps as FormikProps<ICovidTestMechanismData>}
                    test={test}
                  />
                  <CovidTestLocationQuestion
                    formikProps={formikProps as FormikProps<ICovidTestLocationData>}
                    test={test}
                  />
                  <CovidTestResultQuestion formikProps={formikProps as FormikProps<ICovidTestResultData>} test={test} />
                  <CovidTestIsRapidQuestion
                    formikProps={formikProps as FormikProps<ICovidTestIsRapidData>}
                    test={test}
                  />
                  <CovidTestInvitedQuestion
                    formikProps={formikProps as FormikProps<ICovidTestInvitedData>}
                    test={test}
                  />

                  <ErrorText>{this.state.errorMessage}</ErrorText>
                  {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                    <ValidationError error={i18n.t('validation-error-text')} />
                  ) : null}

                  {this.testId ? (
                    <ClearButton
                      onPress={async () => {
                        await this.promptDeleteTest();
                      }}
                      text={i18n.t('covid-test.delete-test')}
                    />
                  ) : null}
                </View>

                <BrandedButton enable={!this.state.submitting} onPress={formikProps.handleSubmit}>
                  {i18n.t(this.testId ? 'covid-test.update-test' : 'covid-test.add-test')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
