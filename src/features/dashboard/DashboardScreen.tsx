import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/UKEstimatedCaseCard';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';
import { ExternalCallout } from '@covid/components/ExternalCallout';
import { share } from '@covid/components/Cards/BaseShareApp';
import { shareAppV3 } from '@assets';
import i18n from '@covid/locale/i18n';
import { isGBCountry } from '@covid/core/localisation/LocalisationService';

// const HEADER_EXPANDED_HEIGHT = 400; // With report count & total contribution
const HEADER_EXPANDED_HEIGHT = 352;
const HEADER_COLLAPSED_HEIGHT = 124;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const headerConfig = {
    compact: HEADER_COLLAPSED_HEIGHT,
    expanded: HEADER_EXPANDED_HEIGHT,
  };

  const onReport = async () => {
    await appCoordinator.gotoNextScreen(route.name);
  };

  const onMoreDetails = async () => {
    Linking.openURL('https://covid.joinzoe.com/data');
  };

  const onShare = () => {
    const shareMessage = i18n.t('share-this-app.message');
    share(shareMessage);
  };

  return (
    <CollapsibleHeaderScrollView
      config={headerConfig}
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={onReport} />}
      expandedHeader={<Header reportOnPress={onReport} />}>
      <View style={styles.calloutContainer}>
        <ExternalCallout
          calloutID="sharev3"
          imageSource={shareAppV3}
          aspectRatio={311 / 135}
          screenName={route.name}
          postClicked={onShare}
        />
      </View>

      {isGBCountry() && <EstimatedCasesMapCard />}

      {isGBCountry() && <UKEstimatedCaseCard onPress={onMoreDetails} />}

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
