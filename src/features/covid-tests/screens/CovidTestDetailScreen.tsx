import { BrandedButton, DeleteButton } from '@covid/components';
import { Form } from '@covid/components/Form';
import { Screen } from '@covid/components/Screen';
import { ErrorText, HeaderText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
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
  ICovidTestInvitedFormikData,
  ICovidTestIsRapidData,
  ICovidTestLocationData,
  ICovidTestMechanismFormikData,
  ICovidTestResultData,
} from '@covid/features/covid-tests/questions';
import { ICovidTestData } from '@covid/features/covid-tests/types';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes, styling } from '@covid/themes';
import Analytics, { events } from '@health-study/analytics';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik, FormikProps } from 'formik';
import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import * as Yup from 'yup';

type TCovidProps = {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestDetail'>;
  route: RouteProp<TScreenParamList, 'CovidTestDetail'>;
};

export default function CovidTestDetailScreen(props: TCovidProps) {
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const testId = props.route.params?.test?.id;
  const test = props.route.params?.test;
  const patientId = assessmentCoordinator.assessmentData?.patientData?.patientId;

  const onSubmit = React.useCallback(
    async (values: ICovidTestData) => {
      if (submitting) {
        return;
      }

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
        patient: patientId,
        type: ECovidTestType.Generic,
        ...CovidTestDateQuestion.createDTO(values),
        ...CovidTestIsRapidQuestion.createDTO(values),
        ...CovidTestMechanismQuestion.createDTO(values),
        ...CovidTestInvitedQuestion.createDTO(values),
        ...CovidTestLocationQuestion.createDTO(values),
        ...CovidTestResultQuestion.createDTO(values), // Leave as last due to conditional overwriting depending on antibody test type
      } as Partial<TCovidTest>;

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
          try {
            await covidTestService.updateTest(testId, infos);

            NavigatorService.navigate('CovidTestList', {
              assessmentData: props.route.params?.assessmentData,
              is_rapid_test: infos.is_rapid_test,
              mechanism: infos.mechanism,
            });
          } catch (_) {
            setErrorMessage(i18n.t('something-went-wrong'));
          }
          setSubmitting(false);
        }
      } else if (
        (infos.result === 'positive' || infos.anti_n === 'positive') &&
        props.route.params?.assessmentData?.patientData?.patientState?.hasSchoolGroup
      ) {
        setSubmitting(false);
        assessmentCoordinator.goToTestConfirm(infos as TCovidTest);
      } else {
        try {
          await covidTestService.addTest(infos);

          NavigatorService.navigate('CovidTestList', {
            assessmentData: props.route.params?.assessmentData,
            is_rapid_test: infos.is_rapid_test,
            mechanism: infos.mechanism,
          });
        } catch (_) {
          setErrorMessage(i18n.t('something-went-wrong'));
        }
        setSubmitting(false);
      }
    },
    [
      patientId,
      props.route.params?.assessmentData,
      props.route.params?.test?.anti_n,
      props.route.params?.test?.result,
      submitting,
      testId,
    ],
  );

  const promptDeleteTest = React.useCallback(() => {
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
            await covidTestService.deleteTest(testId!);
            props.navigation.goBack();
            Analytics.track(events.DELETE_COVID_TEST);
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  }, [testId, props.navigation]);

  const validationSchema = React.useMemo(
    () =>
      Yup.object()
        .shape({})
        .concat(CovidTestDateQuestion.createValidationSchema())
        .concat(CovidTestMechanismQuestion.createValidationSchema())
        .concat(CovidTestResultQuestion.createValidationSchema())
        .concat(CovidTestInvitedQuestion.createValidationSchema())
        .concat(CovidTestLocationQuestion.createValidationSchema())
        .concat(CovidTestIsRapidQuestion.createValidationSchema()),
    [],
  );

  const initialValues = React.useMemo(
    () => ({
      ...CovidTestDateQuestion.getInitialFormValues(test),
      ...CovidTestMechanismQuestion.getInitialFormValues(test),
      ...CovidTestResultQuestion.getInitialFormValues(test),
      ...CovidTestInvitedQuestion.getInitialFormValues(test),
      ...CovidTestLocationQuestion.getInitialFormValues(test),
      ...CovidTestIsRapidQuestion.getInitialFormValues(test),
    }),
    [test],
  );

  const renderFormik = React.useCallback(
    (formikProps) => {
      return (
        <Form hasRequiredFields>
          <CovidTestMechanismQuestion
            formikProps={formikProps as unknown as FormikProps<ICovidTestMechanismFormikData>}
            test={test}
          />

          <CovidTestDateQuestion
            dateChangeCallback={formikProps.validateForm}
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

          {test !== undefined && test?.is_rapid_test !== null && test?.version[0] === '1' ? (
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
    },
    [errorMessage, promptDeleteTest, submitting, test, testId],
  );

  return (
    <Screen
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="covid-test-detail-screen"
    >
      <HeaderText style={styles.marginBottom}>
        {testId ? i18n.t('covid-test.page-title-detail-update') : i18n.t('covid-test.page-title-detail-add')}
      </HeaderText>

      <Formik validateOnMount initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {renderFormik}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: sizes.xs,
  },
});
