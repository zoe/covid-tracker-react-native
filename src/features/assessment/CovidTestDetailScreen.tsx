import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { Form, Item, Label, Text, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import CalendarPicker from '../../components/CalendarPicker';
import DropdownField from '../../components/DropdownField';
import { GenericTextField } from '../../components/GenericTextField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { FieldWrapper, Header, isAndroid, ProgressBlock, screenWidth } from '../../components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import CovidTestService from '../../core/user/CovidTestService';
import { CovidTest } from '../../core/user/dto/CovidTestContracts';
import i18n from '../../locale/i18n';
import Navigator from '../Navigation';
import { ScreenParamList } from '../ScreenParamList';
import { IOption } from '../patient/YourWorkScreen/helpers';

interface CovidTestData {
  knowsDateOfTest: string; // only for ux logic
  mechanism: string;
  mechanismSpecify: string;
  result: string;
}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTestDetail'>;
  route: RouteProp<ScreenParamList, 'CovidTestDetail'>;
};

type State = {
  errorMessage: string;
  dateTakenSpecific: Date;
  today: Date;
  showDatePicker: boolean;
  showRangePicker: boolean;
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
};

const now = moment().add(moment().utcOffset(), 'minutes').toDate();

export default class CovidTestDetailScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    const updatingTest = props.route.params.test;
    const dateTakenSpecific = updatingTest?.date_taken_specific;
    const dateTakenBetweenStart = updatingTest?.date_taken_between_start;
    const dateTakenBetweenEnd = updatingTest?.date_taken_between_end;
    const initialState: State = {
      errorMessage: '',
      dateTakenSpecific: dateTakenSpecific ? moment(dateTakenSpecific).toDate() : now,
      today: now,
      showDatePicker: !!dateTakenSpecific,
      showRangePicker: !dateTakenSpecific,
      dateTakenBetweenStart: dateTakenBetweenStart ? moment(dateTakenBetweenStart).toDate() : undefined,
      dateTakenBetweenEnd: dateTakenBetweenEnd ? moment(dateTakenBetweenEnd).toDate() : undefined,
    };
    this.state = initialState;
  }

  setTestDate = (selectedDate: Moment) => {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');
    this.setState({
      dateTakenSpecific: selectedDate.toDate(),
      showDatePicker: false,
    });
  };

  setRangeTestDates = (selectedDate: Moment, type: string) => {
    const offset = selectedDate.utcOffset();
    selectedDate.add(offset, 'minutes');

    if (type === 'END_DATE') {
      this.setState({
        dateTakenBetweenEnd: selectedDate.toDate(),
        showRangePicker: false,
      });
    } else {
      this.setState({
        dateTakenBetweenStart: selectedDate.toDate(),
        dateTakenBetweenEnd: undefined,
      });
    }
  };

  formatDateToPost = (date: Date) => moment(date).format('YYYY-MM-DD');

  handleAction(formData: CovidTestData) {
    const { currentPatient, test } = this.props.route.params;
    const patientId = currentPatient.patientId;
    const covidTestService = new CovidTestService();

    if (this.state.dateTakenSpecific || (!!this.state.dateTakenBetweenStart && !!this.state.dateTakenBetweenStart)) {
      let postTest = {
        patient: patientId,
        ...(formData.result && { result: formData.result }),
        ...(formData.knowsDateOfTest === 'yes' && {
          date_taken_specific: this.formatDateToPost(this.state.dateTakenSpecific),
        }),
        ...(formData.mechanism === 'other' && { mechanism: formData.mechanismSpecify }),
        ...(formData.mechanism !== 'other' && { mechanism: formData.mechanism }),
        // TODO: Pass two dates back to the server
      } as Partial<CovidTest>;
      if (formData.knowsDateOfTest === 'no' && this.state.dateTakenBetweenStart && this.state.dateTakenBetweenEnd) {
        postTest = {
          ...postTest,
          date_taken_between_start: this.formatDateToPost(this.state.dateTakenBetweenStart),
          date_taken_between_end: this.formatDateToPost(this.state.dateTakenBetweenEnd),
        };
      }

      if (test?.id) {
        covidTestService
          .updateTest(test.id, postTest)
          .then((response) => {
            this.props.navigation.goBack();
          })
          .catch((err) => {
            this.setState({ errorMessage: i18n.t('something-went-wrong') });
          });
      } else {
        covidTestService
          .addTest(postTest)
          .then((response) => {
            this.props.navigation.goBack();
          })
          .catch(() => {
            this.setState({ errorMessage: i18n.t('something-went-wrong') });
          });
      }
    } else {
      this.setState({ errorMessage: i18n.t('covid-test.required-date') });
    }
  }

  render() {
    const { currentPatient, test } = this.props.route.params;
    const testId = test?.id;
    const dateTakenSpecific = test?.date_taken_specific;
    const initialFormValues = {
      knowsDateOfTest: dateTakenSpecific ? 'yes' : 'no', // only for ux logic
      mechanism: test?.mechanism ? test.mechanism : '',
      mechanismSpecify: '',
      result: test?.result ? test.result : '',
    };

    const registerSchema = Yup.object().shape({
      mechanism: Yup.string().when('mechanismSpecify', {
        is: (mechanismSpecify) => {
          return !mechanismSpecify;
        },
        then: Yup.string().required(i18n.t('covid-test.required-mechanism')),
      }),
      mechanismSpecify: Yup.string(),
      result: Yup.string().required(i18n.t('covid-test.required-result')),
    });

    const androidOption = isAndroid && {
      label: i18n.t('choose-one-of-these-options'),
      value: '',
    };

    const mechanismItems = [
      androidOption,
      { label: i18n.t('covid-test.picker-nose-swab'), value: 'nose_swab' },
      { label: i18n.t('covid-test.picker-throat-swab'), value: 'throat_swab' },
      { label: i18n.t('covid-test.picker-saliva-sample'), value: 'spit_tube' },
      { label: i18n.t('covid-test.picker-blood-sample'), value: 'blood_sample' },
      { label: i18n.t('covid-test.picker-other'), value: 'other' },
    ].filter(Boolean) as IOption[];

    const resultItems = [
      androidOption,
      { label: i18n.t('picker-no'), value: 'negative' },
      { label: i18n.t('picker-yes'), value: 'positive' },
      { label: i18n.t('covid-test.picker-test-failed'), value: 'failed' },
      { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
    ].filter(Boolean) as IOption[];

    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>
            {i18n.t(testId ? 'covid-test.page-title-detail-update' : 'covid-test.page-title-detail-add')}
          </HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={2} maxSteps={5} />
        </ProgressBlock>

        <Formik
          initialValues={initialFormValues}
          validationSchema={registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleAction(values);
          }}>
          {(props) => {
            return (
              <Form>
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
                        <CalendarPicker
                          onDateChange={this.setTestDate}
                          initialDate={this.state.dateTakenSpecific}
                          selectedStartDate={this.state.dateTakenSpecific}
                        />
                      ) : (
                        <ClickableText onPress={() => this.setState({ showDatePicker: true })}>
                          {moment(this.state.dateTakenSpecific).format('Do of MMMM YYYY')}
                        </ClickableText>
                      )}
                    </Item>
                  </FieldWrapper>
                )}

                {props.values.knowsDateOfTest === 'no' && (
                  <FieldWrapper>
                    <Item stackedLabel>
                      <Label style={styles.labelStyle}>{i18n.t('covid-test.question-date-test-occurred-guess')}</Label>

                      {this.state.showRangePicker ? (
                        <CalendarPicker
                          allowRangeSelection
                          // @ts-ignore Incorrect types on onDateChange, ignore it.
                          onDateChange={this.setRangeTestDates}
                          initialDate={this.state.dateTakenBetweenStart}
                          selectedStartDate={this.state.dateTakenBetweenStart}
                          selectedEndDate={this.state.dateTakenBetweenEnd}
                        />
                      ) : (
                        <ClickableText onPress={() => this.setState({ showRangePicker: true })}>
                          {this.state.dateTakenBetweenStart && this.state.dateTakenBetweenEnd ? (
                            <>
                              {'Between '}
                              {moment(this.state.dateTakenBetweenStart).format('Do of MMMM')} {' and '}
                              {moment(this.state.dateTakenBetweenEnd).format('Do of MMMM')}
                            </>
                          ) : (
                            <Text>{i18n.t('covid-test.question-select-a-date-range')}</Text>
                          )}
                        </ClickableText>
                      )}
                    </Item>
                  </FieldWrapper>
                )}

                <DropdownField
                  selectedValue={props.values.mechanism}
                  onValueChange={props.handleChange('mechanism')}
                  label={i18n.t('covid-test.question-mechanism')}
                  items={mechanismItems}
                />

                {props.values.mechanism === 'other' && (
                  <GenericTextField
                    formikProps={props}
                    label={i18n.t('covid-test.question-mechanism-specify')}
                    name="mechanismSpecify"
                  />
                )}

                <DropdownField
                  selectedValue={props.values.result}
                  onValueChange={props.handleChange('result')}
                  label={i18n.t('covid-test.question-result')}
                  items={resultItems}
                />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && <ValidationErrors errors={props.errors as string[]} />}

                <BrandedButton onPress={props.handleSubmit}>
                  <Text>{i18n.t(testId ? 'covid-test.update-test' : 'covid-test.add-test')}</Text>
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
    marginBottom: 30,
  },
});
