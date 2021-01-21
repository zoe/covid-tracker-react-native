import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ClickableText, ErrorText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { VaccineRequest, VaccineTypes, Dose } from '@covid/core/vaccine/dto/VaccineRequest';
import { ValidationError } from '@covid/components/ValidationError';
import { VaccineDoseData, VaccineDateQuestion } from '@covid/features/vaccines/fields/VaccineDateQuestion';
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

interface AboutYourVaccineData extends VaccineDoseData {}

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const [errorMessage] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasSecondDose, setHasSecondDose] = useState<string>('no');
  const { assessmentData, editIndex } = route.params;
  const registerSchema = Yup.object().shape({}).concat(VaccineDateQuestion.schema());

  const processFormDataForSubmit = (formData: AboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);

      function formatDateToPost(date: Date) {
        return moment(date).format('YYYY-MM-DD');
      }

      const vaccine: Partial<VaccineRequest> = {
        ...assessmentData.vaccineData,
        patient: assessmentData.patientData.patientId,
        vaccine_type: VaccineTypes.COVID_VACCINE,
      };
      let doses: Partial<Dose>[] = [];

      if (vaccine.doses !== undefined) {
        doses = [...vaccine.doses];
      }

      if (formData.firstDoseDate) {
        if (doses[0] !== undefined) {
          const updatedDose: Partial<Dose> = {
            ...doses[0],
            date_taken_specific: formatDateToPost(formData.firstDoseDate),
          };
          doses[0] = updatedDose;
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
        if (doses[1] !== undefined) {
          const updatedDose: Partial<Dose> = {
            ...doses[1],
            date_taken_specific: formatDateToPost(formData.secondDoseDate),
          };
          doses[1] = updatedDose;
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
      const updatedVaccine: Partial<VaccineRequest> = {
        ...vaccine,
        doses,
      };

      console.log('formData: ', formData);
      console.log('POST', updatedVaccine);
      submitVaccine(updatedVaccine);
    }
  };

  const submitVaccine = async (vaccine: Partial<VaccineRequest>) => {
    await vaccineService.saveVaccineResponse(assessmentData.patientData.patientId, vaccine);
    coordinator.gotoNextScreen(route.name);
  };

  const checkDateChangePrompt = (formData: AboutYourVaccineData) => {
    Alert.alert(
      i18n.t('vaccines.your-vaccine.date-change-confirm'),
      i18n.t('vaccines.your-vaccine.date-change-text'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('confirm'),
          onPress: () => {
            processFormDataForSubmit(formData);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const promptDeleteVaccine = () => {
    Alert.alert(
      i18n.t('vaccines.vaccine-list.delete-vaccine-title'),
      i18n.t('vaccines.vaccine-list.delete-vaccine-text'),
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('delete'),
          style: 'destructive',
          onPress: () => {
            vaccineService.deleteVaccine(assessmentData.vaccineData.id).then(() => {
              coordinator.resetVaccine();
              coordinator.gotoNextScreen(route.name);
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const firstDoseUI = (props: FormikProps<VaccineDoseData>) => (
    <>
      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
      <VaccineDateQuestion formikProps={props as FormikProps<VaccineDoseData>} editIndex={editIndex} firstDose />
      <ErrorText>{errorMessage}</ErrorText>
      {!!Object.keys(props.errors).length && props.submitCount > 0 && (
        <ValidationError error={i18n.t('validation-error-text')} />
      )}
    </>
  );

  const secondDoseUI = (props: FormikProps<VaccineDoseData>) =>
    hasSecondDose === 'no' ? null : (
      <>
        <VaccineDateQuestion
          formikProps={props as FormikProps<VaccineDoseData>}
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

  const dateHasBeenEdited = (formData: AboutYourVaccineData) => {
    if (assessmentData.vaccineData === undefined || assessmentData.vaccineData.doses === undefined) {
      return false;
    }
    const dose1Date = assessmentData.vaccineData.doses[0].date_taken_specific;
    const dose2Date = assessmentData.vaccineData.doses[1].date_taken_specific;

    console.log(
      'dateHasBeenEdited: ',
      editIndex || (formData.firstDoseDate === dose1Date && formData.secondDoseDate === dose2Date)
    );

    return editIndex || (formData.firstDoseDate === dose1Date && formData.secondDoseDate === dose2Date);
  };

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
        onSubmit={(formData: AboutYourVaccineData) =>
          // Show an alert if any date value has changed. The prompt confirm will call processFormDataForSubmit.
          dateHasBeenEdited() ? checkDateChangePrompt(formData) : processFormDataForSubmit(formData)
        }>
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

              <ClickableText onPress={() => promptDeleteVaccine()} style={styles.clickableText}>
                {i18n.t('vaccines.your-vaccine.delete')}
              </ClickableText>
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
  clickableText: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.purple,
  },
});
