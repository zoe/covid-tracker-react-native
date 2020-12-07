import React from 'react';
import { View } from 'react-native';

import ScoreCategory from './score-category';

function ScoreRange() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <ScoreCategory />
      <ScoreCategory />
      <ScoreCategory />
      <ScoreCategory />
      <ScoreCategory />
    </View>
  );
}

export default ScoreRange;
