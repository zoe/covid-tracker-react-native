import { SolidColorBar, Text } from '@covid/components';
import React from 'react';
import { View } from 'react-native';

interface IProps {
  statusColor: string;
  title: string;
}

function ScoreCategory({ statusColor, title }: IProps) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text inverted colorPalette="uiDark" colorShade="dark" rhythm={20} textClass="pXSmall">
        {title}
      </Text>
      <View style={{ width: '100%' }}>
        <SolidColorBar backgroundColor={statusColor} />
      </View>
    </View>
  );
}

export default ScoreCategory;
