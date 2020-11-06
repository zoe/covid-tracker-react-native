import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, Divider, ErrorText, HeaderText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { ValidationError } from '@covid/components/ValidationError';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { AlcoholData, AlcoholQuestions } from '@covid/features/diet-study/fields/AlcoholQuestons';
import { SupplementData, SupplementQuestions } from '@covid/features/diet-study/fields/SupplementQuestions';
import { DietData, DietDescriptionQuestion } from '@covid/features/diet-study/fields/DietDescriptionQuestion';
import { EatingHabitData, EatingHabitQuestions } from '@covid/features/diet-study/fields/EatingHabitQuestions';
import { EatingWindowData, EatingWindowQuestions } from '@covid/features/diet-study/fields/EatingWindowQuestions';
import dietStudyCoordinator, { getScreenHeaderOptions } from '@covid/core/diet-study/DietStudyCoordinator';
import { colors } from '@theme';
import { FoodSecurityData, FoodSecurityQuestion } from '@covid/features/diet-study/fields/FoodSecurityQuestion';

import { useDietStudyFormSubmit } from './DietStudyFormSubmit.hooks';

interface FormData extends AlcoholData, SupplementData, DietData, EatingHabitData, EatingWindowData, FoodSecurityData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyYourLifestyle'>;
  route: RouteProp<ScreenParamList, 'DietStudyYourLifestyle'>;
};

const DietStudyYourLifestyleScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profile } = route.params.dietStudyData.patientData;

  const registerSchema = Yup.object()
    .shape({})
    .concat(FoodSecurityQuestion.schema())
    .concat(AlcoholQuestions.schema())
    .concat(SupplementQuestions.schema())
    .concat(DietDescriptionQuestion.schema())
    .concat(EatingHabitQuestions.schema())
    .concat(EatingWindowQuestions.schema());

  const form = useDietStudyFormSubmit(route.name);

  const updateDietStudy = async (formData: FormData) => {
    if (form.submitting) return;
    const infos = {
      ...FoodSecurityQuestion.createDTO(formData),
      ...AlcoholQuestions.createDTO(formData),
      ...SupplementQuestions.createDTO(formData),
      ...DietDescriptionQuestion.createDTO(formData),
      ...EatingHabitQuestions.createDTO(formData),
      ...EatingWindowQuestions.createDTO(formData),
    } as Partial<DietStudyRequest>;

    await form.submitDietStudy(infos);
    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen
      profile={profile}
      navigation={navigation}
      style={styles.screen}
      {...getScreenHeaderOptions(route.params.dietStudyData.timePeriod)}>
      <Header>
        <HeaderText>{i18n.t('diet-study.your-lifestyle.title-2')}</HeaderText>
      </Header>

      <Formik
        initialValues={{
          ...FoodSecurityQuestion.initialFormValues(),
          ...AlcoholQuestions.initialFormValues(),
          ...SupplementQuestions.initialFormValues(),
          ...DietDescriptionQuestion.initialFormValues(),
          ...EatingHabitQuestions.initialFormValues(),
          ...EatingWindowQuestions.initialFormValues(),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: FormData) => updateDietStudy(values)}>
        {(props) => {
          return (
            <Form style={{ marginHorizontal: 16 }}>
              <Divider />
              <FoodSecurityQuestion formikProps={props as FormikProps<FoodSecurityData>} />

              <HeaderText style={{ marginVertical: 16 }}>{i18n.t('diet-study.your-lifestyle.title')}</HeaderText>

              <Divider />

              <AlcoholQuestions formikProps={props as FormikProps<AlcoholData>} />
              <SupplementQuestions formikProps={props as FormikProps<SupplementData>} />
              <EatingWindowQuestions formikProps={props as FormikProps<EatingWindowData>} />
              <EatingHabitQuestions formikProps={props as FormikProps<EatingHabitData>} />
              <DietDescriptionQuestion formikProps={props as FormikProps<DietData>} />

              <ErrorText>{form.errorMessage}</ErrorText>
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
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.backgroundSecondary,
  },
});

export default DietStudyYourLifestyleScreen;
