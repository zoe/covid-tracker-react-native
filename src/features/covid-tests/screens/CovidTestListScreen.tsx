import { BrandedButton, Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { patientService } from '@covid/core/patient/PatientService';
import { updateShowOmicronModal } from '@covid/core/state';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { getInitialRouteName } from '@covid/features/covid-tests/helpers';
import { CovidTestListOnboardingModal } from '@covid/features/covid-tests/modals/CovidTestListOnboardingModal';
import { CovidTestTrackingOmicronModal } from '@covid/features/covid-tests/modals/CovidTestTrackingOmicronModal';
import CovidTestTabbedListsScreen from '@covid/features/covid-tests/screens/CovidTestTabbedListsScreen';
import i18n from '@covid/locale/i18n';
import { TScreenParamList } from '@covid/routes/types';
import { sizes } from '@covid/themes';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestList'>;
  route: RouteProp<TScreenParamList, 'CovidTestList'>;
}

export default function CovidTestListScreen(props: IProps) {
  const [covidTests, setCovidTests] = React.useState<TCovidTest[]>([]);
  const [error, setError] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showOnboardingModal, setShowOnboardingModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);

  const closeListOnboardingModal = React.useCallback(() => {
    setShowOnboardingModal(false);
  }, []);

  const closeTrackingOmicronModal = React.useCallback(async () => {
    // Update the Redux state immediately because the api calls could take a long time to finish.
    dispatch(updateShowOmicronModal(false));
    await patientService.updatePatientInfo(patientId, {
      has_seen_omicron_modal: true,
    });
  }, [patientId]);

  useFocusEffect(
    React.useCallback(() => {
      if (startupInfo?.show_covid_test_onboarding && !assessmentCoordinator.isReportedByOther()) {
        setShowOnboardingModal(true);
      }

      let isActive = true;

      const fetchTestList = async () => {
        setIsLoading(true);
        try {
          const tests = (await covidTestService.listTests()).data;
          const patientTests = tests.filter(
            (t) => t.patient === assessmentCoordinator.assessmentData?.patientData?.patientId,
          );
          if (isActive) {
            setCovidTests(patientTests);
            setIsLoading(false);
          }
        } catch (_) {
          setError(i18n.t('something-went-wrong'));
          setIsLoading(false);
        }
      };

      fetchTestList();

      return () => {
        isActive = false;
      };
    }, [startupInfo?.show_covid_test_onboarding]),
  );

  const gotoAddTest = React.useCallback(() => assessmentCoordinator.goToAddEditTest(), []);

  const handleNextButton = React.useCallback(
    () => assessmentCoordinator.gotoNextScreen(props.route.name),
    [props.route.name],
  );

  const initialRouteName = getInitialRouteName(props.route.params?.mechanism, props.route.params?.is_rapid_test);

  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      testID="covid-test-list-screen"
    >
      {!showOnboardingModal ? null : (
        <CovidTestListOnboardingModal
          onRequestClose={closeListOnboardingModal}
          patientId={assessmentCoordinator.assessmentData?.patientData?.patientId}
          visible={showOnboardingModal}
        />
      )}

      <CovidTestTrackingOmicronModal
        onRequestClose={closeTrackingOmicronModal}
        visible={!!startupInfo?.show_omicron_modal}
      />

      <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('covid-test-list.title')} />

      {covidTests.length ? null : (
        <RegularText style={styles.marginTop} testID="covid-test-list-introduction">
          {i18n.t('covid-test-list.text')}
        </RegularText>
      )}

      <BrandedButton onPress={gotoAddTest} style={styles.newButton} testID="button-add-test">
        <Text style={styles.newText}>{i18n.t('covid-test-list.add-new-test')}</Text>
      </BrandedButton>

      {covidTests.length ? (
        <Text style={styles.tabTitle} textAlign="center" textClass="h4Medium">
          {i18n.t('covid-test-list.tabs-title')}
        </Text>
      ) : null}

      {isLoading ? (
        <Loading error={null} status="" />
      ) : covidTests.length ? (
        <CovidTestTabbedListsScreen covidTests={covidTests} initialRouteName={initialRouteName} />
      ) : null}

      {error ? <ErrorText style={{ textAlign: 'center' }}>{error}</ErrorText> : null}

      <View style={{ flex: 1 }} />

      <BrandedButton onPress={handleNextButton} testID="button-covid-test-list-screen">
        <Text style={{ color: colors.white }}>
          {covidTests.length === 0 ? i18n.t('covid-test-list.never-had-test') : i18n.t('information-correct')}
        </Text>
      </BrandedButton>
    </Screen>
  );
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: sizes.l,
  },
  newButton: {
    backgroundColor: colors.backgroundTertiary,
    marginBottom: sizes.m,
    marginTop: sizes.l,
  },
  newText: {
    color: colors.primary,
  },
  tabTitle: {
    color: colors.secondary,
  },
});
