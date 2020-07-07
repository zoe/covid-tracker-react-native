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
import { ValidationError } from '@covid/components/ValidationError';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { PhysicalActivityData, PhysicalActivityQuestion } from '@covid/features/diet-study/fields/PhysicalActivity';
import { AlcoholData, AlcoholQuestions } from '@covid/features/diet-study/fields/AlcoholQuestons';
import { SupplementData, SupplementQuestions } from '@covid/features/diet-study/fields/SupplementQuestions';
import { DietData, DietDescriptionQuestion } from '@covid/features/diet-study/fields/DietDescriptionQuestion';

export interface FormData extends PhysicalActivityData, AlcoholData, SupplementData, DietData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyYourLifestyle'>;
  route: RouteProp<ScreenParamList, 'DietStudyYourLifestyle'>;
};

type State = {
  errorMessage: string;
  submitting: boolean;
};

const initialState: State = {
  errorMessage: '',
  submitting: false,
};

export default class DietStudyYourLifestyleScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState;
  }

  submitDietStudy(infos: Partial<DietStudyRequest>) {
    console.log(infos);

    try {
      this.setState({ submitting: false });
    } catch (error) {
      this.setState({ errorMessage: i18n.t('something-went-wrong') });
      throw error;
    }
  }

  private async updateDietStudy(formData: FormData) {
    if (this.state.submitting) return;
    this.setState({ submitting: true });

    const infos = {
      patient: '', // TODO - Set the PatientID

      ...PhysicalActivityQuestion.createDTO(formData),
      ...AlcoholQuestions.createDTO(formData),
      ...SupplementQuestions.createDTO(formData),
      ...DietDescriptionQuestion.createDTO(formData),
    } as Partial<DietStudyRequest>;

    this.submitDietStudy(infos);
  }

  render() {
    const registerSchema = Yup.object()
      .shape({})

      .concat(PhysicalActivityQuestion.schema())
      .concat(AlcoholQuestions.schema())
      .concat(SupplementQuestions.schema())
      .concat(DietDescriptionQuestion.schema());
    return (
      <Screen navigation={this.props.navigation}>
        <Header>
          <HeaderText>{i18n.t('diet-study.your-lifestyle.title')}</HeaderText>
        </Header>

        <Formik
          initialValues={{
            ...PhysicalActivityQuestion.initialFormValues(),
            ...AlcoholQuestions.initialFormValues(),
            ...SupplementQuestions.initialFormValues(),
            ...DietDescriptionQuestion.initialFormValues(),
          }}
          validationSchema={registerSchema}
          onSubmit={(values: FormData) => {
            return this.updateDietStudy(values);
          }}>
          {(props) => {
            return (
              <Form>
                <PhysicalActivityQuestion formikProps={props as FormikProps<PhysicalActivityData>} />
                <AlcoholQuestions formikProps={props as FormikProps<AlcoholData>} />
                <SupplementQuestions formikProps={props as FormikProps<SupplementData>} />

                <DietDescriptionQuestion formikProps={props as FormikProps<DietData>} />

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
