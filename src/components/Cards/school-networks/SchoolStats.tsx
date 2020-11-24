import React from 'react';
import { Text, View } from 'react-native';

import HealthStatus from './HealthStatus';

function SchoolStats() {
  return (
    <View>
      <Text>Entire School or Bubbble Name</Text>
      <Text>n / n children signed up</Text>
      <HealthStatus />
    </View>
  );
}

export default SchoolStats;
