import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'native-base';

import ProgressStatus from '@covid/components/ProgressStatus';
import Screen, { Header, ProgressBlock } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText } from '@covid/components/Text';
import { dietStudyApiClient } from '@covid/Services';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { DietStudyRequest } from '@covid/core/diet-study/dto/DietStudyRequest';
import dietStudyCoordinator from '@covid/core/diet-study/DietStudyCoordinator';
import i18n from '@covid/locale/i18n';
import { ValidationError } from '@covid/components/ValidationError';

interface FormData { }

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'DietStudyTypicalDiet'>;
  route: RouteProp<ScreenParamList, 'DietStudyTypicalDiet'>;
};

const DietStudyTypicalDietScreen: React.FC<Props> = ({ route, navigation }) => {

  const { patientId } = route.params.dietStudyData.currentPatient;
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
  }

  const updateDietStudy = async (formData: FormData) => {
    if (submitting) return;
    setSubmitting(false);
    const infos = {
      ...{},
    } as Partial<DietStudyRequest>;

    await submitDietStudy(infos);
  }

  return (
    <Screen navigation={navigation}>
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

const styles = StyleSheet.create({});

export default DietStudyTypicalDietScreen;
