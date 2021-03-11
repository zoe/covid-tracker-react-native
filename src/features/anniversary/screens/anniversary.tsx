import React from 'react';
import { View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import { useTheme } from '@covid/themes';

function Anniversary() {
  const { grid } = useTheme();
  return (
    <BasicPage withFooter={false}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          You played a key role{' '}
        </Text>
        <Text>
          Based on your profile and reporting, we have created a timeline showing how your individual contributions
          helped unlock key scientific findings throughout the past year.
        </Text>
      </View>
    </BasicPage>
  );
}

export default Anniversary;
