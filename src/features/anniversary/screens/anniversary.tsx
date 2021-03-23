import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';

import { Text } from '@covid/components';
import ApiClient from '@covid/core/api/ApiClient';

import { LoadingIndicator, ReportCard, Timeline, TimelineIntroduction, TimelineHeader } from '../partials';
import { timelineData } from '../data';
import { ITimeline } from '../types';

type TRowType = 'INTRODUCTION' | 'REPORT_CARD' | 'TIMELINE';

type TRowItem = {
  id: TRowType;
  data: any;
};

function Anniversary() {
  const [timeline, setTimeline] = useState<ITimeline>();

  const getTimeline = async (): Promise<ITimeline[]> => {
    const client = new ApiClient();
    const response = await client.get<ITimeline[]>('timeline/');
    return response;
  };

  useEffect(() => {
    try {
      getTimeline().then((res) => {
        setTimeline(res[0]);
      });
    } catch (error) {}
  }, []);

  const renderItem = (item: any) => {
    switch (item.item.id) {
      case 'INTRODUCTION':
        return <TimelineIntroduction />;
      case 'LOADER':
        return <>{timeline ? null : <LoadingIndicator />}</>;
      case 'REPORT_CARD':
        return <>{timeline ? <ReportCard reportedEvents={timeline.badges} /> : null}</>;
      case 'TIMELINE':
        return <>{timeline ? <Timeline timelineEvents={timeline.items} /> : null}</>;
    }
    return (
      <View>
        <Text>hello world</Text>
      </View>
    );
  };

  const data = [
    {
      id: 'INTRODUCTION',
    },
    {
      id: 'LOADER',
    },
    {
      id: 'REPORT_CARD',
    },
    {
      id: 'TIMELINE',
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <TimelineHeader />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(Item) => Item.id}
        style={{ backgroundColor: '#EEEEEF' }}
      />
    </SafeAreaView>
  );
}

export default Anniversary;
