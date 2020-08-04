import React, { useState, Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { PoweredByZoeSmall } from '@covid/components/Logos/PoweredByZoe';
import { Header, CompactHeader } from '@covid/features/dashboard/Header';
import { UKCovidCaseEstimatedCard } from '@covid/features/dashboard/CovidCaseEstimatedCard';
import { CollapsibleHeaderScrollView } from '@covid/features/dashboard/CollapsibleHeaderScrollView';
import { ScreenParamList } from '@covid/features/ScreenParamList';

const HEADER_EXPANDED_HEIGHT = 380;
const HEADER_COLLAPSED_HEIGHT = 124;

interface Props {
  navigation: DrawerNavigationProp<ScreenParamList>;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const handleReport = () => {};
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
      <UKCovidCaseEstimatedCard />
      <UKCovidCaseEstimatedCard />
      <UKCovidCaseEstimatedCard />
      <View style={{ width: '100%' }}>
        <PoweredByZoeSmall />
      </View>
    </CollapsibleHeaderScrollView>
  );
};

const styles = StyleSheet.create({});
