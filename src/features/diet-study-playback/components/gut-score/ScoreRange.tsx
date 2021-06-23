import * as React from 'react';
import { View } from 'react-native';

import ScoreCategory from './ScoreCategory';

function ScoreRange() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <ScoreCategory statusColor="#FF9600" title="Poor" />
      <View style={{ width: 4 }} />
      <ScoreCategory statusColor="#FFD519" title="Satisfactory" />
      <View style={{ width: 4 }} />
      <ScoreCategory statusColor="#C0D904" title="Good" />
      <View style={{ width: 4 }} />
      <ScoreCategory statusColor="#A0B406" title="Excellent" />
    </View>
  );
}

export default ScoreRange;
