import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import key from 'weak-key';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { Dose, VaccineBrands, VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';
import { ValidationError } from '@covid/components/ValidationError';
import { VaccineDateData, VaccineDateQuestion } from '@covid/features/vaccines/fields/VaccineDateQuestion';
import { VaccineNameData, VaccineNameQuestion } from '@covid/features/vaccines/fields/VaccineNameQuestion';
import { VaccineBatchData, VaccineBatchQuestion } from '@covid/features/vaccines/fields/VaccineBatchQuestion';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import QuestionCircle from '@assets/icons/QuestionCircle';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

interface AboutYourVaccineData extends VaccineDateData, VaccineNameData, VaccineBatchData {}

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { assessmentData, editIndex } = route.params;
  const registerSchema = Yup.object().shape({}).concat(VaccineDateQuestion.schema());

  const handleAction = (formData: AboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);

      function formatDateToPost(date: Date) {
        return moment(date).format('YYYY-MM-DD');
      }

      const vaccine = {
        ...assessmentData.vaccineData,
        patient: assessmentData.patientData.patientId,
        vaccine_type: VaccineTypes.COVID_VACCINE,
      } as Partial<VaccineRequest>;

      if (vaccine.doses === undefined) {
        vaccine.doses = [];
      }

      if (formData.firstDoseDate) {
        if (vaccine.doses![0] !== undefined) {
          vaccine.doses![0].date_taken_specific! = formatDateToPost(formData.firstDoseDate);
        } else {
          vaccine.doses?.push({ sequence: 1, date_taken_specific: formatDateToPost(formData.firstDoseDate) });
        }
      }

      if (formData.secondDoseDate) {
        if (vaccine.doses![1] !== undefined) {
          vaccine.doses![1].date_taken_specific! = formatDateToPost(formData.secondDoseDate);
        } else {
          vaccine.doses?.push({ sequence: 2, date_taken_specific: formatDateToPost(formData.secondDoseDate) });
        }
      }

      submitVaccine(vaccine);
    }
  };

  const submitVaccine = async (vaccine: Partial<VaccineRequest>) => {
    await vaccineService.saveVaccineResponse(assessmentData.patientData.patientId, vaccine);
    coordinator.gotoNextScreen(route.name);
  };

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('vaccines.your-vaccine.title')}</HeaderText>
      </Header>

      <TouchableOpacity style={{ margin: 16 }} onPress={() => assessmentCoordinator.goToVaccineFindInfo()}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 0.1 }}>
            <QuestionCircle color={colors.linkBlue} />
          </View>
          <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>{i18n.t('vaccines.find-info.link')}</RegularText>
        </View>
      </TouchableOpacity>

      <Formik
        initialValues={{
          ...VaccineDateQuestion.initialFormValues(assessmentData.vaccineData),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: AboutYourVaccineData) => handleAction(values)}>
        {(props) => {
          return (
            <Form style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                <VaccineNameQuestion formikProps={props as FormikProps<VaccineNameData>} editIndex={editIndex} />
                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}
              </View>

              <View style={{ marginHorizontal: 16 }}>
                <VaccineDateQuestion formikProps={props as FormikProps<VaccineDateData>} editIndex={editIndex} />
                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}
              </View>

              <View style={{ marginHorizontal: 16 }}>
                <VaccineBatchQuestion formikProps={props as FormikProps<VaccineBatchData>} editIndex={editIndex} />
                <ErrorText>{errorMessage}</ErrorText>
                {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                  <ValidationError error={i18n.t('validation-error-text')} />
                )}
              </View>

              <View style={{ flex: 1 }} />
              <BrandedButton onPress={props.handleSubmit}>
                <Text>{i18n.t('vaccines.your-vaccine.confirm')}</Text>
              </BrandedButton>
            </Form>
          );
        }}
      </Formik>
    </Screen>
  );
};

const styles = StyleSheet.create({});
