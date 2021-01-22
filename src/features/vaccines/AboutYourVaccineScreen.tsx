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
import { formatDateToPost } from '@covid/utils/datetime';

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
  const [hasSecondDose, setHasSecondDose] = useState<string | undefined>(undefined);
  const { assessmentData } = route.params;
  const registerSchema = Yup.object().shape({}).concat(VaccineDateQuestion.schema());

  function vaccineOrFormHasSecondDose() {
    if (hasSecondDose !== undefined) {
      return hasSecondDose === 'yes';
    }
    return assessmentData.vaccineData && assessmentData.vaccineData.doses[1] !== undefined;
  }

  const processFormDataForSubmit = (formData: AboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);
      const vaccine: Partial<VaccineRequest> = {
        ...assessmentData.vaccineData,
        patient: assessmentData.patientData.patientId,
        vaccine_type: VaccineTypes.COVID_VACCINE,
      };
      const doses: Partial<Dose | undefined>[] = [];

      if (formData.firstDoseDate) {
        doses[0] = vaccine?.doses && vaccine?.doses[0] ? vaccine.doses[0] : undefined;
        const updatedDose: Partial<Dose> = {
          ...doses[0],
          sequence: 1,
          date_taken_specific: formatDateToPost(formData.firstDoseDate),
          batch_number: formData.firstBatchNumber,
          brand: formData.firstBrand,
          description: formData.firstDescription,
        };
        doses[0] = updatedDose;
      }

      //if setHasSecondDose is manually set to 'no', the data will not be saved (even if entered)
      if (setHasSecondDose && formData.secondDoseDate) {
        doses[1] = vaccine?.doses && vaccine?.doses[1] ? vaccine.doses[1] : undefined;
        const updatedDose: Partial<Dose> = {
          ...doses[1],
          sequence: 2,
          date_taken_specific: formatDateToPost(formData.secondDoseDate),
          batch_number: formData.secondBatchNumber,
          brand: formData.secondBrand,
          description: formData.secondDescription,
        };
        doses[1] = updatedDose;
      }
      const updatedVaccine: Partial<VaccineRequest> = { ...vaccine, doses };
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

  const renderFirstDoseUI = (props: FormikProps<VaccineDoseData>) => (
    <>
      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
      <VaccineDateQuestion formikProps={props as FormikProps<VaccineDoseData>} firstDose />
      <ErrorText>{errorMessage}</ErrorText>
      {!!Object.keys(props.errors).length && props.submitCount > 0 && (
        <ValidationError error={i18n.t('validation-error-text')} />
      )}
    </>
  );

  const renderSecondDoseUI = (props: FormikProps<VaccineDoseData>) =>
    vaccineOrFormHasSecondDose() ? (
      <>
        <VaccineDateQuestion formikProps={props as FormikProps<VaccineDoseData>} firstDose={false} />
        <ErrorText>{errorMessage}</ErrorText>
        {!!Object.keys(props.errors).length && props.submitCount > 0 && (
          <ValidationError error={i18n.t('validation-error-text')} />
        )}
      </>
    ) : null;

  const renderFindInfoLink = isSECountry() ? null : (
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
    // This is quite verbose vs a one-line return for easier reading
    if (assessmentData.vaccineData === undefined || assessmentData.vaccineData.doses === undefined) {
      return false;
    }

    // Always has doses here due to check above
    const doses: Partial<Dose>[] = assessmentData.vaccineData.doses;
    const dose1Date = doses[0]?.date_taken_specific;
    const dose2Date = doses[1]?.date_taken_specific;
    const formDate1 = formatDateToPost(formData.firstDoseDate);
    const formDate2 = formatDateToPost(formData.secondDoseDate);
    return formDate1 !== dose1Date || formDate2 !== dose2Date;
  };

  const buildInitialValues = (vaccine?: VaccineRequest): VaccineDoseData => {
    return {
      firstDoseDate: vaccine?.doses[0]?.date_taken_specific
        ? moment(vaccine.doses[0].date_taken_specific).toDate()
        : undefined,
      firstBatchNumber: vaccine?.doses[0]?.batch_number,
      firstBrand: vaccine?.doses[0]?.brand,
      firstDescription: vaccine?.doses[0]?.description,
      secondDoseDate: vaccine?.doses[1]?.date_taken_specific
        ? moment(vaccine.doses[1].date_taken_specific).toDate()
        : undefined,
      secondBatchNumber: vaccine?.doses[1]?.batch_number,
      secondBrand: vaccine?.doses[1]?.brand,
      secondDescription: vaccine?.doses[1]?.description,
    };
  };

  return (
    <Screen profile={assessmentData.patientData.profile} navigation={navigation}>
      <Header>
        <HeaderText>{i18n.t('vaccines.your-vaccine.title')}</HeaderText>
      </Header>

      {renderFindInfoLink}

      <Formik
        initialValues={{ ...buildInitialValues(assessmentData.vaccineData) }}
        validationSchema={registerSchema}
        onSubmit={(formData: AboutYourVaccineData) =>
          // Show an alert if any date value has changed. The prompt confirm will call processFormDataForSubmit.
          dateHasBeenEdited(formData) ? checkDateChangePrompt(formData) : processFormDataForSubmit(formData)
        }>
        {(props: FormikProps<AboutYourVaccineData>) => {
          return (
            <Form style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 16 }}>
                {renderFirstDoseUI(props)}
                <Header3Text style={{ marginTop: 16, marginBottom: 8 }}>
                  {i18n.t('vaccines.your-vaccine.second-dose')}
                </Header3Text>
                <YesNoField
                  selectedValue={vaccineOrFormHasSecondDose() ? 'yes' : 'no'}
                  onValueChange={(value: string) => {
                    if (value === 'no') {
                      props.values.secondDoseDate = undefined;
                    }
                    setHasSecondDose(value);
                  }}
                  label={i18n.t('vaccines.your-vaccine.have-had-second')}
                />
                {renderSecondDoseUI(props)}
              </View>
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
