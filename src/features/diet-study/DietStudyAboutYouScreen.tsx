import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { WeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import { ValidationError } from '@covid/components/ValidationError';
import { ExtraWeightData, ExtraWeightQuestions } from '@covid/features/diet-study/fields/ExtraWeightQuestions';
import { HoursSleepData, HoursSleepQuestion } from '@covid/features/diet-study/fields/HoursSleepQuestion';
import { ShiftWorkData, ShiftWorkQuestion } from '@covid/features/diet-study/fields/ShiftWorkQuestion';
import { FoodSecurityData, FoodSecurityQuestion } from '@covid/features/diet-study/fields/FoodSecurityQuestion';
import AssessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { CovidTestDateQuestion } from '@covid/features/covid-tests/fields/CovidTestDateQuestion';
import { CovidTestMechanismQuestion } from '@covid/features/covid-tests/fields/CovidTestMechanismQuesion';
import { CovidTestResultQuestion } from '@covid/features/covid-tests/fields/CovidTestResultQuestion';
import { CovidTestInvitedQuestion } from '@covid/features/covid-tests/fields/CovidTestInvitedQuesetion';
import { CovidTestLocationQuestion } from '@covid/features/covid-tests/fields/CovidTestLocation';
import { CovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { cleanFloatVal } from '@covid/utils/number';

export interface FormData extends WeightData, ExtraWeightData, HoursSleepData, ShiftWorkData, FoodSecurityData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyAboutYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyAboutYou'>;
};

type State = {
  errorMessage: string;
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class DietStudyAboutYouScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  private async updateDietStudy(formData: FormData) {
    if (this.state.submitting) return;
    this.setState({ submitting: true });

    let infos = {
      patient: '', // TODO - Set the PatientID
      ...ExtraWeightQuestions.createDTO(formData),
      ...HoursSleepQuestion.createDTO(formData),
      ...ShiftWorkQuestion.createDTO(formData),
      ...FoodSecurityQuestion.createDTO(formData),
    } as Partial<DietStudyRequest>;

    if (formData.weightUnit === 'lbs') {
      let pounds = cleanFloatVal(formData.pounds);
      if (formData.stones) {
        const stones = cleanFloatVal(formData.stones) || 0;
        pounds += stones * 14;
      }
      infos = { ...infos, weight_pounds: pounds };
    } else {
      infos = { ...infos, weight_kg: cleanFloatVal(formData.weight) };
    }

    console.log(infos);

    try {
      this.setState({ submitting: false });
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      throw error;
    }
  }

  render() {
    const registerSchema = Yup.object()
      .shape({})
      .concat(WeightQuestion.schema())
      .concat(ExtraWeightQuestions.schema())
      .concat(HoursSleepQuestion.schema())
      .concat(ShiftWorkQuestion.schema())
      .concat(FoodSecurityQuestion.schema());

    return (
      <Screen navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('diet-study.about-you.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={{
            ...WeightQuestion.initialFormValues(),
            ...ExtraWeightQuestions.initialFormValues(),
            ...HoursSleepQuestion.initialFormValues(),
            ...ShiftWorkQuestion.initialFormValues(),
            ...FoodSecurityQuestion.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: FormData) => {
            return this.updateDietStudy(values);
          }}>
          {(props) => {
            return (
              <Form>
                <WeightQuestion
                  formikProps={props as FormikProps<WeightData>}
                  label={i18n.t('diet-study.weight-label')}
                />

                <ExtraWeightQuestions formikProps={props as FormikProps<ExtraWeightData>} />
                <HoursSleepQuestion formikProps={props as FormikProps<HoursSleepData>} />
                <ShiftWorkQuestion formikProps={props as FormikProps<ShiftWorkData>} />
                <FoodSecurityQuestion formikProps={props as FormikProps<FoodSecurityData>} />

                <ErrorText>{this.state.errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}

                <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                  {i18n.t('diet-study.next-section')}
                </BrandedButton>
              </Form>
            );
          }}
        </Formik>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({});
