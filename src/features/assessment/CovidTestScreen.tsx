import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Text, DatePicker, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { Platform, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { FieldWrapper, Header, isAndroid, ProgressBlock } from '../../components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import moment from 'moment';
import { GenericTextField } from '../../components/GenericTextField';

const initialFormValues = {
  covidTestResult: 'negative',

  everHadCovidTest: 'no', //Patient

  hadNewCovidTest: 'no',
  dateTestOccurredGuess: null,
  covidTestMechanism: '',
  covidTestMechanismSpecify: '',
  covidTestResultStatus: '',

  knowsDateOfTest: 'no', // only for ux logic
};

interface CovidTestData {
  covidTestResult: string;
  covidTestResultStatus: string;

  everHadCovidTest: string;
  hadNewCovidTest: string;
  dateTestOccurredGuess: Date | null;
  covidTestMechanism: string;
  covidTestMechanismSpecify: string;

  knowsDateOfTest: string; // only for ux logic
}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
  date: Date | null;
};

const initialState: State = {
  errorMessage: '',
  date: new Date(),
};

export default class CovidTestScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    everHadCovidTest: Yup.string(),
    covidTestResult: Yup.string(),
    covidTestResultStatus: Yup.string(),
  });

  handleUpdatePatientEverHadCovid(patientId: string, formData: CovidTestData) {
    const userService = new UserService();
    // Update patient data with has ever had covid test, if answered.
    if (patientId && (formData.hadNewCovidTest === 'yes' || formData.everHadCovidTest === 'yes')) {
      // Deliberately fire and forget.
      userService
        .updatePatient(patientId, {
          ever_had_covid_test: true,
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    }
  }

  setDate = (newDate: Date) => {
    this.setState({ date: newDate });
  };

  handleUpdateHealth(formData: CovidTestData) {
    const { currentPatient, assessmentId } = this.props.route.params;
    const patientId = currentPatient.patientId;
    const { isWaitingForCovidTestResult } = currentPatient;

    const userService = new UserService();

    const everHadOrNewTest = formData.everHadCovidTest === 'yes' || formData.hadNewCovidTest === 'yes';
    const storeTestResultStatus = everHadOrNewTest || isWaitingForCovidTestResult;

    const assessment = {
      patient: patientId,
      had_new_covid_test: formData.hadNewCovidTest === 'yes',
      ...(storeTestResultStatus && { covid_test_result_status: formData.covidTestResultStatus }),
      ...(formData.covidTestResultStatus === 'received' && { covid_test_result: formData.covidTestResult }),
      ...(everHadOrNewTest && formData.knowsDateOfTest === 'yes' && { date_test_occurred: this.state.date }),
      ...(everHadOrNewTest &&
        formData.knowsDateOfTest === 'no' && { date_test_occurred_guess: formData.dateTestOccurredGuess }),
      ...(everHadOrNewTest &&
        formData.covidTestMechanism !== 'other' && { covid_test_mechanism: formData.covidTestMechanism }),
      ...(everHadOrNewTest &&
        formData.covidTestMechanism === 'other' && { covid_test_mechanism: formData.covidTestMechanismSpecify }),
    } as Partial<AssessmentInfosRequest>;

    if (assessmentId == null) {
      userService
        .addAssessment(assessment)
        .then((response) => {
          this.handleUpdatePatientEverHadCovid(patientId, formData);
          this.props.navigation.setParams({ assessmentId: response.data.id });
          this.props.navigation.navigate('HowYouFeel', { currentPatient, assessmentId: response.data.id });
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    } else {
      userService
        .updateAssessment(assessmentId, assessment)
        .then((response) => {
          this.handleUpdatePatientEverHadCovid(patientId, formData);
          this.props.navigation.navigate('HowYouFeel', { currentPatient, assessmentId });
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    }
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;
    const { isWaitingForCovidTestResult, everHadCovidTest } = currentPatient;

    const androidOption = isAndroid && {
      label: i18n.t('choose-one-of-these-options'),
      value: '',
    };

    const dateToday = moment().toDate();

    const covidTestResultItems = [
      androidOption,
      { label: 'No', value: 'negative' },
      { label: 'Yes', value: 'positive' },
      { label: i18n.t('covid-test.picker-test-failed'), value: 'test_failed' },
    ];

    const covidTestResultStatusItems = [
      androidOption,
      { label: 'Yes', value: 'received' },
      { label: 'No', value: 'waiting' },
    ];

    if (isWaitingForCovidTestResult)
      covidTestResultStatusItems.push({
        label: i18n.t('covid-test.picker-never-had-test'),
        value: 'never_had_test',
      });

    const dateTestOccurredGuessItems = [
      androidOption,
      { label: i18n.t('covid-test.picker-less-than-7-days-ago'), value: 'less_than_7_days_ago' },
      { label: i18n.t('covid-test.picker-over-1-week-ago'), value: 'over_1_week_ago' },
      { label: i18n.t('covid-test.picker-over-2-week-ago'), value: 'over_2_week_ago' },
      { label: i18n.t('covid-test.picker-over-3-week-ago'), value: 'over_3_week_ago' },
      { label: i18n.t('covid-test.picker-over-1-month-ago'), value: 'over_1_month_ago' },
    ];

    const covidTestMechanismItems = [
      androidOption,
      { label: i18n.t('covid-test.picker-nose-swab'), value: 'nose_swab' },
      { label: i18n.t('covid-test.picker-throat-swab'), value: 'throat_swab' },
      { label: i18n.t('covid-test.picker-saliva-sample'), value: 'spit_tube' },
      { label: i18n.t('covid-test.picker-blood-sample'), value: 'blood_sample' },
      { label: i18n.t('covid-test.picker-other'), value: 'other' },
    ];

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('covid-test.page-title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={this.registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleUpdateHealth(values);
          }}>
          {(props) => {
            return (
              <Form>
                {!isWaitingForCovidTestResult && (
                  <>
                    {everHadCovidTest ? (
                      <DropdownField
                        selectedValue={props.values.hadNewCovidTest}
                        onValueChange={props.handleChange('hadNewCovidTest')}
                        label={i18n.t('covid-test.question-had-new-covid-test')}
                      />
                    ) : (
                      <DropdownField
                        selectedValue={props.values.everHadCovidTest}
                        onValueChange={props.handleChange('everHadCovidTest')}
                        label={i18n.t('covid-test.question-ever-had-covid-test')}
                      />
                    )}

                    {(props.values.hadNewCovidTest === 'yes' || props.values.everHadCovidTest === 'yes') && (
                      <>
                        <DropdownField
                          selectedValue={props.values.knowsDateOfTest}
                          onValueChange={props.handleChange('knowsDateOfTest')}
                          label={i18n.t('covid-test.question-knows-date-of-test')}
                        />

                        {props.values.knowsDateOfTest === 'yes' && (
                          <FieldWrapper>
                            <Item stackedLabel>
                              <Label style={styles.labelStyle}>
                                {i18n.t('covid-test.question-date-test-occurred')}
                              </Label>
                              <DatePicker
                                defaultDate={dateToday}
                                minimumDate={new Date(2020, 0, 1)}
                                maximumDate={dateToday}
                                locale={'en'}
                                modalTransparent={false}
                                animationType={'fade'}
                                onDateChange={this.setDate}
                                timeZoneOffsetInMinutes={60}
                                disabled={false}
                              />
                            </Item>
                          </FieldWrapper>
                        )}

                        {props.values.knowsDateOfTest === 'no' && (
                          <DropdownField
                            selectedValue={props.values.dateTestOccurredGuess}
                            onValueChange={props.handleChange('dateTestOccurredGuess')}
                            label={i18n.t('covid-test.question-date-test-occurred-guess')}
                            items={dateTestOccurredGuessItems}
                          />
                        )}

                        <DropdownField
                          selectedValue={props.values.covidTestMechanism}
                          onValueChange={props.handleChange('covidTestMechanism')}
                          label={i18n.t('covid-test.question-covid-test-mechanism')}
                          items={covidTestMechanismItems}
                        />

                        {props.values.covidTestMechanism === 'other' && (
                          <GenericTextField
                            formikProps={props}
                            label={i18n.t('covid-test.question-covid-test-mechanism-specify')}
                            name="covidTestMechanismSpecify"
                          />
                        )}
                      </>
                    )}
                  </>
                )}

                {isWaitingForCovidTestResult ||
                  ((props.values.hadNewCovidTest === 'yes' || props.values.everHadCovidTest === 'yes') && (
                    <DropdownField
                      selectedValue={props.values.covidTestResultStatus}
                      onValueChange={props.handleChange('covidTestResultStatus')}
                      label={i18n.t(
                        isWaitingForCovidTestResult
                          ? 'covid-test.question-covid-test-result-status-waiting'
                          : 'covid-test.question-covid-test-result-status'
                      )}
                      items={covidTestResultStatusItems}
                    />
                  ))}

                {props.values.covidTestResultStatus === 'received' &&
                  (props.values.hadNewCovidTest === 'yes' || props.values.everHadCovidTest === 'yes') && (
                    <DropdownField
                      selectedValue={props.values.covidTestResult}
                      onValueChange={props.handleChange('covidTestResult')}
                      label={i18n.t(
                        isWaitingForCovidTestResult
                          ? 'covid-test.question-tested-covid-positive-waiting'
                          : 'covid-test.question-tested-covid-positive'
                      )}
                      items={covidTestResultItems}
                    />
                  )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && <ValidationErrors errors={props.errors as string[]} />}

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t('next-question')}</Text>
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    marginBottom: 10,
  },
});
