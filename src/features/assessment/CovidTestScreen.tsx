import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { Form, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import CalendarPicker from 'react-native-calendar-picker';

import ProgressStatus from '../../components/ProgressStatus';
import Screen, { FieldWrapper, Header, isAndroid, ProgressBlock } from '../../components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';
import { IOption } from '../patient/YourWorkScreen/helpers';

const initialFormValues = {
  covidTestResult: '',
  hasCovidPositive: '',
  hasCovidTest: 'no',
  knowsDateOfTest: 'yes', // only for ux logic
};

interface CovidTestData {
  covidTestResult: string;
  hasCovidPositive: string;
  hasCovidTest: string;
  knowsDateOfTest: string; // only for ux logic
}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
  certainTestDate: Date;
  today: Date;
  showDatePicker: boolean;
  showRangePicker: boolean;
  rangeTestDateStart: Date | null;
  rangeTestDateEnd: Date | null;
};

const now = moment().add(moment().utcOffset(), 'minutes').toDate();

const initialState: State = {
  errorMessage: '',
  certainTestDate: now,
  today: now,
  showDatePicker: false,
  showRangePicker: false,
  rangeTestDateStart: null,
  rangeTestDateEnd: null,
};

export default class CovidTestScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
    this.setTestDate = this.setTestDate.bind(this);
    this.setRangeTestDates = this.setRangeTestDates.bind(this);
  }

  setTestDate = (selectedDate: Moment) => {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    this.setState({
      certainTestDate: selectedDate.toDate(),
      showDatePicker: false,
    });
  };

  setRangeTestDates = (selectedDate: Moment, type: string) => {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');

    if (type === 'END_DATE') {
      this.setState({
        rangeTestDateEnd: selectedDate.toDate(),
        showRangePicker: false,
      });
    } else {
      this.setState({
        rangeTestDateStart: selectedDate.toDate(),
        rangeTestDateEnd: null,
      });
    }
  };

  handleUpdateHealth(formData: CovidTestData) {
    const { currentPatient, assessmentId } = this.props.route.params;
    const patientId = currentPatient.patientId;

    const userService = new UserService();
    const hadCovidTest = formData.hasCovidTest === 'yes';
    const receivedTestResults = formData.hasCovidPositive === 'yes' || formData.hasCovidPositive === 'no';
    const dateToPost = moment(this.state.certainTestDate).format('YYYY-MM-DD');

    const assessment = {
      patient: patientId,
      had_covid_test: formData.hasCovidTest === 'yes',
      ...(hadCovidTest && { tested_covid_positive: formData.hasCovidPositive }),
      ...(hadCovidTest &&
        receivedTestResults &&
        formData.knowsDateOfTest === 'yes' && { date_test_occurred: dateToPost }),
      // TODO: Pass two dates back to the server
      // ...(hadCovidTest &&
      //   receivedTestResults &&
      //   formData.knowsDateOfTest === 'no' && { ),
    } as Partial<AssessmentInfosRequest>;

    if (assessmentId == null) {
      userService
        .addAssessment(assessment)
        .then((response) => {
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
          this.props.navigation.navigate('HowYouFeel', { currentPatient, assessmentId });
        })
        .catch((err) => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
        });
    }
  }

  render() {
    const currentPatient = this.props.route.params.currentPatient;

    const registerSchema = Yup.object().shape({
      hasCovidTest: Yup.string(),
      hasCovidPositive: Yup.string().when('hasCovidTest', {
        is: 'yes',
        then: Yup.string().required(),
      }),
      knowsDateOfTest: Yup.string().when(['hasCovidTest', 'hasCovidPositive'], {
        is: (hasNewTest, hasCovidPositive) => {
          return hasNewTest === 'yes' && (hasCovidPositive === 'yes' || hasCovidPositive === 'no');
        },
        then: Yup.string().required(),
      }),
    });

    const androidOption = isAndroid && {
      label: i18n.t('choose-one-of-these-options'),
      value: '',
    };

    const hasCovidPositiveItems = [
      androidOption,
      { label: i18n.t('picker-no'), value: 'no' },
      { label: i18n.t('picker-yes'), value: 'yes' },
      { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
    ].filter(Boolean) as IOption[];

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
          validationSchema={registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleUpdateHealth(values);
          }}>
          {(props) => {
            return (
              <Form>
                <DropdownField
                  placeholder="hasCovidTest"
                  selectedValue={props.values.hasCovidTest}
                  onValueChange={props.handleChange('hasCovidTest')}
                  label={i18n.t('covid-test.question-has-covid-test')}
                />

                {props.values.hasCovidTest === 'yes' && (
                  <DropdownField
                    selectedValue={props.values.hasCovidPositive}
                    onValueChange={props.handleChange('hasCovidPositive')}
                    label={i18n.t('covid-test.question-tested-covid-positive')}
                    items={hasCovidPositiveItems}
                  />
                )}

                {props.values.hasCovidTest === 'yes' &&
                  (props.values.hasCovidPositive === 'yes' || props.values.hasCovidPositive === 'no') && (
                    <>
                      <DropdownField
                        selectedValue={props.values.knowsDateOfTest}
                        onValueChange={props.handleChange('knowsDateOfTest')}
                        label={i18n.t('covid-test.question-knows-date-of-test')}
                      />

                      {props.values.knowsDateOfTest === 'yes' && (
                        <FieldWrapper>
                          <Item stackedLabel>
                            <Label style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred')}</Label>

                            {this.state.showDatePicker ? (
                              <CalendarPicker onDateChange={this.setTestDate} />
                            ) : (
                              <ClickableText onPress={() => this.setState({ showDatePicker: true })}>
                                {moment(this.state.certainTestDate).format('l')}
                              </ClickableText>
                            )}
                          </Item>
                        </FieldWrapper>
                      )}

                      {props.values.knowsDateOfTest === 'no' && (
                        <>
                          <Label style={styles.labelStyle}>
                            {i18n.t('covid-test.question-date-test-occurred-guess')}
                          </Label>

                          {this.state.showRangePicker ? (
                            <CalendarPicker
                              startFromMonday={true}
                              allowRangeSelection={true}
                              onDateChange={this.setRangeTestDates}
                            />
                          ) : (
                            <ClickableText onPress={() => this.setState({ showRangePicker: true })}>
                              {this.state.rangeTestDateStart && this.state.rangeTestDateEnd ? (
                                <>
                                  {'Between '}
                                  {moment(this.state.rangeTestDateStart).format('l')} {' and '}
                                  {moment(this.state.rangeTestDateEnd).format('l')}
                                </>
                              ) : (
                                <Text>Select a range</Text>
                              )}
                            </ClickableText>
                          )}
                        </>
                      )}
                    </>
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
