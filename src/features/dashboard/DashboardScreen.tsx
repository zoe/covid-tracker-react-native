import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import * as Linking from 'expo-linking';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { FeaturedContentList, FeaturedContentType, SchoolNetworks, StudyCard } from '@covid/components';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { pushNotificationService } from '@covid/Services';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import Analytics, { events, identify } from '@covid/core/Analytics';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';
import {
  selectAnniversary,
  selectApp,
  selectDietStudy,
  selectSettings,
  setDashboardHasBeenViewed,
} from '@covid/core/state';
import NavigatorService from '@covid/NavigatorService';
import { getDietStudyDoctorImage, getMentalHealthStudyDoctorImage } from '@covid/features/diet-study-playback/v2/utils';
import { colors, styling } from '@covid/themes';

import appCoordinator from '../AppCoordinator';
import { ScreenParamList } from '../ScreenParamList';
import { ImpactTimelineCard } from '../anniversary';

import { CollapsibleHeaderScrollView } from './CollapsibleHeaderScrollView';
import { CompactHeader, Header } from './Header';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export function DashboardScreen({ navigation, route }: IProps) {
  const anniversary = useSelector(selectAnniversary);
  const settings = useSelector(selectSettings);
  const dietStudy = useSelector(selectDietStudy);
  const app = useSelector(selectApp);
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, ISubscribedSchoolGroupStats[]>((state) => state.school.joinedSchoolGroups);
  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);

  const [showTrendline, setShowTrendline] = useState<boolean>(false);

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

  const onShare = async () => {
    const shareMessage = i18n.t('share-this-app.message');
    await share(shareMessage);
  };

  const runCurrentFeature = () => {
    // enforce timeline if not yet viewed and is availble
    if (startupInfo?.show_timeline && !anniversary.hasViewedModal) {
      NavigatorService.navigate('AnniversaryModal');
      return;
    }

    if (settings.featureRunDate) {
      const now = new Date().getTime();
      const featureRunDate = new Date(settings.featureRunDate).getTime();
      if (featureRunDate > now) {
        return;
      }
    }

    switch (settings.currentFeature) {
      case 'UK_DIET_STUDY':
        showDietStudy();
    }
  };

  const showDietStudy = () => {
    if (!startupInfo?.show_diet_score || dietStudy.consent === 'YES') {
      return;
    }
    NavigatorService.navigate('DietStudyModal');
  };

  useEffect(() => {
    (async () => {
      identify();
      await pushNotificationService.subscribeForPushNotifications();
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
    return function () {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', (url) => {
      // TODO - get route from deeplink url
    });
  }, []);

  const hasNetworkData = networks && networks.length > 0;

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        {startupInfo?.show_timeline && (
          <ImpactTimelineCard
            onPress={() => {
              Analytics.track(events.ANNIVERSARY_FROM_DASHBOARD);
              navigation.navigate('Anniversary');
            }}
          />
        )}

        <StudyCard
          doctorLocation={i18n.t('mental-health.doctor-location')}
          doctorName={i18n.t('mental-health.doctor-name')}
          doctorTitle={i18n.t('mental-health.doctor-title')}
          imageNode={getMentalHealthStudyDoctorImage()}
          onPress={() => appCoordinator.goToMentalHealthStudyPlayback()}
          style={styling.marginVerticalSmall}
          tagColor={colors.coral.main.bgColor}
          title={i18n.t('mental-health.results-ready')}
        />

        {startupInfo?.show_diet_score && (
          <StudyCard
            doctorLocation={i18n.t('diet-study.doctor-location')}
            doctorName={i18n.t('diet-study.doctor-name')}
            doctorTitle={i18n.t('diet-study.doctor-title')}
            imageNode={getDietStudyDoctorImage()}
            onPress={() => appCoordinator.goToDietStudy()}
            style={styling.marginVerticalSmall}
            tagColor="blue"
            title={i18n.t('diet-study.results-ready')}
            showQuotes
          />
        )}

        <ShareVaccineCard screenName="Dashboard" />

        <FeaturedContentList type={FeaturedContentType.Home} screenName={route.name} />

        {hasNetworkData && <SchoolNetworks schoolGroups={networks!} style={styling.marginVerticalSmall} />}

        {showTrendline && <TrendlineCard ctaOnPress={onExploreTrendline} />}

        <EstimatedCasesMapCard />

        <UKEstimatedCaseCard onPress={onMoreDetails} />

        <ExternalCallout
          aspectRatio={311 / 135}
          calloutID="sharev3"
          imageSource={shareAppV3}
          postClicked={onShare}
          screenName={route.name}
        />
      </View>

      <PoweredByZoeSmall style={styles.zoe} />
    </CollapsibleHeaderScrollView>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: 16,
  },
  zoe: {
    marginVertical: 32,
    paddingVertical: 32,
  },
  dietStudyImage: {
    aspectRatio: 1200 / 1266,
    height: undefined,
    marginVertical: 8,
    resizeMode: 'contain',
    width: '100%',
  },
});
