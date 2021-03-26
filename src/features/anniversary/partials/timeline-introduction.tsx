import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';
import { useTheme } from '@covid/themes';

function TimelineIntroduction() {
  const { grid } = useTheme();
  return (
    <View style={{ padding: grid.gutter }}>
      <Text textClass="h3" rhythm={32}>
        Your unique contribution to science
      </Text>
      <Text rhythm={24}>
        Your personal timeline shows all you've helped achieve so far and future discoveries you can still be part of.
      </Text>
    </View>
  );
}

export default TimelineIntroduction;
