import { notificationReminders } from '@assets';
import { EFeaturedContentType, FeaturedContentList, SchoolNetworks } from '@covid/components';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import HealthProfileReminderCard from '@covid/components/cards/HealthProfileReminderCard';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { fetchLocalTrendline, fetchNewlySymptomaticData, updateTodayDate } from '@covid/core/state/content/slice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { OnboardingContext } from '@covid/features/tab-navigation/OnboardingContext';
import { useStartReconsent } from '@covid/features/wider-health-studies/hooks/useStartReconsent';
import { TScreenParamList } from '@covid/routes/types';
import { pushNotificationService } from '@covid/services';
import { sizes, styling } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { CollapsibleHeaderScrollView } from './components/CollapsibleHeaderScrollView';
import { CompactHeader } from './components/CompactHeader';
import { ExpandedHeader } from './components/ExpandedHeader';
import { NewlySymptomaticCard } from './components/NewlySymptomaticCard';

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

export function DashboardUKScreen({ navigation, route }: IProps) {
  const dispatch = useDispatch();
  const schoolGroups = useSelector<TRootState, ISubscribedSchoolGroupStats[]>(
    (state) => state.school.joinedSchoolGroups,
  );
  const startupInfo = useSelector<TRootState, TStartupInfo | undefined>(selectStartupInfo);
  const [showTrendline, setShowTrendline] = React.useState<boolean>(false);
  const [shouldShowReminders, setShouldShowReminders] = React.useState(false);
  const startReconsent = useStartReconsent();

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
      dispatch(fetchSubscribedSchoolGroups());
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
    }
  }, []);

  const onPressReport = React.useCallback(() => appCoordinator.gotoNextScreen(route.name), []);

  const compactHeader = React.useMemo(() => <CompactHeader onPress={onPressReport} />, []);
  const expandedHeader = React.useMemo(() => <ExpandedHeader onPress={onPressReport} />, []);

  const windowDimensions = useWindowDimensions();
  const onboardingContext = React.useContext(OnboardingContext);

  return (
    <>
      {Platform.OS === 'android' && onboardingContext.showOnboarding ? (
        // Needed for Android. Doesn't recognise overlay in the TabNavigator because overlay there is bounded by the size of the TabNavigator.
        <Pressable
          onPress={onboardingContext.closeOnboarding}
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

          {/* TODO: Fix show logic once backend completed */}
          {startupInfo?.is_tester ? <HealthProfileReminderCard /> : null}

          <NewlySymptomaticCard />

          {showTrendline ? <TrendlineCard onPress={appCoordinator.goToTrendline} /> : null}

          <EstimatedCasesMapCard />

          <UKEstimatedCaseCard onPress={onMoreDetails} />

          <FeaturedContentList screenName={route.name} type={EFeaturedContentType.Home} />

          <ShareVaccineCard screenName="Dashboard" />

          <SchoolNetworks schoolGroups={schoolGroups} style={styles.marginVertical} />
        </View>

        <PoweredByZoeSmall style={styling.marginVertical} />
      </CollapsibleHeaderScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: sizes.m,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: sizes.xs,
    resizeMode: 'contain',
    width: '100%',
  },
  marginVertical: {
    marginVertical: sizes.xs,
  },
  overlay: {
    backgroundColor: 'black',
    flex: 1,
    opacity: 0.5,
    position: 'absolute',
    zIndex: 1, // Needed to ensure it sits on top of overlay in TabNavigator
  },
});
