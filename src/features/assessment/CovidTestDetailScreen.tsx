import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import moment, { Moment } from 'moment';
import { Form, Item, Label, Text } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { colors, fontStyles } from '@theme';
import CalendarPicker from '@covid/components/CalendarPicker';
import DropdownField from '@covid/components/DropdownField';
import { GenericTextField } from '@covid/components/GenericTextField';
import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { FieldWrapper, Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import CovidTestService from '@covid/core/user/CovidTestService';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { CovidTestDateQuestion } from '@covid/features/assessment/fields/CovidTestDateQuestion';
import { CovidTestMechanismQuestionV1 } from '@covid/features/assessment/fields/CovidTestMechanismQuesionV1';
import { CovidTestResultQuestion } from '@covid/features/assessment/fields/CovidTestResultQuestion';

import { ScreenParamList } from '../ScreenParamList';

export interface CovidTestData {
  knowsDateOfTest: string; // only for ux logic
  dateTakenBetweenStart: Date | undefined;
  dateTakenBetweenEnd: Date | undefined;
  dateTakenSpecific: Date | undefined;
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
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class CovidTestDetailScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  submitCovidTest(infos: Partial<CovidTest>) {
    const { test } = this.props.route.params;
    const covidTestService = new CovidTestService();
    if (test?.id) {
      covidTestService
        .updateTest(test.id, infos)
        .then(() => {
          AssessmentCoordinator.gotoNextScreen(this.props.route.name);
        })
        .catch(() => {
          this.setState({ errorMessage: i18n.t('something-went-wrong') });
          this.setState({ submitting: false });
        });
    } else {
      covidTestService
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

  handleAction(formData: CovidTestData) {
    if (!this.state.submitting) {
      this.setState({ submitting: true });

      console.log(formData);

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
        patient: AssessmentCoordinator.assessmentData.currentPatient.patientId,
        ...CovidTestDateQuestion.createDTO(formData),
        ...CovidTestMechanismQuestionV1.createDTO(formData),
        ...CovidTestResultQuestion.createDTO(formData),
      } as Partial<CovidTest>;

      this.submitCovidTest(infos);
    }
  }

  render() {
    const { currentPatient } = AssessmentCoordinator.assessmentData;
    const { test } = this.props.route.params;
    const testId = test?.id;

    const registerSchema = Yup.object()
      .shape({})
      .concat(CovidTestDateQuestion.schema())
      .concat(CovidTestMechanismQuestionV1.schema())
      .concat(CovidTestResultQuestion.schema());

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
          initialValues={{
            ...CovidTestDateQuestion.initialFormValues(test),
            ...CovidTestMechanismQuestionV1.initialFormValues(test),
            ...CovidTestResultQuestion.initialFormValues(test),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: CovidTestData) => {
            return this.handleAction(values);
          }}>
          {(props) => {
            return (
              <Form>
                <CovidTestDateQuestion formikProps={props} test={test} />

                {props.values.knowsDateOfTest !== '' && (
                  <>
                    <CovidTestMechanismQuestionV1 formikProps={props} test={test} />
                    <CovidTestResultQuestion formikProps={props} test={test} />
                  </>
                )}

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

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
