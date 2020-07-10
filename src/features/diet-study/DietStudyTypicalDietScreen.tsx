import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { Form } from 'native-base';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import { dietStudyApiClient } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import i18n from '@covid/locale/i18n';
import { ValidationError } from '@covid/components/ValidationError';
import { colors } from '@theme';
import { FoodFreqCard, GROUPS } from '@covid/components/Cards/FoodFreq/FoodFreqCard';

import { MilkTypeQuestion, MilkTypesData } from './fields/MilkTypeQuestion';
import { FruitNVegConsumptionData, FruitNVegConsumptionQuestions } from './fields/FruitNVegConsumptionQuestions';
import { DietChangedQuestion, DietChangedData } from './fields/DietChangedQuestion';

interface FormData {}

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyTypicalDiet'>;
  route: RouteProp<ScreenParamList, 'DietStudyTypicalDiet'>;
};

const DietStudyTypicalDietScreen: React.FC<Props> = ({ route, navigation }) => {
  const { profile, patientId } = route.params.dietStudyData.currentPatient;
  const registerSchema = Yup.object().shape({});

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitDietStudy = async (infos: Partial<DietStudyRequest>) => {
    console.log(infos);

    try {
      await dietStudyApiClient.addDietStudy(patientId, infos);
      setSubmitting(false);
      dietStudyCoordinator.gotoNextScreen(route.name);
    } catch (error) {
      setErrorMessage(i18n.t('something-went-wrong'));
      throw error;
    }
  };

  const updateDietStudy = async (formData: FormData) => {
    if (submitting) return;
    setSubmitting(false);
    const infos = {
      ...{},
    } as Partial<DietStudyRequest>;

    await submitDietStudy(infos);
  };

  return (
    <Screen profile={profile} navigation={navigation} style={styles.screen}>
      <Header>
        <HeaderText>{i18n.t('diet-study.typical-diet.title')}</HeaderText>
      </Header>

      <ProgressBlock>
        <ProgressStatus step={3} maxSteps={3} />
      </ProgressBlock>

      <Formik
        initialValues={{}}
        validationSchema={registerSchema}
        onSubmit={(values: FormData) => updateDietStudy(values)}>
        {(props) => {
          return (
            <Form>
              <ErrorText>{errorMessage}</ErrorText>
              {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                <ValidationError error={i18n.t('validation-error-text')} />
              )}

              <RegularText style={styles.description}>{i18n.t('diet-study.typical-diet.text-1')}</RegularText>

              <View style={[styles.divider, styles.padded]} />

              <View style={[styles.padded]}>
                <RegularText style={{ marginBottom: 16 }}>{i18n.t('diet-study.typical-diet.text-2')}</RegularText>

                <FoodFreqCard items={GROUPS()} style={{ marginVertical: 16 }} />
              </View>

              <FruitNVegConsumptionQuestions formikProps={props as FormikProps<FruitNVegConsumptionData>} />

              <MilkTypeQuestion formikProps={props as FormikProps<MilkTypesData>} />

              <DietChangedQuestion formikProps={props as FormikProps<DietChangedData>} />

              <View style={{ height: 72 }} />

              <BrandedButton onPress={props.handleSubmit} hideLoading={!props.isSubmitting}>
                {i18n.t('diet-study.complete-cta')}
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
