import { notificationReminders } from '@assets';
import { EFeaturedContentType, FeaturedContentList, SchoolNetworks, StudyCard } from '@covid/components';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { fetchLocalTrendline, updateTodayDate } from '@covid/core/state/contentSlice';
import { TRootState } from '@covid/core/state/root';
import { selectStartupInfo } from '@covid/core/state/selectors';
import { TStartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { appCoordinator } from '@covid/features/AppCoordinator';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { CompactHeader } from '@covid/features/dashboard/CompactHeader';
import { ExpandedHeader } from '@covid/features/dashboard/ExpandedHeader';
import { getDietStudyDoctorImage, getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import { TScreenParamList } from '@covid/features/ScreenParamList';
import { useStartReconsent } from '@covid/features/wider-health-studies/hooks/useStartReconsent';
import i18n from '@covid/locale/i18n';
import { pushNotificationService } from '@covid/services';
import { colors, sizes, styling } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const headerConfig = {
  compact: sizes.headerCompactHeight,
  expanded: sizes.headerExpandedHeight,
};

interface IProps {
  navigation: DrawerNavigationProp<TScreenParamList>;
  route: RouteProp<TScreenParamList, 'Dashboard'>;
}

const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

const onMoreDetails = () => openWebLink('https://covid.joinzoe.com/data');

export function DashboardScreen({ navigation, route }: IProps) {
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

  return (
    <CollapsibleHeaderScrollView compactHeader={compactHeader} config={headerConfig} expandedHeader={expandedHeader}>
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

        {showTrendline ? <TrendlineCard onPress={appCoordinator.goToTrendline} /> : null}

        <EstimatedCasesMapCard />

        <UKEstimatedCaseCard onPress={onMoreDetails} />

        {startupInfo?.show_mh_insight ? (
          <StudyCard
            doctorLocation={i18n.t('mental-health.doctor-location')}
            doctorName={i18n.t('mental-health.doctor-name')}
            doctorTitle={i18n.t('mental-health.doctor-title')}
            imageNode={getMentalHealthStudyDoctorImage()}
            onPress={appCoordinator.goToMentalHealthStudyPlayback}
            style={styling.marginVerticalSmall}
            tagColor={colors.coral.main.bgColor}
            title={i18n.t('mental-health-playback.results-ready')}
          />
        ) : null}

        <FeaturedContentList screenName={route.name} type={EFeaturedContentType.Home} />

        {startupInfo?.show_diet_score ? (
          <StudyCard
            showQuotes
            doctorLocation={i18n.t('diet-study.doctor-location')}
            doctorName={i18n.t('diet-study.doctor-name')}
            doctorTitle={i18n.t('diet-study.doctor-title')}
            imageNode={getDietStudyDoctorImage()}
            onPress={appCoordinator.goToDietStudy}
            style={styling.marginVerticalSmall}
            tagColor="blue"
            title={i18n.t('diet-study.results-ready')}
          />
        ) : null}

        <ShareVaccineCard screenName="Dashboard" />

        <SchoolNetworks schoolGroups={schoolGroups} style={styles.marginVertical} />
      </View>

      <PoweredByZoeSmall style={styling.marginVertical} />
    </CollapsibleHeaderScrollView>
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
});
