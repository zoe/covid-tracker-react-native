import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ErrorText, HeaderText, RegularText, Header3Text } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest, VaccineTypes, Dose } from '@covid/core/vaccine/dto/VaccineRequest';
import { ValidationError } from '@covid/components/ValidationError';
import { VaccineDateData, VaccineDateQuestion } from '@covid/features/vaccines/fields/VaccineDateQuestion';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import QuestionCircle from '@assets/icons/QuestionCircle';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import YesNoField from '@covid/components/YesNoField';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

interface AboutYourVaccineData extends VaccineDateData {}

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const [errorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasSecondDose, setHasSecondDose] = useState<string>('no');
  const { assessmentData, editIndex } = route.params;
  const registerSchema = Yup.object().shape({}).concat(VaccineDateQuestion.schema());

  const handleAction = (formData: AboutYourVaccineData) => {
    if (!submitting) {
      // //setSubmitting(true);

      function formatDateToPost(date: Date) {
        return moment(date).format('YYYY-MM-DD');
      }
      // alert(JSON.stringify('vaccine'));
      const vaccine = {
        ...assessmentData.vaccineData,
        patient: assessmentData.patientData.patientId,
        vaccine_type: VaccineTypes.COVID_VACCINE,
      } as Partial<VaccineRequest>;

      let doses: Partial<Dose>[] = [];

      if (vaccine.doses !== undefined) {
        doses = [...vaccine.doses];
      }

      if (formData.firstDoseDate) {
        if (vaccine.doses![0] !== undefined) {
          vaccine.doses![0].date_taken_specific! = formatDateToPost(formData.firstDoseDate);
        } else {
          doses.push({
            sequence: 1,
            date_taken_specific: formatDateToPost(formData.firstDoseDate),
            batch_number: formData.firstBatchNumber,
            brand: formData.firstBrand,
            description: formData.firstDescription,
          });
        }
      }

      if (formData.secondDoseDate) {
        if (vaccine.doses?.[1] !== undefined) {
          vaccine.doses![1].date_taken_specific! = formatDateToPost(formData.secondDoseDate);
        } else {
          doses.push({
            sequence: 2,
            date_taken_specific: formatDateToPost(formData.secondDoseDate),
            batch_number: formData.secondBatchNumber,
            brand: formData.secondBrand,
            description: formData.secondDescription,
          });
        }
      }
      const updatedVaccine = {
        ...vaccine,
        doses,
      } as Partial<VaccineRequest>;

      submitVaccine(updatedVaccine);
    }
  };

  const submitVaccine = async (vaccine: Partial<VaccineRequest>) => {
    await vaccineService.saveVaccineResponse(assessmentData.patientData.patientId, vaccine);
    coordinator.gotoNextScreen(route.name);
  };

  const firstDoseUI = (props: FormikProps<VaccineDateData>) => (
    <>
      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
      <VaccineDateQuestion formikProps={props as FormikProps<VaccineDateData>} editIndex={editIndex} firstDose />
      <ErrorText>{errorMessage}</ErrorText>
      {!!Object.keys(props.errors).length && props.submitCount > 0 && (
        <ValidationError error={i18n.t('validation-error-text')} />
      )}
    </>
  );

  const secondDoseUI = (props: FormikProps<VaccineDateData>) =>
    hasSecondDose === 'no' ? null : (
      <>
        <VaccineDateQuestion
          formikProps={props as FormikProps<VaccineDateData>}
          editIndex={editIndex}
          firstDose={false}
        />
        <ErrorText>{errorMessage}</ErrorText>
        {!!Object.keys(props.errors).length && props.submitCount > 0 && (
          <ValidationError error={i18n.t('validation-error-text')} />
        )}
      </>
    );

  const findInfoLink = isSECountry() ? null : (
    <TouchableOpacity style={{ margin: 16 }} onPress={() => assessmentCoordinator.goToVaccineFindInfo()}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.1 }}>
          <QuestionCircle color={colors.linkBlue} />
        </View>
        <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>{i18n.t('vaccines.find-info.link')}</RegularText>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('vaccines.your-vaccine.title')}</HeaderText>
      </Header>

      {findInfoLink}

      <Formik
        initialValues={{
          ...VaccineDateQuestion.initialFormValues(assessmentData.vaccineData),
        }}
        validationSchema={registerSchema}
        onSubmit={(values: AboutYourVaccineData) => handleAction(values)}>
        {(props: FormikProps<AboutYourVaccineData>) => {
          return (
            <Form style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                {(editIndex === undefined || editIndex === 0) && firstDoseUI(props)}
                {(editIndex === undefined || editIndex === 1) && (
                  <>
                    <Header3Text style={{ marginTop: 16, marginBottom: 8 }}>
                      {i18n.t('vaccines.your-vaccine.second-dose')}
                    </Header3Text>
                    <YesNoField
                      selectedValue={hasSecondDose}
                      onValueChange={(value: string) => {
                        if (value === 'no') {
                          props.values.secondDoseDate = undefined;
                        }
                        setHasSecondDose(value);
                      }}
                      label={i18n.t('vaccines.your-vaccine.have-had-second')}
                    />
                    {secondDoseUI(props)}
                  </>
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

const styles = StyleSheet.create({
  labelStyle: {
    marginVertical: 16,
  },
});
