import { Text } from '@covid/components';
import DietScoreHeader from '@covid/features/diet-study-playback/components/diet-score-header';
import React from 'react';
import { View } from 'react-native';

function MissingDataText() {
  return (
    <View>
      <DietScoreHeader subTitle="February 2020" title="Before the pandemic" />
      <Text textClass="pSmallLight">
        You either have told us your diet did not change pre-pandemic (so the score should be the same as above) or we
        do not have answers from you.
      </Text>
    </View>
  );
}

export default MissingDataText;
