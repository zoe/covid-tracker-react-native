import React from 'react';
import { View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import { useTheme } from '@covid/themes';

import { ReportCard, Timeline } from '../partials';

function Anniversary() {
  const { grid } = useTheme();
  return (
    <BasicPage withFooter={false}>
      <View style={{ paddingHorizontal: grid.gutter }}>
        <Text textClass="h3" rhythm={32}>
          You played a key role{' '}
        </Text>
        <Text rhythm={24}>
          Based on your profile and reporting, we have created a timeline showing how your individual contributions
          helped unlock key scientific findings throughout the past year.
        </Text>
        <ReportCard />
        <Timeline />
      </View>
    </BasicPage>
  );
}

export default Anniversary;
