import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { CompactHeader, Header } from '@covid/features/dashboard/Header';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { dietStudyPlaybackReadyUK, shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { FeaturedContentList, FeaturedContentType, SchoolNetworks } from '@covid/components';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import { pushNotificationService } from '@covid/Services';
import { StartupInfo } from '@covid/core/user/dto/UserAPIContracts';
import { experiments, startExperiment } from '@covid/core/Experiments';
import { events, identify, track } from '@covid/core/Analytics';
import { ShareVaccineCard } from '@covid/components/Cards/ShareVaccineCard';
import {
  selectMentalHealthState,
  setDashboardHasBeenViewed,
  selectApp,
  selectSettings,
  selectDietStudy,
} from '@covid/core/state';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const settings = useSelector(selectSettings);
  const dietStudy = useSelector(selectDietStudy);
  const app = useSelector(selectApp);
  const MentalHealthState = useSelector(selectMentalHealthState);
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, Optional<SubscribedSchoolGroupStats[]>>(
    (state) => state.school.joinedSchoolGroups
  );

  const startupInfo = useSelector<RootState, StartupInfo | undefined>((state) => state.content.startupInfo);
  const variant = startExperiment(experiments.UK_DietScore_Invite, 2);
  const showDietStudyPlayback = variant === 'variant_1' && startupInfo?.show_diet_score;
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
    console.log(settings.currentFeature);
    const now = new Date().getTime();
    if (settings.featureRunDate) {
      const featureRunDate = new Date(settings.featureRunDate).getTime();
      if (featureRunDate > now) {
        return;
      }
    }
    switch (settings.currentFeature) {
      case 'MENTAL_HEALTH_STUDY':
        showMentalHealthModal();
        return;
      case 'UK_DIET_STUDY':
        showDietStudy();
    }
  };

  const showMentalHealthModal = () => {
    if (MentalHealthState.completed) {
      return;
    }
    if (MentalHealthState.consent === 'LATER') {
      // check time since
      const previous = moment(MentalHealthState.lastPresentedDate);
      const now = moment(new Date());
      const diff = now.diff(previous, 'days');
      if (diff >= 7) {
        appCoordinator.goToMentalHealthModal();
      }
      return;
    }
    if (app.mentalHealthStudyActive && MentalHealthState.consent !== 'NO') {
      appCoordinator.goToMentalHealthModal();
    }
  };

  const showDietStudy = () => {
    if (!startupInfo?.show_diet_score || dietStudy.consent === 'YES') {
      return;
    }
    appCoordinator.goToDietStudyModal();
  };

  useEffect(() => {
    (async () => {
      identify();
      await pushNotificationService.refreshPushToken();
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
      if (showDietStudyPlayback) {
        track(events.DIET_STUDY_PLAYBACK_DISPLAYED);
      }
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

  const hasNetworkData = networks && networks.length > 0;

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        <ShareVaccineCard screenName="Dashboard" />

        {showDietStudyPlayback && (
          <TouchableWithoutFeedback
            onPress={() => {
              track(events.DIET_STUDY_PLAYBACK_CLICKED);
              appCoordinator.goToDietStudyPlayback();
            }}>
            <Image style={styles.dietStudyImage} source={dietStudyPlaybackReadyUK} />
          </TouchableWithoutFeedback>
        )}

        <FeaturedContentList type={FeaturedContentType.Home} screenName={route.name} />

        {hasNetworkData && (
          <View
            style={{
              marginVertical: 8,
            }}>
            <SchoolNetworks schoolGroups={networks!} />
          </View>
        )}

        {showTrendline && <TrendlineCard ctaOnPress={onExploreTrendline} />}

        <EstimatedCasesMapCard />

        <UKEstimatedCaseCard onPress={onMoreDetails} />

        <ExternalCallout
          calloutID="sharev3"
          imageSource={shareAppV3}
          aspectRatio={311 / 135}
          screenName={route.name}
          postClicked={onShare}
        />
      </View>

      <View style={styles.zoe}>
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
};

const styles = StyleSheet.create({
  calloutContainer: {
    marginHorizontal: 16,
  },
  zoe: {
    marginVertical: 32,
  },
  dietStudyImage: {
    width: '100%',
    aspectRatio: 1200 / 1266,
    height: undefined,
    resizeMode: 'contain',
    marginVertical: 8,
  },
});
