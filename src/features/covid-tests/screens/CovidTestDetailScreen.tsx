import { BrandedButton, DeleteButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import Analytics, { events } from '@covid/core/Analytics';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { ECovidTestType, TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions } from '@covid/core/user/dto/UserAPIContracts';
import {
  CovidTestDateQuestion,
  CovidTestInvitedQuestion,
  CovidTestIsRapidQuestion,
  CovidTestLocationQuestion,
  CovidTestMechanismQuestion,
  CovidTestResultQuestion,
  ICovidTestDateData,
  ICovidTestInvitedData,
  ICovidTestInvitedFormikData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismData,
  ICovidTestMechanismFormikData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/questions';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { sizes, styling } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Alert } from 'react-native';
import * as Yup from 'yup';

interface ICovidTestData
  extends ICovidTestDateData,
    ICovidTestMechanismData,
    ICovidTestResultData,
    ICovidTestLocationData,
    ICovidTestInvitedData,
    ICovidTestIsRapidData {}

type TCovidProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestDetail'>;
  route: RouteProp<TScreenParamList, 'CovidTestDetail'>;
};

export default function CovidTestDetailScreen(props: TCovidProps) {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const testId = props.route.params?.test?.id;

  function submitCovidTest(infos: Partial<TCovidTest>) {
    if (testId) {
      if (
        (props.route.params?.test?.result !== 'positive' || props.route.params?.test?.anti_n !== 'positive') &&
        (infos.result === 'positive' || infos.anti_n === 'positive') &&
        props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
      ) {
        setSubmitting(false);
        infos.id = testId;
        assessmentCoordinator.goToTestConfirm(infos as TCovidTest);
      } else {
        covidTestService
          .updateTest(testId, infos)
          .then(() => {
            NavigatorService.navigate('CovidTestList', {
              assessmentData: props.route.params?.assessmentData,
              is_rapid_test: infos.is_rapid_test,
              mechanism: infos.mechanism,
            });
          })
          .catch(() => {
            setErrorMessage(i18n.t('something-went-wrong'));
            setSubmitting(false);
          });
      }
    } else if (
      (infos.result === 'positive' || infos.anti_n === 'positive') &&
      props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
    ) {
      setSubmitting(false);
      assessmentCoordinator.goToTestConfirm(infos as TCovidTest);
    } else {
      covidTestService
        .addTest(infos)
        .then(() => {
          NavigatorService.navigate('CovidTestList', {
            assessmentData: props.route.params?.assessmentData,
            is_rapid_test: infos.is_rapid_test,
            mechanism: infos.mechanism,
          });
        })
        .catch(() => {
          setErrorMessage(i18n.t('something-went-wrong'));
          setSubmitting(false);
        });
    }
  }

  function onSubmit(values: ICovidTestData) {
    if (!submitting) {
      setSubmitting(true);
      if (!values.useApproximateDate && !values.dateTakenSpecific) {
        setErrorMessage(i18n.t('covid-test.required-date'));
        setSubmitting(false);
        return;
      }

      if (
        values.useApproximateDate &&
        (values.dateTakenBetweenStart === undefined || values.dateTakenBetweenEnd === undefined)
      ) {
        setErrorMessage(i18n.t('covid-test.required-dates'));
        setSubmitting(false);
        return;
      }

      const infos = {
        patient: assessmentCoordinator.assessmentData?.patientData?.patientId,
        type: ECovidTestType.Generic,
        ...CovidTestDateQuestion.createDTO(values),
        ...CovidTestIsRapidQuestion.createDTO(values),
        ...CovidTestMechanismQuestion.createDTO(values),
        ...CovidTestInvitedQuestion.createDTO(values),
        ...CovidTestLocationQuestion.createDTO(values),
        ...CovidTestResultQuestion.createDTO(values), // Leave as last due to conditional overwriting depending on antibody test type
      } as Partial<TCovidTest>;

      submitCovidTest(infos);
    }
  }

  async function deleteTest() {
    await covidTestService.deleteTest(testId!);
    props.navigation.goBack();
    Analytics.track(events.DELETE_COVID_TEST);
  }

  async function promptDeleteTest() {
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
            await deleteTest();
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }

  const test = props.route.params?.test;
  const isV1Test = test?.version[0] === '1';

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
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="covid-test-detail-screen"
    >
      <HeaderText style={{ marginBottom: sizes.xs }}>
        {testId ? i18n.t('covid-test.page-title-detail-update') : i18n.t('covid-test.page-title-detail-add')}
      </HeaderText>

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
        onSubmit={onSubmit}
        validationSchema={registerSchema}
      >
        {(formikProps) => {
          return (
            <Form hasRequiredFields>
              <CovidTestMechanismQuestion
                formikProps={formikProps as unknown as FormikProps<ICovidTestMechanismFormikData>}
                test={test}
              />

              <CovidTestDateQuestion
                formikProps={formikProps as unknown as FormikProps<ICovidTestDateData>}
                test={test}
              />
              {test !== undefined && test?.location ? (
                <CovidTestLocationQuestion
                  formikProps={formikProps as unknown as FormikProps<ICovidTestLocationData>}
                  test={test}
                />
              ) : null}
              <CovidTestResultQuestion
                formikProps={formikProps as unknown as FormikProps<ICovidTestResultData>}
                test={test}
              />
              {test !== undefined && test?.is_rapid_test !== null && isV1Test ? (
                <CovidTestIsRapidQuestion
                  formikProps={formikProps as unknown as FormikProps<ICovidTestIsRapidData>}
                  test={test}
                />
              ) : null}

              {formikProps.values.mechanism === ECovidTestMechanismOptions.PCR ? (
                <CovidTestInvitedQuestion
                  formikProps={formikProps as unknown as FormikProps<ICovidTestInvitedFormikData>}
                  test={test}
                />
              ) : null}

              <ErrorText>{errorMessage}</ErrorText>

              {!!Object.keys(formikProps.errors).length && formikProps.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} />
              ) : null}

              {testId ? <DeleteButton onPress={promptDeleteTest} /> : null}

              <BrandedButton
                enabled={!submitting && formikProps.isValid}
                onPress={formikProps.handleSubmit}
                style={styling.marginTop}
                testID="button-submit"
              >
                {testId ? i18n.t('covid-test.update-test') : i18n.t('covid-test.add-test')}
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
}
