import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, View } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import AssessmentCoordinator from '@covid/features/assessment/AssessmentCoordinator';
import i18n from '@covid/locale/i18n';
import { assessmentService } from '@covid/Services';
import { ValidationError } from '@covid/components/ValidationError';

import { ScreenParamList } from '../ScreenParamList';

import { LifestyleData, LifestyleQuestion } from './fields/LifestyleQuestion';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'Lifestyle'>;
  route: RouteProp<ScreenParamList, 'Lifestyle'>;
};

type State = {
  errorMessage: string;
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class LifestyleScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
    AssessmentCoordinator.resetNavigation(props.navigation);
  }

  checkFormFilled = (props: FormikProps<any>) => {
    if (Object.keys(props.errors).length && props.submitCount > 0) return false;
    if (Object.keys(props.values).length === 0 && props.submitCount > 0) return false;
    return true;
  };

  private async updateLifestyle(values: LifestyleData) {
    if (this.state.submitting) return;

    this.setState({ submitting: true });

    try {
      const patientID = AssessmentCoordinator.assessmentData.currentPatient.patientId;
      const payload = LifestyleQuestion.createMasksDTO(values);
      await assessmentService.saveLifestyle(patientID, payload);
      AssessmentCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      throw error;
    }
  }

  registerSchema = Yup.object().shape({
    weightChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    dietChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    snackingChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    activityChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
    alcoholChange: Yup.string().required(i18n.t('lifestyle.please-select-option')),
  });

  render() {
    const currentPatient = AssessmentCoordinator.assessmentData.currentPatient;
    return (
      <Screen profile={currentPatient.profile} navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('lifestyle.title')}</HeaderText>
        </Header>

        <ProgressBlock>
          <ProgressStatus step={3} maxSteps={5} />
        </ProgressBlock>

        <View style={styles.container}>
          <RegularText>
            {i18n.t('lifestyle.explanation')}
            {'\n'}
          </RegularText>

          <RegularText>{i18n.t('lifestyle.text')}</RegularText>
        </View>

        <Formik
          initialValues={LifestyleQuestion.initialFormValues()}
          validationSchema={this.registerSchema}
          onSubmit={(values: LifestyleData) => {
            return this.updateLifestyle(values);
          }}>
          {(props) => {
            return (
              <Form style={styles.form}>
                <LifestyleQuestion formikProps={props} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton
                  onPress={props.handleSubmit}
                  enable={this.checkFormFilled(props)}
                  hideLoading={!props.isSubmitting}>
                  {i18n.t('next-question')}
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
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  form: {},
});
