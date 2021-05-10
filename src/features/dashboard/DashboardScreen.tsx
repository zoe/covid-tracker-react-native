import { shareAppV3 } from '@assets';
import { Fab, FeaturedContentList, FeaturedContentType, SchoolNetworks } from '@covid/components';
import { share } from '@covid/components/Cards/BaseShareApp';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import Analytics, { events, identify } from '@covid/core/Analytics';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { ISubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import {
  selectAnniversary,
  selectApp,
  selectDietStudy,
  selectSettings,
  setDashboardHasBeenViewed,
} from '@covid/core/state';
import { RootState } from '@covid/core/state/root';
import { useAppDispatch } from '@covid/core/state/store';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import i18n from '@covid/locale/i18n';
import NavigatorService from '@covid/NavigatorService';
import { pushNotificationService } from '@covid/Services';
import { openWebLink } from '@covid/utils/links';
import { Optional } from '@covid/utils/types';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { ImpactTimelineCard } from '../anniversary';
import appCoordinator from '../AppCoordinator';
import { DietStudyCard } from '../diet-study-playback';
import { ScreenParamList } from '../ScreenParamList';
// import { useProfileList } from '../multi-profile/ProfileList.hooks';
import { CollapsibleHeaderScrollView } from './CollapsibleHeaderScrollView';
import { CompactHeader, Header } from './Header';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface IProps {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export function DashboardScreen({ navigation, route }: IProps) {
  // const { profiles, listProfiles } = useProfileList();
  const anniversary = useSelector(selectAnniversary);
  const settings = useSelector(selectSettings);
  const dietStudy = useSelector(selectDietStudy);
  const app = useSelector(selectApp);
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, Optional<ISubscribedSchoolGroupStats[]>>(
    (state) => state.school.joinedSchoolGroups,
  );
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

  // useEffect(() => {
  //   listProfiles();
  // }, []);

  const hasNetworkData = networks && networks.length > 0;

  return (
    <>
      <CollapsibleHeaderScrollView
        compactHeader={<CompactHeader reportOnPress={onReport} />}
        config={headerConfig}
        expandedHeader={<Header reportOnPress={onReport} />}
        navigation={navigation}
      >
        <View style={styles.calloutContainer}>
          {startupInfo?.show_timeline && (
            <ImpactTimelineCard
              onPress={() => {
                Analytics.track(events.ANNIVERSARY_FROM_DASHBOARD);
                navigation.navigate('Anniversary');
              }}
            />
          )}
          {startupInfo?.show_diet_score && <DietStudyCard style={{ marginVertical: 12 }} />}

          <ShareVaccineCard screenName="Dashboard" />

          <FeaturedContentList screenName={route.name} type={FeaturedContentType.Home} />

          {hasNetworkData && (
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <SchoolNetworks schoolGroups={networks!} />
            </View>
          )}

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

        <View style={styles.zoe}>
          <PoweredByZoeSmall />
        </View>
      </CollapsibleHeaderScrollView>
      {/* <Fab profiles={profiles} /> */}
    </>
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
