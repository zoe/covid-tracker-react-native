import { healthStudyIntroCallout, notificationReminders } from '@assets';
import { EFeaturedContentType, FeaturedContentList } from '@covid/components';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import HealthProfileReminderCard from '@covid/components/cards/HealthProfileReminderCard';
import HealthProfileStartCard from '@covid/components/cards/HealthProfileStartCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import { patientService } from '@covid/core/patient/PatientService';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { fetchLocalTrendline, fetchNewlySymptomaticData, updateTodayDate } from '@covid/core/state/content/slice';
import { TStateHealthProfile } from '@covid/core/state/health-profile/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/components/CollapsibleHeaderScrollView';
import { CompactHeader } from '@covid/features/dashboard/components/CompactHeader';
import { ExpandedHeader } from '@covid/features/dashboard/components/ExpandedHeader';
import { NewlySymptomaticCard } from '@covid/features/dashboard/components/NewlySymptomaticCard';
import ReBrandModal from '@covid/features/rebrand';
import { OnboardingContext } from '@covid/features/tab-navigation/OnboardingContext';
import { useStartReconsent } from '@covid/features/wider-health-studies/hooks/useStartReconsent';
import { TScreenParamList } from '@covid/routes/types';
import { pushNotificationService } from '@covid/services';
import { sizes, styling } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { appActions } from '@health-study/redux/app';
import { useAppState } from '@health-study/redux/app/selectors';
import { store } from '@health-study/redux/store';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React from 'react';
import { Image, Platform, Pressable, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { covidStyles, healthStudyStyles } from './DashboardUKStyle';

const headerConfig = {
  compact: sizes.headerCompactHeight,
  expanded: sizes.headerExpandedHeight,
};

interface IProps {
  navigation: DrawerNavigationProp<TScreenParamList>;
  route: RouteProp<TScreenParamList, 'DashboardUK'>;
}

const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

const onMoreDetails = () => openWebLink('https://covid.joinzoe.com/data');

const ZOE_HEALTH_STUDY_LEARN_MORE_LINK =
  'https://covid.joinzoe.com/post/introducing-the-zoe-health-study/?utm_source=App';

export function DashboardUKScreen({ navigation, route }: IProps) {
  const app = useSelector(useAppState);
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const patientId = useSelector<TRootState, string>((state) => state.user.patients[0]);
  const healthProfileState = useSelector<TRootState, TStateHealthProfile>((state) => state.healthProfile);

  const [showTrendline, setShowTrendline] = React.useState<boolean>(false);
  const [shouldShowReminders, setShouldShowReminders] = React.useState(false);

  const startReconsent = useStartReconsent();

  const dispatch = useDispatch();
  const updateHasSeenReBrandModal = React.useCallback(async () => {
    store.dispatch(appActions.setReBrandVisible(true));
    store.dispatch(appActions.setModalReBrandVisible(false));
    await patientService.updatePatientInfo(patientId, { has_seen_rebrand_modal: true });
  }, []);

  // TODO: Can we move this into app initialisation?
  React.useEffect(() => {
    (async () => {
      await pushNotificationService.subscribeForPushNotifications();
      setShouldShowReminders(!(await pushService.isGranted()));
    })();
  }, []);

  React.useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
    });
  }, []);

  React.useEffect(() => {
    if (appCoordinator.shouldShowTrendline()) {
      dispatch(fetchLocalTrendline());
      setShowTrendline(true);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchNewlySymptomaticData());
    }, []),
  );

  React.useEffect(() => {
    Linking.addEventListener('url', () => {});
  }, []);

  React.useEffect(() => {
    if (startupInfo?.show_research_consent) {
      setTimeout(() => startReconsent('Dashboard'), 500);
    } else if (!startupInfo?.show_study_hub_onboarding) {
      store.dispatch(appActions.setReBrandVisible(true));
      store.dispatch(appActions.setModalReBrandVisible(false));
    } else {
      store.dispatch(appActions.setReBrandVisible(true));
    }
  }, []);

  const onPressReport = React.useCallback(() => appCoordinator.gotoNextScreen(route.name), []);

  const compactHeader = React.useMemo(() => <CompactHeader onPress={onPressReport} />, []);
  const expandedHeader = React.useMemo(() => <ExpandedHeader onPress={onPressReport} />, []);

  const windowDimensions = useWindowDimensions();
  const onboardingContext = React.useContext(OnboardingContext);

  const styles = app.toggleReBrand ? healthStudyStyles : covidStyles;
  return (
    <>
      {app.modalReBrandVisible && (
        <ReBrandModal onRequestClose={() => updateHasSeenReBrandModal()} visible={app.modalReBrandVisible} />
      )}
      {Platform.OS === 'android' && onboardingContext.showProfileTabOnboarding ? (
        // Needed for Android. Doesn't recognise overlay in the TabNavigator because overlay there is bounded by the size of the TabNavigator.
        <Pressable
          onPress={onboardingContext.closeProfileTabOnboarding}
          style={[styles.overlay, { height: windowDimensions.height, width: windowDimensions.width }]}
        />
      ) : null}
      {Platform.OS === 'android' && onboardingContext.showStudyTabOnboarding ? (
        // Needed for Android. Doesn't recognise overlay in the TabNavigator because overlay there is bounded by the size of the TabNavigator.
        <Pressable
          onPress={onboardingContext.closeStudyTabOnboarding}
          style={[styles.overlay, { height: windowDimensions.height, width: windowDimensions.width }]}
        />
      ) : null}
      <CollapsibleHeaderScrollView
        isInsideTabBar
        compactHeader={compactHeader}
        config={headerConfig}
        expandedHeader={expandedHeader}
      >
        <View style={styles.calloutContainer}>
          {shouldShowReminders ? (
            <ExternalCallout
              aspectRatio={1244.0 / 368.0}
              calloutID="notificationReminders"
              imageSource={notificationReminders}
              postClicked={PushNotificationService.openSettings}
              screenName={route.name}
            />
          ) : null}

          {healthProfileState.dateOfLastUpdate &&
          healthProfileState.progressPercent < 100 &&
          healthProfileState.screenToReturnTo !== 'HPThankYou' ? (
            <HealthProfileReminderCard
              maxSteps={healthProfileState.maxSteps}
              progressPercent={healthProfileState.progressPercent}
              screenToReturnTo={healthProfileState.screenToReturnTo}
              stepsCompleted={healthProfileState.stepsCompleted}
            />
          ) : healthProfileState.showHealthProfileStartCard && !healthProfileState.dateOfLastUpdate ? (
            <HealthProfileStartCard />
          ) : null}
          {app.toggleReBrand ? (
            <TouchableOpacity
              accessible
              accessibilityRole="button"
              onPress={() => openWebLink(ZOE_HEALTH_STUDY_LEARN_MORE_LINK)}
              style={{
                aspectRatio: 2.8,
                marginTop: 10,
                minWidth: '100%',
                overflow: 'hidden',
              }}
            >
              <Image resizeMode="repeat" source={healthStudyIntroCallout} style={{ maxWidth: '100%' }} />
            </TouchableOpacity>
          ) : null}
          <UKEstimatedCaseCard onPress={onMoreDetails} />
          <FeaturedContentList screenName={route.name} type={EFeaturedContentType.Home} />
          <NewlySymptomaticCard />
          {showTrendline ? <TrendlineCard onPress={appCoordinator.goToTrendline} /> : null}
          <EstimatedCasesMapCard />
        </View>

        <PoweredByZoeSmall style={styling.marginVertical} />
      </CollapsibleHeaderScrollView>
    </>
  );
}
