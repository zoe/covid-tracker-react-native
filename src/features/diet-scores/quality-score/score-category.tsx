import React from 'react';
import { View } from 'react-native';

import { GradientColorBar, ScoreCard, Text } from '@covid/components';

interface IProps {
  active?: boolean;
  colorRange: string[];
  title: string;
  statusColor: string;
}

function ScoreCategory({ active, colorRange, title, statusColor }: IProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      {active && (
        <View>
          <ScoreCard backgroundColor={statusColor}>
            <Text textClass="pSmall">You</Text>
          </ScoreCard>
        </View>
      )}
      <View style={{ width: '100%' }}>
        <GradientColorBar colors={colorRange} />
      </View>
      <Text textClass="pSmall" colorPalette="uiDark" colorShade="dark" inverted rhythm={20}>
        {title}
      </Text>
    </View>
  );
}

export default ScoreCategory;
