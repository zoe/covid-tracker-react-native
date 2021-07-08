import { BrandedButton } from '@covid/components';
import { ClearButton } from '@covid/components/buttons/ClearButton';
import { FormWrapper } from '@covid/components/Forms';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
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
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
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

export default class CovidTestDetailScreen extends React.Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  get testId(): string | undefined {
    return this.props.route.params?.test?.id;
  }

  submitCovidTest(infos: Partial<CovidTest>) {
    const { test } = this.props.route.params;
    if (this.props.route.params?.test?.id) {
      if (
        this.props.route.params?.test?.result !== 'positive' &&
        infos.result === 'positive' &&
        this.props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
      ) {
        this.setState({ submitting: false });
        infos.id = this.testId;
        assessmentCoordinator.goToTestConfirm(infos as CovidTest);
      } else {
        covidTestService
          .updateTest(this.props.route.params?.test?.id, infos)
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
      this.props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
    ) {
      this.setState({ submitting: false });
      assessmentCoordinator.goToTestConfirm(infos as CovidTest);
    } else {
      covidTestService
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
        patient: assessmentCoordinator.assessmentData?.patientData?.patientId,
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
    await covidTestService.deleteTest(this.testId!);
    this.props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  render() {
    const test = this.props.route.params?.test;

    const registerSchema = Yup.object()
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
        profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
        testID="covid-test-detail-screen"
      >
        <Header>
          <HeaderText>
            {i18n.t(this.testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus maxSteps={2} step={1} />
        </ProgressBlock>

        <Formik
          validateOnMount
          initialValues={{
            ...CovidTestDateQuestion.initialFormValues(test),
            ...CovidTestMechanismQuestion.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
            ...CovidTestInvitedQuestion.initialFormValues(test),
            ...CovidTestLocationQuestion.initialFormValues(test),
            ...CovidTestIsRapidQuestion.initialFormValues(test),
          }}
          onSubmit={(values: ICovidTestData) => {
            return this.handleAction(values);
          }}
          validationSchema={registerSchema}
        >
          {(props) => {
            return (
              <FormWrapper hasRequiredFields>
                <View style={{ marginHorizontal: 16 }}>
                  <CovidTestDateQuestion formikProps={props as FormikProps<ICovidTestDateData>} test={test} />
                  <CovidTestMechanismQuestion formikProps={props as FormikProps<ICovidTestMechanismData>} test={test} />
                  <CovidTestLocationQuestion formikProps={props as FormikProps<ICovidTestLocationData>} test={test} />
                  <CovidTestResultQuestion formikProps={props as FormikProps<ICovidTestResultData>} test={test} />
                  <CovidTestIsRapidQuestion formikProps={props as FormikProps<ICovidTestIsRapidData>} test={test} />
                  <CovidTestInvitedQuestion formikProps={props as FormikProps<ICovidTestInvitedData>} test={test} />

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
                </View>

                <BrandedButton
                  enabled={!this.state.submitting && props.isValid}
                  onPress={props.handleSubmit}
                  testID="button-submit"
                >
                  {i18n.t(this.testId ? 'covid-test.update-test' : 'covid-test.add-test')}
                </BrandedButton>
              </FormWrapper>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}
