import InfoCircle from '@assets/icons/InfoCircle';
import { BrandedButton, ErrorText, RegularTextWithBoldInserts, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { isSECountry } from '@covid/core/localisation/LocalisationService';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { EVaccineMechanisms, EVaccineTypes, TDose, TVaccineRequest } from '@covid/core/vaccine/dto/VaccineRequest';
import { vaccineService } from '@covid/core/vaccine/VaccineService';
import { getInitialRouteName } from '@covid/features/vaccines/helpers';
import { VaccineFluOnboardingModal } from '@covid/features/vaccines/modals/VaccineFluOnboardingModal';
import { VaccineListNewFeatureModal } from '@covid/features/vaccines/modals/VaccineListNewFeatureModal';
import { VaccineTabbedListsScreen } from '@covid/features/vaccines/screens/VaccineTabbedListsScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

type TProps = {
  route: RouteProp<TScreenParamList, 'VaccineList'>;
};

const HIT_SLOP = {
  bottom: 12,
  left: 12,
  right: 12,
  top: 12,
};

// Local adverse effects screen should only be shown for flu vaccines via injection OR all COVID vaccines
const isNotInjectionFluVaccine = (dose: TDose) =>
  dose.mechanism === EVaccineMechanisms.NASAL_SPRAY || dose.mechanism === EVaccineMechanisms.DONT_KNOW;

export const VaccineListScreen: React.FC<TProps> = (props) => {
  const [error, setError] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showNewFeatureModal, setShowNewFeatureModal] = React.useState<boolean>(false);
  const [showOnboardingModal, setShowOnboardingModal] = React.useState<boolean>(false);
  const [vaccine, setVaccine] = React.useState<TVaccineRequest | undefined>();

  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  const patientId = props.route.params?.assessmentData?.patientData?.patientId;

  const initialRouteName = getInitialRouteName(props.route.params?.vaccineType);

  let isActive = false;

  const fetchVaccineList = async () => {
    isActive = true;
    setLoading(true);
    try {
      const response = await vaccineService.listVaccines();
      const patientVaccines = response.filter((patientVaccine) => patientVaccine.patient === patientId);
      // Set the "patientVaccine" to be the first item returned, in order to maintain backwards compatibility with older versions that may have multiple
      const patientVaccine: TVaccineRequest | undefined = patientVaccines.length ? patientVaccines[0] : undefined;

      if (isActive) {
        setVaccine(patientVaccine);
        setLoading(false);
      }
    } catch (_) {
      setError(i18n.t('something-went-wrong'));
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchVaccineList();
      if (startupInfo?.show_flu_vaccine_onboarding && !assessmentCoordinator.isReportedByOther()) {
        setShowOnboardingModal(true);
      }

      return () => {
        isActive = false;
      };
    }, [startupInfo?.show_flu_vaccine_onboarding]),
  );

  const navigateToNextPage = async () => {
    if (vaccine) {
      let doseId = null;

      // Loops over all the doses and return the first dose that has a date in the last 7 days.
      const today = moment().add(moment().utcOffset(), 'minutes').toDate();
      const sevenDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(7, 'days').toDate();

      for (let j = 0; j < vaccine.doses?.length; j++) {
        const dose = vaccine.doses[j];
        if (dose.date_taken_specific) {
          const doseDate = moment(dose.date_taken_specific).toDate();
          if (sevenDaysAgo <= doseDate && doseDate <= today && !isNotInjectionFluVaccine(dose)) {
            doseId = dose.id;
            break;
          }
        }
      }

      const shouldAskDoseSymptoms = !!doseId;
      assessmentCoordinator.gotoNextScreen(props.route.name, { dose: doseId, shouldAskDoseSymptoms });
    } else {
      assessmentCoordinator.gotoNextScreen(props.route.name, {});
    }
  };

  const enableNext = () => {
    const doses = vaccine?.doses;
    // Disable button if user has COVID vaccine dose(s) with missing date or brand
    if (
      doses &&
      doses.some(
        (dose) =>
          (dose.date_taken_specific == null || dose.brand === null) &&
          dose.vaccine_type === EVaccineTypes.COVID_VACCINE,
      )
    ) {
      return false;
    }

    return true;
  };

  const showPopup = () => {
    NavigatorService.navigate('VaccineListMissingModal', { vaccine });
  };

  const navigateToNextPageOrShowPopup = () => {
    if (enableNext()) {
      navigateToNextPage();
    } else {
      showPopup();
    }
  };

  const renderFooter = () => (
    <View style={styles.wrapper}>
      <BrandedButton
        onPress={navigateToNextPageOrShowPopup}
        testID="button-vaccine-list-screen"
        textStyle={styles.continueButton}
      >
        <Text style={{ color: colors.white }}>
          {!vaccine?.doses.length
            ? i18n.t('vaccines.vaccine-list.no-vaccine')
            : i18n.t('vaccines.vaccine-list.correct-info')}
        </Text>
      </BrandedButton>
    </View>
  );

  return (
    <Screen
      profile={props.route.params?.assessmentData?.patientData?.patientState?.profile}
      renderFooter={renderFooter}
      testID="vaccine-list-screen"
    >
      <VaccineListNewFeatureModal onRequestClose={() => setShowNewFeatureModal(false)} visible={showNewFeatureModal} />

      <VaccineFluOnboardingModal
        onRequestClose={() => setShowOnboardingModal(false)}
        patientId={assessmentCoordinator.assessmentData?.patientData?.patientId}
        visible={showOnboardingModal}
      />

      <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('vaccines.vaccine-list.title')} />
      <View style={styles.introduction} testID="vaccine-list-introduction">
        <Text>
          <RegularTextWithBoldInserts text={i18n.t('vaccines.vaccine-list.description')} />
          {isSECountry() ? null : (
            <TouchableOpacity hitSlop={HIT_SLOP} onPress={() => setShowNewFeatureModal(true)}>
              <View style={styles.paddingLeft}>
                <InfoCircle color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        </Text>
      </View>

      <BrandedButton
        onPress={() => assessmentCoordinator.goToAddEditVaccine(vaccine)}
        style={styles.newButton}
        testID="button-add-vaccine"
      >
        <Text style={styles.newText}>{i18n.t('vaccines.vaccine-list.add-button')}</Text>
      </BrandedButton>
      {vaccine ? (
        <Text style={styles.tabTitle} textAlign="center" textClass="h4Medium">
          {i18n.t('vaccines.vaccine-list.tabs-title')}
        </Text>
      ) : null}

      {loading ? (
        <Loading error={null} status="" />
      ) : vaccine ? (
        <VaccineTabbedListsScreen
          initialRouteName={initialRouteName}
          vaccineDoses={vaccine.doses}
          vaccineRecord={vaccine}
        />
      ) : null}

      {error ? <ErrorText style={{ textAlign: 'center' }}>{error}</ErrorText> : null}
    </Screen>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    color: colors.white,
  },
  introduction: {
    marginVertical: sizes.m,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginBottom: sizes.m,
  },
  newText: {
    color: colors.primary,
  },
  paddingLeft: {
    paddingLeft: sizes.xs,
  },
  rootContainer: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  tabTitle: {
    color: colors.secondary,
  },
  wrapper: {
    padding: sizes.l,
  },
});
