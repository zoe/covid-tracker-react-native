import React from 'react';
import { View } from 'react-native';

import { SolidColorBar, Text } from '@covid/components';

interface IProps {
  statusColor: string;
  title: string;
}

function ScoreCategory({ statusColor, title }: IProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text textClass="pXSmall" colorPalette="uiDark" colorShade="dark" inverted rhythm={20}>
        {title}
      </Text>
      <View style={{ width: '100%' }}>
        <SolidColorBar backgroundColor={statusColor} />
      </View>
    </View>
  );
}

export default ScoreCategory;
