import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Form, Text } from 'native-base';
import React, { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import Screen, { Header } from '@covid/components/Screen';
import { BrandedButton, ClickableText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import i18n from '@covid/locale/i18n';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { Dose, VaccineBrands, VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';
import { ValidationError } from '@covid/components/ValidationError';
import { VaccineDoseData, VaccineDoseQuestion } from '@covid/features/vaccines/fields/VaccineDoseQuestion';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { colors } from '@theme';
import QuestionCircle from '@assets/icons/QuestionCircle';
import YesNoField from '@covid/components/YesNoField';
import { formatDateToPost } from '@covid/utils/datetime';

import { IVaccineService } from '../../core/vaccine/VaccineService';

type Props = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

const registerSchema = Yup.object().shape({}).concat(VaccineDoseQuestion.schema());

interface AboutYourVaccineData extends VaccineDoseData {}

export const AboutYourVaccineScreen: React.FC<Props> = ({ route, navigation }) => {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [hasSecondDose, setHasSecondDose] = useState<string | undefined>(undefined);
  const { assessmentData } = route.params;

  function vaccineOrFormHasSecondDose() {
    if (
      assessmentData.vaccineData &&
      assessmentData.vaccineData.doses[0] &&
      assessmentData.vaccineData.brand === VaccineBrands.JOHNSON
    ) {
      return false;
    }

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

      // if setHasSecondDose is manually set to 'no', the data will not be saved (even if entered)
      if (vaccineOrFormHasSecondDose()) {
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
      } else {
        // unlinking a "deleted" dose needs work in this ticket:
        //https://www.notion.so/joinzoe/Delete-vaccine-dose-if-user-sets-second-to-no-on-edit-2dbfcaad27e44068af02ce980e5a98da
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
      <VaccineDoseQuestion formikProps={props as FormikProps<VaccineDoseData>} firstDose />
    </>
  );

  const renderSecondDoseUI = (props: FormikProps<VaccineDoseData>) =>
    vaccineOrFormHasSecondDose() ? (
      <VaccineDoseQuestion formikProps={props as FormikProps<VaccineDoseData>} firstDose={false} />
    ) : null;

  const renderFindInfoLink = (
    <TouchableOpacity style={{ margin: 16 }} onPress={() => assessmentCoordinator.goToVaccineFindInfo()}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.1 }}>
          <QuestionCircle colorIcon={colors.linkBlue} />
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

    const doses: Partial<Dose>[] = assessmentData.vaccineData.doses;
    const dose1Date = doses[0]?.date_taken_specific;
    const dose2Date = doses[1]?.date_taken_specific;
    const formDate1 = formatDateToPost(formData.firstDoseDate);
    const formDate2 = formatDateToPost(formData.secondDoseDate);
    const date1Changed = dose1Date !== formDate1;
    const date2Changed = dose2Date !== undefined && dose2Date !== formDate2;

    return date1Changed || date2Changed;
  };

  const buildInitialValues = (vaccine?: VaccineRequest): VaccineDoseData => {
    return {
      firstDoseDate: vaccine?.doses[0]?.date_taken_specific
        ? moment(vaccine.doses[0].date_taken_specific).toDate()
        : undefined,
      firstBatchNumber: vaccine?.doses[0]?.batch_number ?? '',
      firstBrand: vaccine?.doses[0]?.brand ?? undefined,
      firstDescription: vaccine?.doses[0]?.description,
      secondDoseDate: vaccine?.doses[1]?.date_taken_specific
        ? moment(vaccine.doses[1].date_taken_specific).toDate()
        : undefined,
      secondBatchNumber: vaccine?.doses[1]?.batch_number ?? '',
      secondBrand: vaccine?.doses[1]?.brand ?? undefined,
      secondDescription: vaccine?.doses[1]?.description,
    };
  };

  const renderDeleteButton = () =>
    assessmentData.vaccineData?.id ? (
      <ClickableText onPress={() => promptDeleteVaccine()} style={styles.clickableText}>
        {i18n.t('vaccines.your-vaccine.delete')}
      </ClickableText>
    ) : null;

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
          // Show an alert if any date value has changed. The prompt confirm will call processFormDataForSubmit thereafter.
          dateHasBeenEdited(formData) ? checkDateChangePrompt(formData) : processFormDataForSubmit(formData)
        }>
        {(props: FormikProps<AboutYourVaccineData>) => {
          return (
            <Form style={{ flex: 1 }}>
              <View style={{ marginHorizontal: 16, marginBottom: 32 }}>
                {renderFirstDoseUI(props)}
                {props.values.firstBrand && props.values.firstBrand !== VaccineBrands.JOHNSON && (
                  <>
                    <Header3Text style={{ marginTop: 48, marginBottom: 8 }}>
                      {i18n.t('vaccines.your-vaccine.second-dose')}
                    </Header3Text>

                    <YesNoField
                      selectedValue={vaccineOrFormHasSecondDose() ? 'yes' : 'no'}
                      onValueChange={(value: string) => {
                        props.values.hasSecondDose = value === 'yes';
                        if (value === 'no') {
                          props.values.secondDoseDate = undefined;
                        }
                        setHasSecondDose(value);
                      }}
                      label={i18n.t('vaccines.your-vaccine.have-had-second')}
                    />
                    {renderSecondDoseUI(props)}
                  </>
                )}
              </View>
              {!!Object.keys(props.errors).length && props.submitCount > 0 && (
                <ValidationError style={{ marginBottom: 32 }} error={i18n.t('validation-error-text')} />
              )}

              <BrandedButton onPress={props.handleSubmit}>
                <Text>{i18n.t('vaccines.your-vaccine.confirm')}</Text>
              </BrandedButton>
              {renderDeleteButton()}
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
