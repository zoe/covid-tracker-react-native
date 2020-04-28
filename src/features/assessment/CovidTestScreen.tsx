import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { Form, Text } from 'native-base';
import React, { Component } from 'react';
import { Platform } from 'react-native';
import * as Yup from 'yup';

import DropdownField from '../../components/DropdownField';
import ProgressStatus from '../../components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '../../components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '../../components/Text';
import { ValidationErrors } from '../../components/ValidationError';
import UserService from '../../core/user/UserService';
import { AssessmentInfosRequest } from '../../core/user/dto/UserAPIContracts';
import i18n from '../../locale/i18n';
import { ScreenParamList } from '../ScreenParamList';

const initialFormValues = {
  hasCovidTest: 'no',
  hasCovidPositive: 'no',
};

interface CovidTestData {
  hasCovidTest: string;
  hasCovidPositive: string;
}

type CovidProps = {
  navigation: StackNavigationProp<ScreenParamList, 'CovidTest'>;
  route: RouteProp<ScreenParamList, 'CovidTest'>;
};

type State = {
  errorMessage: string;
};

const initialState: State = {
  errorMessage: '',
};

export default class CovidTestScreen extends Component<CovidProps, State> {
  constructor(props: CovidProps) {
    super(props);
    this.state = initialState;
  }

  registerSchema = Yup.object().shape({
    hasCovidTest: Yup.string().required(),
    hasCovidPositive: Yup.string().required(),
    takesAnyBloodPressureMedications: Yup.string(),
  });

  handleUpdateHealth(formData: CovidTestData) {
    const { currentPatient, assessmentId } = this.props.route.params;
    const patientId = currentPatient.patientId;

    const userService = new UserService();
    var assessment = {
      patient: patientId,
      had_covid_test: formData.hasCovidTest === 'yes',
    } as Partial<AssessmentInfosRequest>;

    if (formData.hasCovidTest === 'yes') {
      assessment = {
        ...assessment,
        tested_covid_positive: formData.hasCovidPositive,
      };
    }

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
    const hasCovidPositiveItems = [
      { label: i18n.t('picker-no'), value: 'no' },
      { label: i18n.t('picker-yes'), value: 'yes' },
      { label: i18n.t('covid-test.picker-waiting'), value: 'waiting' },
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
                <DropdownField
                  placeholder="hasCovidTest"
                  selectedValue={props.values.hasCovidTest}
                  onValueChange={props.handleChange('hasCovidTest')}
                  label={i18n.t('covid-test.question-has-covid-test')}
                />

                {props.values.hasCovidTest === 'yes' && (
                  <DropdownField
                    placeholder="hasCovidPositive"
                    selectedValue={props.values.hasCovidPositive}
                    onValueChange={props.handleChange('hasCovidPositive')}
                    label={i18n.t('covid-test.question-has-covid-positive')}
                    items={hasCovidPositiveItems}
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
