import React from 'react';
import { View } from 'react-native';

import { SolidColorBar, Text } from '@covid/components';

interface IProps {
  active?: boolean;
  statusColor: string;
  title: string;
}

function ScoreCategory({ active, statusColor, title }: IProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text textClass="pSmall" colorPalette="uiDark" colorShade="dark" inverted rhythm={20}>
        {title}
      </Text>
      <View style={{ width: '100%' }}>
        <SolidColorBar backgroundColor={statusColor} />
      </View>
    </View>
  );
}

export default ScoreCategory;
