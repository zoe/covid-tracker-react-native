import React from 'react';
import { View } from 'react-native';

import { ScoreCard, SolidColorBar, Text } from '@covid/components';

function ScoreCategory() {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text>Title</Text>
      <View style={{ width: '100%' }}>
        <SolidColorBar backgroundColor="green" />
      </View>
      <ScoreCard backgroundColor="#FFD519" direction="UP">
        <Text textClass="pSmall">You</Text>
      </ScoreCard>
    </View>
  );
}

export default ScoreCategory;
