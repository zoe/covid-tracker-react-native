import React from 'react';
import { View } from 'react-native';

import { SolidColorBar, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { colors } from '@theme';

function TimelineIntroduction() {
  const { grid } = useTheme();
  return (
    <View style={{ padding: grid.gutter }} accessible>
      <Text textClass="h3" rhythm={32}>
        Your unique contribution to science
      </Text>
      <Text rhythm={32}>
        Your personal timeline shows all you've helped achieve so far and future discoveries you can still be part of.
      </Text>
      <SolidColorBar backgroundColor={colors.tertiary} height={1} />
    </View>
  );
}

export default TimelineIntroduction;
