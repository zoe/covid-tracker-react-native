import React from 'react';
import { View } from 'react-native';

import { Text } from '@covid/components';
import { useTheme } from '@covid/themes';

function TimelineIntroduction() {
  const { grid } = useTheme();
  return (
    <View style={{ padding: grid.gutter }}>
      <Text textClass="h3" rhythm={32}>
        You played a key role
      </Text>
      <Text rhythm={24}>
        Based on your profile and reporting, we have created a timeline showing how your individual contributions helped
        unlock key scientific findings throughout the past year.
      </Text>
    </View>
  );
}

export default TimelineIntroduction;
