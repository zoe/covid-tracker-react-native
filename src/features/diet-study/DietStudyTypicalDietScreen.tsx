import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import i18n from '@covid/locale/i18n';
import { ValidationError } from '@covid/components/ValidationError';
import { colors } from '@theme';
import dietStudyCoordinator, {
  LAST_4_WEEKS,
  getScreenHeaderOptions,
} from '@covid/core/diet-study/DietStudyCoordinator';
import { OtherInfoData, OtherInfoQuestion } from '@covid/features/diet-study/fields/OtherInfoQuestion';

import { MilkTypeQuestion, MilkTypesData } from './fields/MilkTypeQuestion';
import { FruitNVegConsumptionData, FruitNVegConsumptionQuestions } from './fields/FruitNVegConsumptionQuestions';
import { useDietStudyFormSubmit } from './DietStudyFormSubmit.hooks';
import { FoodFreqData, FoodFreqQuestion } from './fields/FoodFreqQuestion';

interface FormData extends FoodFreqData, FruitNVegConsumptionData, MilkTypesData, OtherInfoData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyTypicalDiet'>;
  route: RouteProp<ScreenParamList, 'DietStudyTypicalDiet'>;
};

const DietStudyTypicalDietScreen: React.FC<Props> = ({ route, navigation }) => {
  const { currentPatient, timePeriod } = route.params.dietStudyData;
  const { profile } = currentPatient;
  const registerSchema = Yup.object()
    .shape({})
    .concat(FoodFreqQuestion.schema())
    .concat(FruitNVegConsumptionQuestions.schema())
    .concat(MilkTypeQuestion.schema());

  const form = useDietStudyFormSubmit(route.name);

  const updateDietStudy = async (formData: FormData) => {
    if (form.submitting) return;
    const infos = {
      ...FoodFreqQuestion.createDTO(formData),
      ...FruitNVegConsumptionQuestions.createDTO(formData),
      ...MilkTypeQuestion.createDTO(formData),
      ...OtherInfoQuestion.createDTO(formData),
      is_complete: true,
    } as Partial<DietStudyRequest>;

    await form.submitDietStudy(infos);

    dietStudyCoordinator.gotoNextScreen(route.name);
  };

  const completeCtaLabel = () =>
    timePeriod === LAST_4_WEEKS ? i18n.t('diet-study.complete-pre-cta') : i18n.t('diet-study.complete-cta');

  return (
    <Screen profile={profile} navigation={navigation} style={styles.screen} {...getScreenHeaderOptions(timePeriod)}>
      <Header>
        <HeaderText>{i18n.t('diet-study.typical-diet.title')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={3} maxSteps={3} />
      </ProgressBlock>

      <Formik
        initialValues={{
          ...FoodFreqQuestion.initialFormValues(),
          ...FruitNVegConsumptionQuestions.initialFormValues(),
          ...MilkTypeQuestion.initialFormValues(),
          ...OtherInfoQuestion.initialFormValues(),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: FormData) => updateDietStudy(values)}>
        {(props) => {
          return (
            <Form>
              <RegularText style={styles.description}>{i18n.t('diet-study.typical-diet.text-1')}</RegularText>

              <View style={[styles.divider, styles.padded]} />

              <FoodFreqQuestion formikProps={props as FormikProps<FoodFreqData>} />
              <FruitNVegConsumptionQuestions formikProps={props as FormikProps<FruitNVegConsumptionData>} />
              <MilkTypeQuestion formikProps={props as FormikProps<MilkTypesData>} />
              <OtherInfoQuestion formikProps={props as FormikProps<OtherInfoData>} />
              <ErrorText style={{ marginHorizontal: 16 }}>{form.errorMessage}</ErrorText>

              {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                <ValidationError style={{ marginHorizontal: 16 }} error={i18n.t('validation-error-text')} />
              )}

              <View style={{ height: 72 }} />

              <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                {completeCtaLabel()}
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
  description: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  padded: {
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    marginVertical: 32,
    backgroundColor: colors.backgroundFour,
  },
});

export default DietStudyTypicalDietScreen;
