import { BrandedButton } from '@covid/components';
import { ClearButton } from '@covid/components/buttons/ClearButton';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { ICovidTestService } from '@covid/core/user/CovidTestService';
import { CovidTest, CovidTestType } from '@covid/core/user/dto/CovidTestContracts';
import {
  CovidTestResultQuestion,
  CovidTestTimeQuestion,
  ICovidTestResultData,
  ICovidTestTimeData,
  INHSTestMechanismData,
  NHSTestMechanismQuestion,
} from '@covid/features/covid-tests/fields/';
import { INHSTestDateData, NHSTestDateQuestion } from '@covid/features/covid-tests/fields/NHSTestDateQuestion';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { lazyInject } from '@covid/provider/services';
import { Services } from '@covid/provider/services.types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import * as Yup from 'yup';

interface INHSTestData extends INHSTestDateData, INHSTestMechanismData, ICovidTestResultData, ICovidTestTimeData {}

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
    return this.props.route.params?.test?.id;
  }

  // TODO: refactor this into a util function
  submitCovidTest(infos: Partial<CovidTest>) {
    if (this.props.route.params?.test?.id) {
      this.covidTestService
        .updateTest(this.props.route.params?.test?.id, infos)
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

  handleAction(formData: INHSTestData) {
    if (!this.state.submitting) {
      this.setState({ submitting: true });

      if (!formData.dateTakenSpecific) {
        this.setState({ errorMessage: i18n.t('covid-test.required-date') });
        this.setState({ submitting: false });
        return;
      }

      const infos = {
        invited_to_test: false,
        patient: AssessmentCoordinator.assessmentData?.patientData?.patientId,
        type: CovidTestType.NHSStudy,
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
    const test = this.props.route.params?.test;

    const registerSchema = Yup.object()
      .shape({})
      .concat(NHSTestDateQuestion.schema())
      .concat(CovidTestTimeQuestion.schema())
      .concat(NHSTestMechanismQuestion.schema())
      .concat(CovidTestResultQuestion.schema());

    return (
      <Screen
        navigation={this.props.navigation}
        profile={AssessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      >
        <Header>
          <HeaderText>
            {i18n.t(this.testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={5} step={2} />
        </ProgressBlock>

        <Formik
          initialValues={{
            ...NHSTestDateQuestion.initialFormValues(test),
            ...CovidTestTimeQuestion.initialFormValues(test),
            ...NHSTestMechanismQuestion.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
          }}
          onSubmit={(values: INHSTestData) => {
            return this.handleAction(values);
          }}
          validationSchema={registerSchema}
        >
          {(props) => {
            return (
              <Form>
                <View style={{ marginHorizontal: 16 }}>
                  <NHSTestDateQuestion formikProps={props as FormikProps<INHSTestDateData>} test={test} />
                  <CovidTestTimeQuestion formikProps={props as FormikProps<ICovidTestTimeData>} test={test} />
                  <NHSTestMechanismQuestion formikProps={props as FormikProps<INHSTestMechanismData>} test={test} />
                  <CovidTestResultQuestion formikProps={props as FormikProps<ICovidTestResultData>} test={test} />
                </View>

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
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

                <BrandedButton onPress={props.handleSubmit}>
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
