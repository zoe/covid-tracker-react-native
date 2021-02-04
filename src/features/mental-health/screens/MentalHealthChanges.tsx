import React from 'react';
import { Text, View } from 'react-native';

import { BrandedButton } from '@covid/components';
import NavigatorService from '@covid/NavigatorService';

function MentalHealthChanges() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text>The start</Text>
      </View>
      <BrandedButton onPress={() => NavigatorService.navigate('MentalHealthFrequency', undefined)}>Start</BrandedButton>
    </View>
  );
}

export default MentalHealthChanges;
