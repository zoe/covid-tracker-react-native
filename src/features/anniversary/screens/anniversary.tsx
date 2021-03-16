import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import { useTheme } from '@covid/themes';

import { LoadingIndicator, ReportCard, Timeline } from '../partials';
import { timelineData } from '../data';
import { ITimeline } from '../types';

function Anniversary() {
  const { grid } = useTheme();
  const [timeline, setTimeline] = useState<ITimeline>();

  useEffect(() => {
    // load data here
    setTimeout(() => {
      setTimeline(timelineData);
    }, 3000);
  }, []);

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
        {timeline ? (
          <>
            <ReportCard reportedEvents={timeline.reportedEvents} />
            <Timeline />
          </>
        ) : (
          <LoadingIndicator />
        )}
      </View>
    </BasicPage>
  );
}

export default Anniversary;
