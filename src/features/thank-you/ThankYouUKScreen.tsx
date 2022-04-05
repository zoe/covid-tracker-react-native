import { BrandedButton, EFeaturedContentType, FeaturedContentList } from '@covid/components';
import { Screen } from '@covid/components/Screen';
import { ClickableText, HeaderText, RegularText } from '@covid/components/Text';
import { assessmentCoordinator } from '@covid/core/assessment/AssessmentCoordinator';
import { TAssessmentInfosRequest } from '@covid/core/assessment/dto/AssessmentInfosRequest';
import { appActions } from '@covid/core/state/app/slice';
import { incrementTimesSeenLFTPrompt, updateDateLastSeenLFTPrompt } from '@covid/core/state/covid-tests/slice';
import { TStateCovidTests } from '@covid/core/state/covid-tests/types';
import {
  showHealthProfileStartCard,
  TStateHealthProfile,
  updateHasSeenHealthProfileReminderModal,
} from '@covid/core/state/health-profile/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { ImpactTimelineCard } from '@covid/features/anniversary';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CovidTestLFTPromptModal } from '@covid/features/covid-tests/modals/CovidTestLFTPromptModal';
import { HealthProfileReminderModal } from '@covid/features/health-profile/modals/HealthProfileReminderModal';
import { AppRating, shouldAskForRating } from '@covid/features/thank-you/components/AppRating';
import { BigGreenTickFilled } from '@covid/features/thank-you/components/BigGreenTick';
import { ShareAppCard } from '@covid/features/thank-you/components/ShareApp';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { TScreenParamList } from '@covid/routes/types';
import { assessmentService } from '@covid/services';
import { sizes } from '@covid/themes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '@theme';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { batch, useDispatch, useSelector } from 'react-redux';

interface IProps {
  route: RouteProp<TScreenParamList, 'ThankYouUK'>;
}

const SHOW_ONBOARDING_DELAY_MS = 750;

type TCovidSymptoms = keyof TAssessmentInfosRequest;
const selectedCovidSymptoms: TCovidSymptoms[] = [
  'runny_nose',
  'fatigue',
  'sore_throat',
  'headache',
  'sneezing',
  'persistent_cough',
  'hoarse_voice',
  'chills_or_shivers',
  'unusual_joint_pains',
  'loss_of_smell',
  'fever',
];

export const covidSymptomPresent = (assessmentObject: Partial<TAssessmentInfosRequest>) => {
  return selectedCovidSymptoms.some(
    (symptom) =>
      assessmentObject[symptom] !== false && assessmentObject[symptom] !== 'no' && assessmentObject[symptom] !== null,
  );
};

export default function ThankYouUKScreen(props: IProps) {
  const dispatch = useDispatch();
  const shouldShowLFTPromptBasedOnPastRecords =
    assessmentCoordinator.assessmentData?.patientData?.patientInfo?.should_show_lft_prompt;
  const shouldShowLFTReminderBasedOnPastRecords =
    assessmentCoordinator.assessmentData?.patientData?.patientInfo?.should_show_lft_reminder;

  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const healthProfileState = useSelector<TRootState, TStateHealthProfile>((state) => state.healthProfile);

  const currentAssessment = assessmentService.getCurrentAssessment();
  const covidTestsState = useSelector<TRootState, TStateCovidTests>((state) => state.covidTests);
  const currentPatientId = currentAssessment.patient || '';
  const lftPromptStateForCurrentPatient = covidTestsState?.lftPrompt[currentPatientId];

  const [askForRating, setAskForRating] = React.useState<boolean>(false);
  const [showHealthProfileReminderModal, setShowHealthProfileReminderModal] = React.useState<boolean>(false);
  const [showLFTPromptModal, setShowLFTPromptModal] = React.useState<boolean>(false);

  const fiveDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(5, 'days').toDate();
  const sevenDaysAgo = moment().add(moment().utcOffset(), 'minutes').subtract(7, 'days').toDate();

  const showLFTPromptInitial = () => {
    return (
      shouldShowLFTPromptBasedOnPastRecords &&
      covidSymptomPresent(currentAssessment) &&
      !lftPromptStateForCurrentPatient?.currentPatientLoggedToday &&
      lftPromptStateForCurrentPatient?.timesSeenLFTPrompt === 0
    );
  };

  const showLFTPromptReminder = () => {
    return (
      shouldShowLFTReminderBasedOnPastRecords &&
      covidSymptomPresent(currentAssessment) &&
      !lftPromptStateForCurrentPatient?.currentPatientLoggedToday &&
      lftPromptStateForCurrentPatient?.timesSeenLFTPrompt === 1 &&
      new Date(lftPromptStateForCurrentPatient.dateLastSeenLFTPrompt) < fiveDaysAgo
    );
  };

  React.useEffect(() => {
    (async () => {
      if (startupInfo?.show_modal === 'mental-health-playback') {
        dispatch(appActions.setModalMentalHealthPlaybackVisible(true));
        return;
      }

      if (showLFTPromptInitial() || showLFTPromptReminder()) {
        setShowLFTPromptModal(true);
        return;
      }

      if (startupInfo?.show_study_hub_onboarding && startupInfo?.wider_health_studies_consent) {
        setTimeout(() => {
          NavigatorService.goBack();
          NavigatorService.jumpTo('StudiesList');
        }, SHOW_ONBOARDING_DELAY_MS);
        return;
      }
      if (
        healthProfileState.dateOfLastUpdate &&
        new Date(healthProfileState.dateOfLastUpdate) < sevenDaysAgo &&
        !healthProfileState.hasSeenReminderModal &&
        healthProfileState.progressPercent < 100 &&
        healthProfileState.screenToReturnTo !== 'HPThankYou'
      ) {
        setShowHealthProfileReminderModal(true);
        return;
      }
      if (
        startupInfo?.show_modal === 'health-profile-intro' &&
        !healthProfileState.dateOfLastUpdate &&
        !assessmentCoordinator.assessmentData?.patientData?.profile?.reported_by_another
      ) {
        dispatch(appActions.setModalHealthProfileIntroVisible(true));
        dispatch(showHealthProfileStartCard(true));
        return;
      }

      try {
        const ratingAskResponse = await shouldAskForRating();
        setAskForRating(ratingAskResponse);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Ask for rating call failed with error: ${e}`);
      }
    })();
  }, []);

  const onHealthProfileReminderModalClose = React.useCallback(() => {
    dispatch(updateHasSeenHealthProfileReminderModal(true));
    setShowHealthProfileReminderModal(false);
  }, []);

  const onLFTPromptModalClose = React.useCallback(() => {
    batch(() => {
      dispatch(incrementTimesSeenLFTPrompt(currentPatientId));
      dispatch(updateDateLastSeenLFTPrompt({ dateLastSeenLFTPrompt: new Date(), patientId: currentPatientId }));
    });
    setShowLFTPromptModal(false);
  }, []);

  return (
    <>
      {askForRating && <AppRating />}

      <CovidTestLFTPromptModal onRequestClose={onLFTPromptModalClose} visible={showLFTPromptModal} />

      {showHealthProfileReminderModal &&
        !assessmentCoordinator.assessmentData?.patientData?.profile?.reported_by_another && (
          <HealthProfileReminderModal
            onRequestClose={onHealthProfileReminderModalClose}
            visible={showHealthProfileReminderModal}
          />
        )}
      <Screen backgroundColor={colors.backgroundSecondary} testID="thank-you-screen">
        <BigGreenTickFilled />

        <HeaderText style={styles.headerText}>{i18n.t('thank-you-uk.title')}</HeaderText>

        <RegularText style={styles.signOff}>{i18n.t('thank-you-uk.sign-off')}</RegularText>

        <FeaturedContentList screenName={props.route.name} type={EFeaturedContentType.ThankYou} />

        {startupInfo?.show_timeline ? (
          <ImpactTimelineCard
            onPress={() => {
              appCoordinator.goToAnniversary();
            }}
            size="LARGE"
          />
        ) : null}

        <ShareAppCard />

        <BrandedButton
          onPress={() => assessmentCoordinator.gotoNextScreen(props.route.name)}
          style={styles.ctaSingleProfile}
          testID="button-complete"
        >
          <RegularText style={styles.ctaSingleProfileText}>{i18n.t('thank-you-uk.cta-single-profile')}</RegularText>
        </BrandedButton>

        <ClickableText onPress={() => assessmentCoordinator.gotoSelectProfile()} style={styles.ctaMultipleProfileText}>
          {i18n.t('thank-you-uk.cta-multi-profile')}
        </ClickableText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  ctaMultipleProfileText: {
    alignSelf: 'center',
    color: colors.purple,
  },
  ctaSingleProfile: {
    backgroundColor: colors.backgroundSecondary,
    borderColor: colors.brand,
    borderWidth: 1,
    marginVertical: sizes.l,
    paddingTop: sizes.xs,
  },
  ctaSingleProfileText: {
    color: colors.brand,
  },
  headerText: {
    marginTop: sizes.xl,
    textAlign: 'center',
  },
  signOff: {
    marginBottom: sizes.xl,
    marginTop: sizes.m,
    textAlign: 'center',
  },
});
