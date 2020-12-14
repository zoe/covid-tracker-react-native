import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';

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
        <Text textClass="h6Light" colorPalette="uiDark" colorShade="dark" inverted>
          {startScoreLabel}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text textClass="h6">{endScore}</Text>
        <Text textClass="h6Light" colorPalette="uiDark" colorShade="dark" inverted>
          {endScoreLabel}
        </Text>
      </View>
    </SScoreRangeContainerView>
  );
}

export default ScoreRange;
