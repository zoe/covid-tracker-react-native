import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { CompactHeader, Header } from '@covid/features/dashboard/Header';
import { TrendlineCard, UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { infographicFacts, shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { openWebLink } from '@covid/utils/links';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import { SchoolNetworks } from '@covid/components';
import { SubscribedSchoolGroupStats } from '@covid/core/schools/Schools.dto';
import AnalyticsService from '@covid/core/Analytics';
import { pushNotificationService } from '@covid/Services';
import SchoolModule from '@assets/icons/SchoolsModule';

const HEADER_EXPANDED_HEIGHT = 328;
const HEADER_COLLAPSED_HEIGHT = 100;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

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

  const onSchoolsModuleClick = async () => {
    appCoordinator.goToSchoolNetworkInfo();
  };

  const onShare = async () => {
    const shareMessage = i18n.t('share-this-app.message');
    await share(shareMessage);
  };

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

  console.log('NETWORKS: ', networks);

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        {/* School Networks */}
        <TouchableWithoutFeedback onPress={onSchoolsModuleClick}>
          <View style={styles.schoolModuleContainer}>
            <SchoolModule />
          </View>
        </TouchableWithoutFeedback>

        {hasNetworkData && (
          <View
            style={{
              marginVertical: 8,
            }}>
            <SchoolNetworks schoolGroups={networks!} />
          </View>
        )}

        {showTrendline && <TrendlineCard ctaOnPress={onExploreTrendline} />}

        <ExternalCallout
          link="https://covid.joinzoe.com/earlysymptomsdiscoveries?utm_source=App"
          calloutID="infographic_facts"
          imageSource={infographicFacts}
          aspectRatio={1.229}
          screenName={route.name}
        />

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
  schoolModuleContainer: {
    height: 200,
  },
  calloutContainer: {
    marginHorizontal: 16,
  },
  zoe: {
    marginVertical: 32,
  },
});
