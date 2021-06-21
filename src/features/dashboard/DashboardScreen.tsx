import { notificationReminders } from '@assets';
import { FeaturedContentList, FeaturedContentType, SchoolNetworks, StudyCard } from '@covid/components';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/cards/estimated-case';
import { EstimatedCasesMapCard } from '@covid/components/cards/EstimatedCasesMapCard';
import { ShareVaccineCard } from '@covid/components/cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PoweredByZoeSmall } from '@covid/components/logos/PoweredByZoe';
import ModalZoe from '@covid/components/ModalZoe';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import ExpoPushTokenEnvironment from '@covid/core/push-notifications/expo';
import PushNotificationService, { IPushTokenEnvironment } from '@covid/core/push-notifications/PushNotificationService';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { selectApp, setDashboardHasBeenViewed } from '@covid/core/state';
import { RootState } from '@covid/core/state/root';
import { useAppDispatch } from '@covid/core/state/store';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import appCoordinator from '@covid/features/AppCoordinator';
import { getDietStudyDoctorImage, getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import i18n from '@covid/locale/i18n';
import { pushNotificationService } from '@covid/Services';
import { colors, styling } from '@covid/themes';
import { openWebLink } from '@covid/utils/links';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import MentalHealthPlaybackModal from '../mental-health-playback/MentalHealthPlaybackModal';
import { CollapsibleHeaderScrollView } from './CollapsibleHeaderScrollView';
import { CompactHeader, Header } from './Header';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

const pushService: IPushTokenEnvironment = new ExpoPushTokenEnvironment();

export function DashboardScreen({ navigation, route }: IProps) {
  const app = useSelector(selectApp);
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, ISubscribedSchoolGroupStats[]>((state) => state.school.joinedSchoolGroups);
  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);

  const [showTrendline, setShowTrendline] = useState<boolean>(false);
  const [mentalHealthPlaybackModalVisible, setMentalHealthPlaybackModalVisible] = useState(false);

  const headerConfig = {
    compact: HEADER_COLLAPSED_HEIGHT,
    expanded: HEADER_EXPANDED_HEIGHT,
  };

  const onReport = async () => {
    await appCoordinator.gotoNextScreen(route.name);
  };

  const onMoreDetails = async () => {
    openWebLink('https://covid.joinzoe.com/data');
  };

  const onExploreTrendline = async () => {
    appCoordinator.goToTrendline();
  };

  const [shouldShowReminders, setShouldShowReminders] = useState(false);

  const runCurrentFeature = () => {
    if (startupInfo?.show_modal === 'mental-health-playback') {
      setMentalHealthPlaybackModalVisible(true);
    }
  };

  // TODO: Can we move this into app initialisation?
  useEffect(() => {
    (async () => {
      await pushNotificationService.subscribeForPushNotifications();
      setShouldShowReminders(!(await pushService.isGranted()));
    })();
  }, []);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      dispatch(updateTodayDate());
      dispatch(fetchSubscribedSchoolGroups());
      // Decide whether or not to show trendline feature
      // - This will check for user's lad & do they have local trendline data & BE feature toggle
      const flag = await appCoordinator.shouldShowTrendLine();
      setShowTrendline(flag);
    });
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;
    if (!app.dashboardHasBeenViewed) {
      dispatch(setDashboardHasBeenViewed(true));
      setTimeout(() => {
        if (isMounted) {
          runCurrentFeature();
        }
      }, 800);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', () => {});
  }, []);

  const hasNetworkData = networks && networks.length > 0;

  return (
    <CollapsibleHeaderScrollView
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      config={headerConfig}
      expandedHeader={<Header reportOnPress={onReport} />}
      navigation={navigation}
    >
      <View style={styles.calloutContainer}>
        {shouldShowReminders ? (
          <ExternalCallout
            aspectRatio={1244.0 / 368.0}
            calloutID="notificationReminders"
            imageSource={notificationReminders}
            postClicked={() => {
              PushNotificationService.openSettings();
            }}
            screenName={route.name}
          />
        ) : null}
        {showTrendline ? <TrendlineCard ctaOnPress={onExploreTrendline} /> : null}

        <EstimatedCasesMapCard />

        <UKEstimatedCaseCard onPress={onMoreDetails} />

        {startupInfo?.show_mh_insight ? (
          <StudyCard
            doctorLocation={i18n.t('mental-health.doctor-location')}
            doctorName={i18n.t('mental-health.doctor-name')}
            doctorTitle={i18n.t('mental-health.doctor-title')}
            imageNode={getMentalHealthStudyDoctorImage()}
            onPress={() => appCoordinator.goToMentalHealthStudyPlayback(startupInfo)}
            style={styling.marginVerticalSmall}
            tagColor={colors.coral.main.bgColor}
            title={i18n.t('mental-health-playback.results-ready')}
          />
        ) : null}

        <FeaturedContentList screenName={route.name} type={FeaturedContentType.Home} />

        {startupInfo?.show_diet_score ? (
          <StudyCard
            showQuotes
            doctorLocation={i18n.t('diet-study.doctor-location')}
            doctorName={i18n.t('diet-study.doctor-name')}
            doctorTitle={i18n.t('diet-study.doctor-title')}
            imageNode={getDietStudyDoctorImage()}
            onPress={() => appCoordinator.goToDietStudy()}
            style={styling.marginVerticalSmall}
            tagColor="blue"
            title={i18n.t('diet-study.results-ready')}
          />
        ) : null}

        <ShareVaccineCard screenName="Dashboard" />

        {hasNetworkData ? (
          <View
            style={{
              marginVertical: 8,
            }}
          >
            <SchoolNetworks schoolGroups={networks!} />
          </View>
        ) : null}

        <ModalZoe
          closeModalHandler={() => {
            setMentalHealthPlaybackModalVisible(false);
          }}
          showModal={mentalHealthPlaybackModalVisible}
        >
          <MentalHealthPlaybackModal closeModalHandler={() => setMentalHealthPlaybackModalVisible(false)} />
        </ModalZoe>
      </View>

      <View style={styles.zoe}>
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: 16,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: 8,
    resizeMode: 'contain',
    width: '100%',
  },
  zoe: {
    marginVertical: 32,
    paddingVertical: 32,
  },
});
