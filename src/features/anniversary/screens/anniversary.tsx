import React, { useState, useEffect } from 'react';
import { Image, View } from 'react-native';

import { BasicPage, Text } from '@covid/components';
import { useTheme } from '@covid/themes';
import { covidByZoeIconDark } from '@assets';

import { LoadingIndicator, ReportCard, Timeline } from '../partials';
import { timelineData } from '../data';
import { ITimeline } from '../types';

function Anniversary() {
  const { grid } = useTheme();
  const [timeline, setTimeline] = useState<ITimeline>();

  const getLogo = () => (
    <Image
      source={covidByZoeIconDark}
      style={{
        aspectRatio: 2.25,
        resizeMode: 'contain',
        height: undefined,
        width: 100,
      }}
    />
  );

  useEffect(() => {
    // TODO: load data here
    setTimeout(() => {
      setTimeline(timelineData);
    }, 3000);
  }, []);

  return (
    <BasicPage
      withFooter={false}
      navChildren={getLogo()}
      hasStickyHeader
      headerBackgroundColor="white"
      style={{ backgroundColor: 'white' }}>
      <View
        style={{
          backgroundColor: '#EEEEEF',
          flex: 1,
          paddingHorizontal: grid.gutter,
          paddingVertical: grid.gutter,
        }}>
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
            <Timeline timelineEvents={timeline.timelineEvents} />
          </>
        ) : (
          <LoadingIndicator />
        )}
      </View>
    </BasicPage>
  );
}

// #EEEEEF

export default Anniversary;
