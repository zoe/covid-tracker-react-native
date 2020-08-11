import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKEstimatedCaseCard } from '@covid/components/Cards/EstimatedCase/UKEstimatedCaseCard';
import { EstimatedCasesMapCard } from '@covid/components/Cards/EstimatedCasesMapCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';
import appCoordinator from '@covid/features/AppCoordinator';

// const HEADER_EXPANDED_HEIGHT = 380; // With report count & total contribution
const HEADER_EXPANDED_HEIGHT = 352;
const HEADER_COLLAPSED_HEIGHT = 124;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
  route: RouteProp<ScreenParamList, 'Dashboard'>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
  const handleReport = async () => {
    await appCoordinator.gotoNextScreen(route.name);
  };

  const handleMoreDetails = async () => {};
  const headerConfig = {
    compact: HEADER_COLLAPSED_HEIGHT,
    expanded: HEADER_EXPANDED_HEIGHT,
  };
  return (
    <CollapsibleHeaderScrollView
      navigation={navigation}
      compactHeader={<CompactHeader reportOnPress={handleReport} />}
      expandedHeader={<Header reportOnPress={handleReport} />}
      config={headerConfig}>
      <EstimatedCasesMapCard />
      <UKEstimatedCaseCard leftMertric="0" rightMetric="0" onPress={handleMoreDetails} />

      <View style={{ width: '100%' }}>
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
};

const styles = StyleSheet.create({});
