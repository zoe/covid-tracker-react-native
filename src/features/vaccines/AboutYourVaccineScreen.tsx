import QuestionCircle from '@assets/icons/QuestionCircle';
import { BrandedButton } from '@covid/components';
import { FormWrapper } from '@covid/components/Forms';
import Screen, { Header } from '@covid/components/Screen';
import { ClickableText, Header3Text, HeaderText, RegularText } from '@covid/components/Text';
import { ValidationError } from '@covid/components/ValidationError';
import YesNoField from '@covid/components/YesNoField';
import assessmentCoordinator from '@covid/core/assessment/AssessmentCoordinator';
import { setLoggedVaccine } from '@covid/core/state';
import { Dose, VaccineBrands, VaccineRequest, VaccineTypes } from '@covid/core/vaccine/dto/VaccineRequest';
import { IVaccineService } from '@covid/core/vaccine/VaccineService';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import { IVaccineDoseData, VaccineDoseQuestion } from '@covid/features/vaccines/fields/VaccineDoseQuestion';
import i18n from '@covid/locale/i18n';
import { useInjection } from '@covid/provider/services.hooks';
import { Services } from '@covid/provider/services.types';
import { formatDateToPost } from '@covid/utils/datetime';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import * as React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

type IProps = {
  navigation: StackNavigationProp<ScreenParamList, 'AboutYourVaccine'>;
  route: RouteProp<ScreenParamList, 'AboutYourVaccine'>;
};

const registerSchema = Yup.object().shape({}).concat(VaccineDoseQuestion.schema());

interface IAboutYourVaccineData extends IVaccineDoseData {}

export function AboutYourVaccineScreen({ route, navigation }: IProps) {
  const vaccineService = useInjection<IVaccineService>(Services.Vaccine);
  const coordinator = assessmentCoordinator;
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [hasSecondDose, setHasSecondDose] = React.useState<string | undefined>(undefined);
  const assessmentData = route.params?.assessmentData;
  const dispatch = useDispatch();

  function isJohnsonVaccine() {
    return (
      assessmentData?.vaccineData &&
      assessmentData?.vaccineData.doses[0] &&
      assessmentData?.vaccineData.brand === VaccineBrands.JOHNSON
    );
  }

  function vaccineOrFormHasSecondDose() {
    if (isJohnsonVaccine()) {
      return false;
    }

    if (hasSecondDose !== undefined) {
      return hasSecondDose === 'yes';
    }
    return assessmentData?.vaccineData && assessmentData?.vaccineData.doses[1] !== undefined;
  }

  const processFormDataForSubmit = (formData: IAboutYourVaccineData) => {
    if (!submitting) {
      setSubmitting(true);
      const vaccine: Partial<VaccineRequest> = {
        ...assessmentData?.vaccineData,
        patient: assessmentData?.patientData.patientId,
        vaccine_type: VaccineTypes.COVID_VACCINE,
      };
      const doses: Partial<Dose | undefined>[] = [];

      if (formData.firstDoseDate) {
        doses[0] = vaccine?.doses && vaccine?.doses[0] ? vaccine.doses[0] : undefined;
        const updatedDose: Partial<Dose> = {
          ...doses[0],
          batch_number: formData.firstBatchNumber,
          brand: formData.firstBrand,
          date_taken_specific: formatDateToPost(formData.firstDoseDate),
          description: formData.firstDescription,
          sequence: 1,
        };
        doses[0] = updatedDose;
      }

      // if setHasSecondDose is manually set to 'no', the data will not be saved (even if entered)
      if (vaccineOrFormHasSecondDose()) {
        doses[1] = vaccine?.doses && vaccine?.doses[1] ? vaccine.doses[1] : undefined;
        const updatedDose: Partial<Dose> = {
          ...doses[1],
          batch_number: formData.secondBatchNumber,
          brand: formData.secondBrand,
          date_taken_specific: formatDateToPost(formData.secondDoseDate),
          description: formData.secondDescription,
          sequence: 2,
        };
        doses[1] = updatedDose;
      } else {
        // unlinking a "deleted" dose needs work in this ticket:
        // https://www.notion.so/joinzoe/Delete-vaccine-dose-if-user-sets-second-to-no-on-edit-2dbfcaad27e44068af02ce980e5a98da
      }
      const updatedVaccine: Partial<VaccineRequest> = { ...vaccine, doses };
      submitVaccine(updatedVaccine);
    }
  };

  const submitVaccine = async (vaccine: Partial<VaccineRequest>) => {
    await vaccineService.saveVaccineResponse(assessmentData?.patientData.patientId, vaccine);
    dispatch(setLoggedVaccine(true));
    coordinator.gotoNextScreen(route.name);
  };

  const checkDateChangePrompt = (formData: IAboutYourVaccineData) => {
    Alert.alert(
      i18n.t('vaccines.your-vaccine.date-change-confirm'),
      i18n.t('vaccines.your-vaccine.date-change-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: () => {
            processFormDataForSubmit(formData);
          },
          text: i18n.t('confirm'),
        },
      ],
      { cancelable: false },
    );
  };

  const promptDeleteVaccine = () => {
    Alert.alert(
      i18n.t('vaccines.vaccine-list.delete-vaccine-title'),
      i18n.t('vaccines.vaccine-list.delete-vaccine-text'),
      [
        {
          style: 'cancel',
          text: i18n.t('cancel'),
        },
        {
          onPress: () => {
            vaccineService.deleteVaccine(assessmentData?.vaccineData.id).then(() => {
              coordinator.resetVaccine();
              coordinator.gotoNextScreen(route.name);
            });
          },
          style: 'destructive',
          text: i18n.t('delete'),
        },
      ],
      { cancelable: false },
    );
  };

  const renderFirstDoseUI = (props: FormikProps<IVaccineDoseData>) => (
    <>
      <Header3Text style={styles.labelStyle}>{i18n.t('vaccines.your-vaccine.first-dose')}</Header3Text>
      <VaccineDoseQuestion firstDose formikProps={props as FormikProps<IVaccineDoseData>} />
    </>
  );

  const renderSecondDoseUI = (props: FormikProps<IVaccineDoseData>) =>
    vaccineOrFormHasSecondDose() ? (
      <VaccineDoseQuestion firstDose={false} formikProps={props as FormikProps<IVaccineDoseData>} />
    ) : null;

  const renderFindInfoLink = (
    <TouchableOpacity onPress={() => assessmentCoordinator.goToVaccineFindInfo()} style={{ margin: 16 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.1 }}>
          <QuestionCircle colorIcon={colors.linkBlue} />
        </View>
        <RegularText style={{ color: colors.linkBlue, flex: 0.9 }}>{i18n.t('vaccines.find-info.link')}</RegularText>
      </View>
    </TouchableOpacity>
  );

  const dateHasBeenEdited = (formData: IAboutYourVaccineData) => {
    // This is quite verbose vs a one-line return for easier reading
    if (assessmentData?.vaccineData === undefined || assessmentData?.vaccineData.doses === undefined) {
      return false;
    }

    const { doses } = assessmentData?.vaccineData;
    const dose1Date = doses[0]?.date_taken_specific;
    const dose2Date = doses[1]?.date_taken_specific;
    const formDate1 = formatDateToPost(formData.firstDoseDate);
    const formDate2 = formatDateToPost(formData.secondDoseDate);
    const date1Changed = dose1Date !== formDate1;
    const date2Changed = dose2Date !== undefined && dose2Date !== formDate2;

    return date1Changed || date2Changed;
  };

  const buildInitialValues = (vaccine?: VaccineRequest): IVaccineDoseData => {
    return {
      firstBatchNumber: vaccine?.doses[0]?.batch_number ?? '',
      firstBrand: vaccine?.doses[0]?.brand ?? undefined,
      firstDescription: vaccine?.doses[0]?.description,
      firstDoseDate: vaccine?.doses[0]?.date_taken_specific
        ? moment(vaccine.doses[0].date_taken_specific).toDate()
        : undefined,
      secondBatchNumber: vaccine?.doses[1]?.batch_number ?? '',
      secondBrand: vaccine?.doses[1]?.brand ?? undefined,
      secondDescription: vaccine?.doses[1]?.description,
      secondDoseDate: vaccine?.doses[1]?.date_taken_specific
        ? moment(vaccine.doses[1].date_taken_specific).toDate()
        : undefined,
    };
  };

  const renderDeleteButton = () =>
    assessmentData?.vaccineData?.id ? (
      <ClickableText onPress={() => promptDeleteVaccine()} style={styles.clickableText}>
        {i18n.t('vaccines.your-vaccine.delete')}
      </ClickableText>
    ) : null;

  return (
    <Screen navigation={navigation} profile={assessmentData?.patientData.profile}>
      <Header>
        <HeaderText>{i18n.t('vaccines.your-vaccine.title')}</HeaderText>
      </Header>
      {renderFindInfoLink}
      <Formik
        validateOnChange
        initialValues={{ ...buildInitialValues(assessmentData?.vaccineData) }}
        onSubmit={(formData: IAboutYourVaccineData) =>
          // Show an alert if any date value has changed. The prompt confirm will call processFormDataForSubmit thereafter.
          dateHasBeenEdited(formData) ? checkDateChangePrompt(formData) : processFormDataForSubmit(formData)
        }
        validationSchema={registerSchema}
      >
        {(props: FormikProps<IAboutYourVaccineData>) => {
          return (
            <FormWrapper hasRequiredFields style={{ flex: 1 }}>
              <View style={{ marginBottom: 32, marginHorizontal: 16 }}>
                {renderFirstDoseUI(props)}
                {props.values.firstBrand && props.values.firstBrand !== VaccineBrands.JOHNSON ? (
                  <>
                    <Header3Text style={{ marginBottom: 8, marginTop: 48 }}>
                      {i18n.t('vaccines.your-vaccine.second-dose')}
                    </Header3Text>

                    <YesNoField
                      required
                      label={i18n.t('vaccines.your-vaccine.have-had-second')}
                      onValueChange={(value: string) => {
                        props.values.hasSecondDose = value === 'yes';
                        if (value === 'no') {
                          props.values.secondDoseDate = undefined;
                        }
                        setHasSecondDose(value);
                        props.validateForm();
                      }}
                      selectedValue={vaccineOrFormHasSecondDose() ? 'yes' : 'no'}
                    />
                    {renderSecondDoseUI(props)}
                  </>
                ) : null}
              </View>

              {!!Object.keys(props.errors).length && props.submitCount > 0 ? (
                <ValidationError error={i18n.t('validation-error-text')} style={{ marginBottom: 32 }} />
              ) : null}

              <BrandedButton enable={props.isValid && props.dirty} onPress={props.handleSubmit}>
                {i18n.t('vaccines.your-vaccine.confirm')}
              </BrandedButton>
              {renderDeleteButton()}
            </FormWrapper>
          );
        }}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  clickableText: {
    color: colors.purple,
    marginBottom: 8,
    marginTop: 24,
    textAlign: 'center',
  },
  labelStyle: {
    marginVertical: 16,
  },
});
