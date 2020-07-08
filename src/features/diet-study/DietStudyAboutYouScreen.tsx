import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { WeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import { ValidationError } from '@covid/components/ValidationError';
import { ExtraWeightData, ExtraWeightQuestions } from '@covid/features/diet-study/fields/ExtraWeightQuestions';
import { HoursSleepData, HoursSleepQuestion } from '@covid/features/diet-study/fields/HoursSleepQuestion';
import { ShiftWorkData, ShiftWorkQuestion } from '@covid/features/diet-study/fields/ShiftWorkQuestion';
import { FoodSecurityData, FoodSecurityQuestion } from '@covid/features/diet-study/fields/FoodSecurityQuestion';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { cleanFloatVal } from '@covid/utils/number';
import ProgressStatus from '@covid/components/ProgressStatus';
import { DietStudyApiClient } from '@covid/core/diet-study/DietStudyApiClient';
import { dietStudyApiClient } from '@covid/Services';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';

interface FormData extends WeightData, ExtraWeightData, HoursSleepData, ShiftWorkData, FoodSecurityData {}

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

  async submitDietStudy(infos: Partial<DietStudyRequest>) {
    console.log(infos);

    try {
      const response = await dietStudyApiClient.addDietStudy(
        this.props.route.params.dietStudyData.currentPatient.patientId,
        infos
      );

      // Set StudyID from server response
      dietStudyCoordinator.dietStudyData.recentDietStudyId = response.id;

      this.setState({ submitting: false });
      dietStudyCoordinator.gotoNextScreen(this.props.route.name);
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      throw error;
    }
  }

  private async updateDietStudy(formData: FormData) {
    if (this.state.submitting) return;
    this.setState({ submitting: true });

    let infos = {
      patient: this.props.route.params.dietStudyData.currentPatient.patientId,
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

    await this.submitDietStudy(infos);
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

        <ProgressBlock>
          <ProgressStatus step={1} maxSteps={3} />
        </ProgressBlock>

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
