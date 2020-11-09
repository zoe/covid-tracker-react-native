import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';
import * as Yup from 'yup';

import i18n from '@covid/locale/i18n';
import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, Divider, ErrorText, HeaderText, RegularBoldText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { WeightData, WeightQuestion } from '@covid/features/patient/fields/WeightQuestion';
import { ValidationError } from '@covid/components/ValidationError';
import { ExtraWeightData, ExtraWeightQuestions } from '@covid/features/diet-study/fields/ExtraWeightQuestions';
import { HoursSleepData, HoursSleepQuestion } from '@covid/features/diet-study/fields/HoursSleepQuestion';
import { ShiftWorkData, ShiftWorkQuestion } from '@covid/features/diet-study/fields/ShiftWorkQuestion';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import { cleanFloatVal } from '@covid/utils/number';
import { colors } from '@theme';
import dietStudyCoordinator, {
  getScreenHeaderOptions,
  LAST_4_WEEKS,
  PRE_LOCKDOWN,
} from '@covid/core/diet-study/DietStudyCoordinator';
import { PhysicalActivityData, PhysicalActivityQuestion } from '@covid/features/diet-study/fields/PhysicalActivity';

import { useDietStudyFormSubmit } from './DietStudyFormSubmit.hooks';

interface FormData extends WeightData, ExtraWeightData, HoursSleepData, ShiftWorkData, PhysicalActivityData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyAboutYou'>;
  route: RouteProp<ScreenParamList, 'DietStudyAboutYou'>;
};

const IntroSection: React.FC = () => {
  return (
    <View style={styles.thankyou}>
      <View style={{ height: 4 }} />
      <Text style={{ textAlign: 'center' }}>
        <RegularText>{i18n.t('diet-study.about-you.intro-1')}</RegularText>
        <RegularBoldText>{i18n.t('diet-study.about-you.intro-2')}</RegularBoldText>
      </Text>
    </View>
  );
};

const ThankYouSection: React.FC = () => {
  return (
    <View style={styles.thankyou}>
      <View style={{ height: 4 }} />
      <Text style={{ textAlign: 'center' }}>
        <RegularText>{i18n.t('diet-study.about-you.answer-again-1')}</RegularText>
        <RegularBoldText>{i18n.t('diet-study.about-you.answer-again-2')}</RegularBoldText>
        <RegularText>{i18n.t('diet-study.about-you.answer-again-3')}</RegularText>
      </Text>
    </View>
  );
};

const DietStudyAboutYouScreen: React.FC<Props> = ({ route, navigation }) => {
  const { timePeriod } = route.params.dietStudyData;
  const currentPatient = route.params.dietStudyData.patientData.patientState;
  const { profile, isFemale } = currentPatient;

  const form = useDietStudyFormSubmit(route.name);

  const registerSchema = Yup.object()
    .shape({})
    .concat(WeightQuestion.schema())
    .concat(ExtraWeightQuestions.schema())
    .concat(HoursSleepQuestion.schema())
    .concat(ShiftWorkQuestion.schema())
    .concat(PhysicalActivityQuestion.schema());

  const updateDietStudy = async (formData: FormData) => {
    if (form.submitting) return;
    let infos = {
      display_name: timePeriod,
      patient: currentPatient.patientId,
      ...ExtraWeightQuestions.createDTO(formData),
      ...HoursSleepQuestion.createDTO(formData),
      ...ShiftWorkQuestion.createDTO(formData),
      ...PhysicalActivityQuestion.createDTO(formData),
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

    await form.submitDietStudy(infos);
    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen profile={profile} navigation={navigation} style={styles.screen} {...getScreenHeaderOptions(timePeriod)}>
      {timePeriod === LAST_4_WEEKS && <IntroSection />}
      {timePeriod === PRE_LOCKDOWN && <ThankYouSection />}

      <Formik
        initialValues={{
          ...WeightQuestion.initialFormValues(),
          ...ExtraWeightQuestions.initialFormValues(),
          ...HoursSleepQuestion.initialFormValues(),
          ...ShiftWorkQuestion.initialFormValues(),
          ...PhysicalActivityQuestion.initialFormValues(),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: FormData) => updateDietStudy(values)}>
        {(props) => {
          return (
            <Form style={{ marginHorizontal: 16 }}>
              {props.values.weightUnsure === false && (
                <WeightQuestion
                  formikProps={props as FormikProps<WeightData>}
                  label={i18n.t('diet-study.weight-label')}
                />
              )}
              <ExtraWeightQuestions isFemale={isFemale} formikProps={props as FormikProps<ExtraWeightData>} />

              <Header style={{ marginHorizontal: 0 }}>
                <HeaderText>{i18n.t('diet-study.about-you.title')}</HeaderText>
              </Header>

              <Divider />

              <View style={{ height: 24 }} />

              <HoursSleepQuestion formikProps={props as FormikProps<HoursSleepData>} />
              <ShiftWorkQuestion formikProps={props as FormikProps<ShiftWorkData>} />
              <PhysicalActivityQuestion formikProps={props as FormikProps<PhysicalActivityData>} />

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
  thankyou: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: 16,
    paddingVertical: 24,
    marginVertical: 16,
    marginHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 16,
  },
});

export default DietStudyAboutYouScreen;
