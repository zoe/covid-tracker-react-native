import { Text } from '@covid/components';
import * as React from 'react';
import { View } from 'react-native';

import { SScoreRangeContainerView } from './styles';

interface IProps {
  startScore: number;
  startScoreLabel: string;
  endScore: number;
  endScoreLabel: string;
}

function ScoreRange({ startScore, startScoreLabel, endScore, endScoreLabel }: IProps) {
  return (
    <SScoreRangeContainerView>
      <View>
        <Text textClass="h6">{startScore}</Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="h6Light">
          {startScoreLabel}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text textClass="h6">{endScore}</Text>
        <Text inverted colorPalette="uiDark" colorShade="dark" textClass="h6Light">
          {endScoreLabel}
        </Text>
      </View>
    </SScoreRangeContainerView>
  );
}

export default ScoreRange;
