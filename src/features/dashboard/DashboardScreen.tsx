import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/UKEstimatedCaseCard';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { shareAppV3, schoolNetworkFeature, facts } from '@assets';
import i18n from '@covid/locale/i18n';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';
import { openWebLink } from '@covid/utils/links';
import { useAppDispatch } from '@covid/core/state/store';
import { updateTodayDate } from '@covid/core/content/state/contentSlice';
import { RootState } from '@covid/core/state/root';
import { Optional } from '@covid/utils/types';
import { fetchSubscribedSchoolGroups } from '@covid/core/schools/Schools.slice';
import schoolNetworkCoordinator from '@covid/features/school-network/SchoolNetworkCoordinator';
import { SchoolGroupSubscriptionResponse } from '@covid/core/schools/Schools.dto';
import { SchoolNetworks } from '@covid/components/Cards/SchoolNetworks';

// const HEADER_EXPANDED_HEIGHT = 400; // With report count & total contribution
const HEADER_EXPANDED_HEIGHT = 352;
const HEADER_COLLAPSED_HEIGHT = 124;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

const ShowSchoolModuleFeature = false;

export const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const networks = useSelector<RootState, Optional<SchoolGroupSubscriptionResponse>>(
    (state) => state.school.joinedSchoolNetworks
  );

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

  const onShare = () => {
    const shareMessage = i18n.t('share-this-app.message');
    share(shareMessage);
  };

  const schoolNetworkFlow = () => schoolNetworkCoordinator.goToSchoolIntro();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      dispatch(updateTodayDate());
      dispatch(fetchSubscribedSchoolGroups());
    });
  }, [navigation]);

  const hasNetworkData = networks && networks.length > 0;

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      {isGBCountry() && (
        <View style={styles.calloutContainer}>
          <ExternalCallout
            link="https://covid.joinzoe.com/earlysymptomsdiscoveries?utm_source=App"
            calloutID="early_symptoms_discoveries"
            imageSource={facts}
            aspectRatio={1.23}
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
          <SchoolNetworks networks={networks!} />
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
