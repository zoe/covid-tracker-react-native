import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';

import DietScoreHeader from '../diet-score-header';

function MissingDataText() {
  return (
    <View>
      <DietScoreHeader title="Before the pandemic" subTitle="February 2020" />
      <Text textClass="pSmallLight">
        You either have told us your diet did not change pre-pandemic (so the score should be the same as above) or we
        do not have answers from you.
      </Text>
    </View>
  );
}

export default MissingDataText;
