import { Text } from '@covid/components';
import { Loading } from '@covid/components/Loading';
import { ProgressHeader } from '@covid/components/ProgressHeader';
import { Screen } from '@covid/components/Screen';
import { ErrorText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { populatePatientLFTState, updateCurrentPatientLoggedToday } from '@covid/core/state/covid-tests/slice';
import { TStateCovidTests } from '@covid/core/state/covid-tests/types';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { covidTestService } from '@covid/core/user/CovidTestService';
import { TCovidTest } from '@covid/core/user/dto/CovidTestContracts';
import { ECovidTestMechanismOptions, TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { isPrimaryPatient } from '@covid/features/0-v2/utils/helpers';
import { CovidLFTQuickReport } from '@covid/features/covid-tests/components/CovidLFTQuickReport';
import { getInitialRouteName } from '@covid/features/covid-tests/helpers';
import CovidTestTabbedListsScreen from '@covid/features/covid-tests/screens/CovidTestTabbedListsScreen';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { dateIsToday } from '@covid/utils/datetime';
import { useToggleRebrand } from '@health-study/redux/app/selectors';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '@theme';
import Button from '@tracer/components/atoms/Button';
import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles } from './CovidTestListScreenStyle';

interface IProps {
  navigation: StackNavigationProp<TScreenParamList, 'CovidTestList'>;
  route: RouteProp<TScreenParamList, 'CovidTestList'>;
}

const getTodaysLFT = (covidTests: TCovidTest[]) => {
  // .find works because backend returns tests reverse chronologically, although only by date, not time.
  // This means the first LFT result logged will be picked (if more than one done in the day).
  const todaysTest = covidTests.find(
    (test) =>
      test.mechanism === ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB &&
      test.is_rapid_test &&
      dateIsToday(test.date_taken_specific),
  );
  return todaysTest;
};

const checkIfPatientLoggedPCRLFTToday = (covidTests: TCovidTest[]) => {
  const loggedLFTPCRTestToday = covidTests.find(
    (test) =>
      test.mechanism === ECovidTestMechanismOptions.NOSE_OR_THROAT_SWAB && dateIsToday(test.date_taken_specific),
  );
  return !!loggedLFTPCRTestToday;
};

export default function CovidTestListScreen(props: IProps) {
  const [covidTests, setCovidTests] = React.useState<TCovidTest[]>([]);
  const [error, setError] = React.useState<string>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [todaysLFT, setTodaysLFT] = React.useState<TCovidTest>();

  const toggleReBrand = useSelector(useToggleRebrand);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const styles = toggleReBrand ? healthStudyStyles : covidStyles;

  const dispatch = useDispatch();

  const covidTestsState = useSelector<TRootState, TStateCovidTests>((state) => state.covidTests);
  const currentPatient = assessmentCoordinator.assessmentData?.patientData;
  const currentPatientId = assessmentCoordinator.assessmentData?.patientData?.patientId;

  const initLFTPromptStateIfUndefined = () => {
    if (covidTestsState && !covidTestsState.lftPrompt[currentPatientId]) {
      dispatch(populatePatientLFTState(currentPatientId));
    }
  };

  const fetchTestList = async () => {
    setIsLoading(true);
    try {
      const tests = (await covidTestService.listTests()).data;
      const patientTests = tests.filter((t) => t.patient === currentPatientId);
      setCovidTests(patientTests);
      setTodaysLFT(getTodaysLFT(patientTests));

      if (checkIfPatientLoggedPCRLFTToday(patientTests)) {
        dispatch(
          updateCurrentPatientLoggedToday({
            currentPatientLoggedToday: true,
            patientId: currentPatientId,
          }),
        );
      }
    } catch (_) {
      setError(i18n.t('something-went-wrong'));
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    initLFTPromptStateIfUndefined();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive) {
        fetchTestList();
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  const gotoAddTest = React.useCallback(() => assessmentCoordinator.goToAddEditTest(), []);

  const handleNextButton = React.useCallback(
    () => assessmentCoordinator.gotoNextScreen(props.route.name),
    [props.route.name],
  );

  const goToAssessmentFlowV1 = React.useCallback(() => NavigatorService.navigate('AssessmentPage1ShowUsualSelf'), []);
  const goToUsualSelf = React.useCallback(() => NavigatorService.navigate('UsualSelfIntroScreen'), []);
  const goToProfileTab = React.useCallback(() => NavigatorService.navigate('Profile'), []);

  const initialRouteName = getInitialRouteName(props.route.params?.mechanism, props.route.params?.is_rapid_test);

  const fromDailyAssessmentFlow = () => {
    try {
      const routes = props.navigation.getState().routes;
      const prevRoute = routes[routes.length - 2];
      const penultimateRoute = routes[routes.length - 3];

      const dailyFlowHealthWorker =
        penultimateRoute.name === 'SelectProfile' && prevRoute.name === 'HealthWorkerExposure';

      return prevRoute.name === 'SelectProfile' || dailyFlowHealthWorker;
    } catch {
      return false;
    }
  };

  const makeStartAssessmentFlowButton = () => {
    const primaryPatient = isPrimaryPatient(currentPatient);
    const { skipV1Flow = false } = props.route.params || {};

    const useAssessmentFlowV1 =
      primaryPatient && startupInfo?.use_assessment_flow_v1 && startupInfo?.show_assessment_flow_v1;
    const useUsualSelfSetup =
      primaryPatient && startupInfo?.use_assessment_flow_v1 && !startupInfo.show_assessment_flow_v1;

    if (!skipV1Flow && (useAssessmentFlowV1 || useUsualSelfSetup))
      return (
        <Button
          onPress={useAssessmentFlowV1 ? goToAssessmentFlowV1 : goToUsualSelf}
          style={styles.transparentButton}
          testID="button-covid-test-list-assessment-v0"
          text={covidTests.length === 0 ? i18n.t('done') : i18n.t('information-correct')}
          textStyle={styles.transparentButtonText}
        />
      );

    return (
      <Button
        buttonType="secondary"
        onPress={handleNextButton}
        style={[styles.newButton, styles.nextButtonV0Flow]}
        testID="button-covid-test-list-screen"
        text={covidTests.length === 0 ? i18n.t('covid-test-list.never-had-test') : i18n.t('information-correct')}
        textStyle={styles.footerBtnTxt}
      />
    );
  };

  const renderFooter = () => (
    <View style={styles.wrapper}>
      {startupInfo?.show_assessment_flow_v0 &&
      !fromDailyAssessmentFlow() &&
      isGBCountry() &&
      !assessmentCoordinator.isReportedByOther() ? (
        <Button
          onPress={goToProfileTab}
          style={styles.transparentButton}
          testID="button-covid-test-list-assessment-v0"
          text={i18n.t('done')}
          textStyle={styles.transparentButtonText}
        />
      ) : (
        makeStartAssessmentFlowButton()
      )}
    </View>
  );

  return (
    <Screen
      backgroundColor={colors.backgroundPrimary}
      profile={assessmentCoordinator.assessmentData?.patientData?.patientState?.profile}
      renderFooter={renderFooter}
      testID="covid-test-list-screen"
    >
      <ProgressHeader currentStep={0} maxSteps={1} title={i18n.t('covid-test-list.title')} />

      {isGBCountry() && startupInfo?.show_lft_quick_reporting ? (
        <CovidLFTQuickReport onSuccessfulAdd={fetchTestList} todaysLFT={todaysLFT} />
      ) : covidTests.length ? null : (
        <RegularText style={styles.marginTop} testID="covid-test-list-introduction">
          {i18n.t('covid-test-list.text')}
        </RegularText>
      )}

      <Button
        buttonType="secondary"
        onPress={gotoAddTest}
        style={styles.newButton}
        testID="button-add-test"
        text={i18n.t('covid-test-list.add-new-test')}
        textStyle={styles.txtStyle}
      />

      {covidTests.length === 0 ? (
        <Text style={styles.tabTitle} textAlign="center" textClass="h4Medium">
          {i18n.t('covid-test-list.tabs-info-title')}
        </Text>
      ) : null}

      {isLoading ? (
        <Loading error={null} status="" />
      ) : covidTests.length ? (
        <CovidTestTabbedListsScreen covidTests={covidTests} initialRouteName={initialRouteName} />
      ) : null}

      {error ? <ErrorText style={{ textAlign: 'center' }}>{error}</ErrorText> : null}
    </Screen>
  );
}
