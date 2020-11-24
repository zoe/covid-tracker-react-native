import React from 'react';
import { View } from 'react-native';

import SchoolHeader from './SchoolHeader';
import SchoolStats from './SchoolStats';

function SchoolNetworksCard() {
  return (
    <View>
      <SchoolHeader schoolName="Test School" />
      <SchoolStats />
      <SchoolStats />
    </View>
  );
}

export default SchoolNetworksCard;
