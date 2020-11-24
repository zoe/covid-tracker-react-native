import React from 'react';
import { View, Text } from 'react-native';

import { StatusIndicator } from '../../status';

function HealthStatus() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <StatusIndicator colorPalette="green" />
      <Text>reported feeling unwell</Text>
    </View>
  );
}

export default HealthStatus;
