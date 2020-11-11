import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Root } from 'native-base';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKEstimatedCaseCard, TrendlineCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { shareAppV3, schoolNetworkFeature, infographicFacts } from '@assets';
import i18n from '@covid/locale/i18n';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { openWebLink } from '@covid/utils/links';
import store, { useAppDispatch } from '@covid/core/state/store';
import { ContentState, fetchLocalTrendLine, updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { SchoolNetworks } from '@covid/components/Cards/SchoolNetworks';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import AnalyticsService from '@covid/core/Analytics';
import { pushNotificationService } from '@covid/Services';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

const ShowSchoolModuleFeature = false;

export const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, Optional<SubscribedSchoolGroupStats[]>>(
    (state) => state.school.joinedSchoolNetworks
  );

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

  const onShare = () => {
    const shareMessage = i18n.t('share-this-app.message');
    share(shareMessage);
  };

  const schoolNetworkFlow = () => schoolNetworkCoordinator.goToSchoolIntro();

  useEffect(() => {
    (async () => {
      AnalyticsService.identify();
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

  const hasNetworkData = networks && networks.length > 0;

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      {showTrendline && <TrendlineCard ctaOnPress={onExploreTrendline} />}

      {isGBCountry() && (
        <View style={styles.calloutContainer}>
          <ExternalCallout
            link="https://covid.joinzoe.com/earlysymptomsdiscoveries?utm_source=App"
            calloutID="infographic_facts"
            imageSource={infographicFacts}
            aspectRatio={1.229}
            screenName={route.name}
          />
        </View>
      )}

      {hasNetworkData && (
        <View
          style={{
            marginHorizontal: 32,
            marginBottom: 16,
          }}>
          <SchoolNetworks schoolGroups={networks!} />
        </View>
      )}

      {ShowSchoolModuleFeature && (
        <View style={styles.calloutContainer}>
          <ExternalCallout
            calloutID="schoolNetworkModule"
            imageSource={schoolNetworkFeature}
            aspectRatio={311 / 253}
            screenName={route.name}
            postClicked={schoolNetworkFlow}
            canDismiss
          />
        </View>
      )}

      {isGBCountry() && <EstimatedCasesMapCard />}

      {isGBCountry() && <UKEstimatedCaseCard onPress={onMoreDetails} />}

      <View style={styles.calloutContainer}>
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
    marginHorizontal: 24,
  },
  image: {},
  zoe: {
    marginBottom: 32,
  },
});
